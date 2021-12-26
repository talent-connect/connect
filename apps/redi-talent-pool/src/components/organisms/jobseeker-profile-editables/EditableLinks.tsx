import {
  Button,
  TextInput,
} from '@talent-connect/shared-atomic-design-components'
import { TpJobseekerCv, TpJobseekerProfile } from '@talent-connect/shared-types'
import { useFormik } from 'formik'
import { useEffect, useMemo, useState, FC } from 'react'
import {
  Content,
  Element,
  Button as BulmaButton,
} from 'react-bulma-components'
import { UseMutationResult, UseQueryResult } from 'react-query'
import * as Yup from 'yup'
import { useTpjobseekerprofileUpdateMutation } from '../../../react-query/use-tpjobseekerprofile-mutation'
import { useTpJobseekerProfileQuery } from '../../../react-query/use-tpjobseekerprofile-query'
import { Editable } from '../../molecules/Editable'
import { EmptySectionPlaceholder } from '../../molecules/EmptySectionPlaceholder'

interface Props {
  profile?: Partial<TpJobseekerProfile>
  disableEditing?: boolean
}

export const EditableLinks: FC<Props> = ({
  profile: overridingProfile,
  disableEditing,
}) => {
  const queryHookResult = useTpJobseekerProfileQuery({
    enabled: !disableEditing,
  })
  if (overridingProfile) queryHookResult.data = overridingProfile
  const mutationHookResult = useTpjobseekerprofileUpdateMutation()
  const { data: profile } = queryHookResult
  const [isEditing, setIsEditing] = useState(false)
  const [isFormDirty, setIsFormDirty] = useState(false)

  const links = buildAllLinksArray(profile)

  const isEmpty = EditableLinks.isSectionEmpty(profile)

  if (disableEditing && isEmpty) return null

  return (
    <Editable
      disableEditing={disableEditing}
      isEditing={isEditing}
      isFormDirty={isFormDirty}
      setIsEditing={setIsEditing}
      title="Links"
      readComponent={
        isEmpty ? (
          <EmptySectionPlaceholder
            height="slim"
            onClick={() => setIsEditing(true)}
          >
            Add your links
          </EmptySectionPlaceholder>
        ) : (
          <Content>
            {links
              .filter((l) => l)
              .map((url, idx) => (
                <p key={idx}>
                  <a href={url} target="_blank" rel="noreferrer">
                    {url.replace(/http(s)?:\/\//g, '')}
                  </a>
                </p>
              ))}
          </Content>
        )
      }
      modalTitle="Your online presence"
      modalHeadline="Links"
      modalBody={
        <JobseekerFormSectionLinks
          setIsEditing={setIsEditing}
          setIsFormDirty={setIsFormDirty}
          queryHookResult={queryHookResult}
          mutationHookResult={mutationHookResult}
        />
      }
      modalStyles={{ minHeight: 700 }}
    />
  )
}

function buildAllLinksArray(profile: Partial<TpJobseekerProfile>): string[] {
  return [
    profile?.personalWebsite,
    profile?.githubUrl,
    profile?.linkedInUrl,
    profile?.twitterUrl,
    profile?.behanceUrl,
    profile?.stackOverflowUrl,
    profile?.dribbbleUrl,
  ]
}

EditableLinks.isSectionFilled = (profile: Partial<TpJobseekerProfile>) =>
  buildAllLinksArray(profile).some((p) => p)
EditableLinks.isSectionEmpty = (profile: Partial<TpJobseekerProfile>) =>
  !EditableLinks.isSectionFilled(profile)

const validationSchema = Yup.object({
  personalWebsite: Yup.string().url().label('Personal website URL'),
  githubUrl: Yup.string().url().label('Github profile URL'),
  linkedInUrl: Yup.string().url().label('LinkedIn profile URL'),
  twitterUrl: Yup.string().url().label('Twitter profile URL'),
  behanceUrl: Yup.string().url().label('Behance profile URL'),
  stackOverflowUrl: Yup.string().url().label('Stackoverflow profile URL'),
  dribbbleUrl: Yup.string().url().label('Dribbble profile URL'),
})

interface JobseekerFormSectionLinksProps {
  setIsEditing: (boolean) => void
  setIsFormDirty?: (boolean) => void
  queryHookResult: UseQueryResult<
    Partial<TpJobseekerProfile | TpJobseekerCv>,
    unknown
  >
  mutationHookResult: UseMutationResult<
    Partial<TpJobseekerProfile | TpJobseekerCv>,
    unknown,
    Partial<TpJobseekerProfile | TpJobseekerCv>,
    unknown
  >
}

export const JobseekerFormSectionLinks: FC<JobseekerFormSectionLinksProps> = ({
  setIsEditing,
  setIsFormDirty,
  queryHookResult,
  mutationHookResult,
}) => {
  const { data: profile } = queryHookResult
  const mutation = mutationHookResult

  const initialValues: Partial<TpJobseekerProfile> = useMemo(() => ({
      personalWebsite: profile?.personalWebsite ?? '',
      githubUrl: profile?.githubUrl ?? '',
      linkedInUrl: profile?.linkedInUrl ?? '',
      twitterUrl: profile?.twitterUrl ?? '',
      behanceUrl: profile?.behanceUrl ?? '',
      stackOverflowUrl: profile?.stackOverflowUrl ?? '',
      dribbbleUrl: profile?.dribbbleUrl ?? '',
    }),
    [
      profile?.behanceUrl,
      profile?.dribbbleUrl,
      profile?.githubUrl,
      profile?.linkedInUrl,
      profile?.personalWebsite,
      profile?.stackOverflowUrl,
      profile?.twitterUrl,
    ]
  )

  const onSubmit = (values: Partial<TpJobseekerProfile>) => {
    formik.setSubmitting(true)
    mutation.mutate(values, {
      onSettled: () => formik.setSubmitting(false),
      onSuccess: () => setIsEditing(false),
    })
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit,
    validateOnMount: true,
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
        Include links to where you have online profiles.
      </Element>

      <TextInput
        name="personalWebsite"
        placeholder="https://www.mysite.com"
        label="Personal Website"
        {...formik}
      />
      <TextInput
        name="githubUrl"
        placeholder="https://github.com/myusername"
        label="Github URL"
        {...formik}
      />
      <TextInput
        name="linkedInUrl"
        placeholder="https://linkedin.com/in/firstname-lastname"
        label="LinkedIn Profile URL"
        {...formik}
      />
      <TextInput
        name="twitterUrl"
        placeholder="https://twitter.com/mytwitterpage"
        label="Your twitter page URL"
        {...formik}
      />
      <TextInput
        name="behanceUrl"
        placeholder="https://behance.net/mybehancepage"
        label="Your Behance page URL"
        {...formik}
      />
      <TextInput
        name="stackOverflowUrl"
        placeholder="https://stackoverflow.com/users/mypage"
        label="Your Stackoverflow profile"
        {...formik}
      />
      <TextInput
        name="dribbbleUrl"
        placeholder="https://dribbble.com/mypage"
        label="Your Dribbble Page"
        {...formik}
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

// const summaryTips = `Write not more than 3-4 sentences. // TODO: remove?
// <br /><br />
// Make sure you talk about:<br />
// 1. Who are you? - Include your professional title and past relevant experiences or education with key functions.
// <br /><br />
// 2. What do you have to offer?- Emphasize your strengths and skills that matter in your desired job, mention notable achievements, projects.
// <br /><br />
// 3. What is your goal?- Explain how you want to add value and how your approach problems that your are passionate to solve.`
