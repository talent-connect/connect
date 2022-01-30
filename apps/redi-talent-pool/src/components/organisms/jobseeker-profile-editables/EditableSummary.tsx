import {
  Button,
  Caption,
  FaqItem,
  FormSelect,
  TextArea,
} from '@talent-connect/shared-atomic-design-components'
import { TpJobSeekerCv, TpJobSeekerProfile } from '@talent-connect/shared-types'
import {
  topSkills,
  topSkillsIdToLabelMap,
} from '@talent-connect/talent-pool/config'
import { mapOptions } from '@talent-connect/typescript-utilities';
import { useFormik } from 'formik'
import { FC, useEffect, useMemo, useState } from 'react'
import { Content, Element, Tag } from 'react-bulma-components'
import { UseMutationResult, UseQueryResult } from 'react-query'
import * as Yup from 'yup'
import { useTpjobseekerprofileUpdateMutation } from '../../../react-query/use-tpjobseekerprofile-mutation'
import { useTpJobSeekerProfileQuery } from '../../../react-query/use-tpjobseekerprofile-query'
import { Editable } from '../../molecules/Editable'
import { EmptySectionPlaceholder } from '../../molecules/EmptySectionPlaceholder'

interface Props {
  profile?: Partial<TpJobSeekerProfile>
  disableEditing?: boolean
}

interface EditableSummaryHelpers {
  isSectionFilled: (profile: Partial<TpJobSeekerProfile>) => boolean;
  isSectionEmpty: (profile: Partial<TpJobSeekerProfile>) => boolean;
}

export const EditableSummary: FC<Props> & EditableSummaryHelpers = ({
  profile: overridingProfile,
  disableEditing,
}) => {
  const queryHookResult = useTpJobSeekerProfileQuery({
    enabled: !disableEditing,
  })
  if (overridingProfile) queryHookResult.data = overridingProfile
  const mutationHookResult = useTpjobseekerprofileUpdateMutation()
  const { data: profile } = queryHookResult
  const [isEditing, setIsEditing] = useState(false)
  const [isFormDirty, setIsFormDirty] = useState(false)

  if (disableEditing && EditableSummary.isSectionEmpty(profile)) return null

  return (
    <Editable
      title="Summary"
      modalTitle="About you"
      modalHeadline="Summary"
      {...{ disableEditing, isEditing, isFormDirty, setIsEditing }}
      readComponent={
        <>
          <Caption>About</Caption>
          <Content>
            {profile?.aboutYourself ? (
              <p>{profile.aboutYourself}</p>
            ) : (
              <EmptySectionPlaceholder
                height="tall"
                onClick={() => setIsEditing(true)}
              >
                Tell us about yourself
              </EmptySectionPlaceholder>
            )}
          </Content>
          <Caption>Top skills</Caption>
          {profile?.topSkills?.length ? (
            <Tag.Group>
              {profile?.topSkills?.map((skill) => (
                <Tag key={skill}>{topSkillsIdToLabelMap[skill]}</Tag>
              ))}
            </Tag.Group>
          ) : (
            <EmptySectionPlaceholder
              height="slim"
              onClick={() => setIsEditing(true)}
            >
              Add your top skills
            </EmptySectionPlaceholder>
          )}
        </>
      }
      modalBody={
        <JobSeekerFormSectionSummary
          {...{ setIsEditing, queryHookResult, mutationHookResult, setIsFormDirty }}
        />
      }
      modalStyles={{ minHeight: 700 }}
    />
  )
}

EditableSummary.isSectionFilled = (profile: Partial<TpJobSeekerProfile>) =>
  !!profile?.aboutYourself && !!profile?.topSkills?.length

EditableSummary.isSectionEmpty = (profile: Partial<TpJobSeekerProfile>) =>
  !EditableSummary.isSectionFilled(profile)

// ########################################################################

const formTopSkills = mapOptions(topSkills)

const [MIN_CHARS, MAX_CHARS] = [100, 600]

const validationSchema = Yup.object({
  topSkills: Yup.array()
    .min(1, 'Pick at least one top technical skill')
    .max(5, "Your profile can't contain too many skills - five at most"),
  aboutYourself: Yup.string()
    .required()
    .min(MIN_CHARS, 'Write at least 100 characters about yourself.')
    .max(MAX_CHARS, 'The text about yourself can be up to 600 characters long.'),
})

interface JobSeekerFormSectionSummaryProps {
  setIsEditing: (boolean: boolean) => void
  setIsFormDirty?: (boolean: boolean) => void
  queryHookResult: UseQueryResult<
    Partial<TpJobSeekerProfile | TpJobSeekerCv>,
    unknown
  >
  mutationHookResult: UseMutationResult<
    Partial<TpJobSeekerProfile | TpJobSeekerCv>,
    unknown,
    Partial<TpJobSeekerProfile | TpJobSeekerCv>,
    unknown
  >
}

export const JobSeekerFormSectionSummary: FC<JobSeekerFormSectionSummaryProps> = ({
  setIsEditing,
  setIsFormDirty,
  queryHookResult,
  mutationHookResult,
}) => {

  const { data: profile } = queryHookResult
  const mutation = mutationHookResult

  const initialValues = useMemo(() => ({
      aboutYourself: profile?.aboutYourself || '',
      topSkills: profile?.topSkills || [],
    }),
    [profile?.aboutYourself, profile?.topSkills]
  )

  const formik = useFormik<typeof initialValues>({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    validateOnMount: true,
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true)
      mutation.mutate(values, {
        onSettled: () => setSubmitting(false),
        onSuccess: () => setIsEditing(false),
      })
    },
  })

  useEffect(() => setIsFormDirty?.(formik.dirty), [
    formik.dirty,
    setIsFormDirty,
  ])

  return (
    <>
      <Element
        renderAs="p"
        textSize={4}
        responsive={{ mobile: { textSize: { value: 5 } } }}
        className="oneandhalf-bs"
      >
        Tell us a bit about yourself. This is a chance to introduce yourself and
        what you’re passionate about in your field.
      </Element>
      <FormSelect
        label="Your top technical skills (pick 1-5 skills)"
        name="topSkills"
        items={formTopSkills}
        {...formik}
        multiSelect
      />
      <TextArea
        label="About you (100-600 characters)"
        name="aboutYourself"
        rows={7}
        placeholder="Example: UX Designer with an academic background in Psychology. Experienced in negotiating with different kinds of clients and resolving customer complaints with a high level of empathy. Committed to understanding the human mind and designing impactful products by leveraging a strong sense of analytical and critical thinking."
        minChar={100}
        maxChar={600}
        {...formik}
      />
      <FaqItem
        question="Our tips for writing your Summary"
        answer={summaryTips}
      />

      <Button
        disabled={!formik.isValid || mutation.isLoading}
        onClick={formik.submitForm}
      >
        Save
      </Button>
      <Button
        simple
        disabled={mutation.isLoading}
        onClick={() => setIsEditing(false)}
      >
        Cancel
      </Button>
    </>
  )
}

const summaryTips = `Write not more than 3-4 sentences.
<br /><br />
Make sure you talk about:<br />
1. Who are you? - Include your professional title and past relevant experiences or education with key functions.
<br /><br />
2. What do you have to offer? - Emphasize your strengths and skills that matter in your desired job, mention notable achievements, projects.
<br /><br />
3. What is your goal? - Explain how you want to add value and how you approach problems you are passionate about solving.`
