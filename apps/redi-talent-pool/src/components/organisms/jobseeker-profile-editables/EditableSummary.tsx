import { FC, useEffect, useState } from 'react'
import { UseMutationResult, UseQueryResult } from 'react-query'
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
import { Content, Element, Tag } from 'react-bulma-components'
import { useTpJobSeekerProfileUpdateMutation } from '../../../react-query/use-tpjobSeekerprofile-mutation'
import { useTpJobSeekerProfileQuery } from '../../../react-query/use-tpjobSeekerprofile-query'
import { Editable } from '../../molecules/Editable'
import { EmptySectionPlaceholder } from '../../molecules/EmptySectionPlaceholder'
import { componentForm } from './EditableSummary.form';

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
  const mutationHookResult = useTpJobSeekerProfileUpdateMutation()
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

  // const initialValues = useMemo(() => ({
  //     aboutYourself: profile?.aboutYourself || '',
  //     topSkills: profile?.topSkills || [],
  //   }),
  //   [profile?.aboutYourself, profile?.topSkills]
  // )

  const formik = componentForm({
    mutationHookResult,
    profile,
    setIsEditing
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
        name="topSkills"
        label="Your top technical skills (pick 1-5 skills)"
        items={formTopSkills}
        {...formik}
        multiSelect
      />
      <TextArea
        name="aboutYourself"
        label="About you (100-600 characters)"
        placeholder="Example: UX Designer with an academic background in Psychology. Experienced in negotiating with different kinds of clients and resolving customer complaints with a high level of empathy. Committed to understanding the human mind and designing impactful products by leveraging a strong sense of analytical and critical thinking."
        rows={7}
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

const summaryTips = (
  <>
    Write not more than 3-4 sentences.
    <br /><br />
    Make sure you talk about:<br />
    1. Who are you? - Include your professional title and past relevant experiences or education with key functions.
    <br /><br />
    2. What do you have to offer? - Emphasize your strengths and skills that matter in your desired job, mention notable achievements, projects.
    <br /><br />
    3. What is your goal? - Explain how you want to add value and how you approach problems you are passionate about solving.
  </>)
