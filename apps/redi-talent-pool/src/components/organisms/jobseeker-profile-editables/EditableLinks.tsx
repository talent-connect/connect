import {
  Button,
  TextInput,
} from '@talent-connect/shared-atomic-design-components'
import { TpJobSeekerCv, TpJobSeekerProfile } from '@talent-connect/shared-types'
import { useFormik } from 'formik'
import { useEffect, useMemo, useState } from 'react'
import { Content, Element } from 'react-bulma-components'
import { UseMutationResult, UseQueryResult } from 'react-query'
import * as Yup from 'yup'
import { useTpJobSeekerProfileUpdateMutation } from '../../../react-query/use-tpjobSeekerprofile-mutation'
import { useTpJobseekerProfileQuery } from '../../../react-query/use-tpjobSeekerprofile-query'
import { Editable } from '../../molecules/Editable'
import { EmptySectionPlaceholder } from '../../molecules/EmptySectionPlaceholder'

function buildAllLinksArray(profile: Partial<TpJobSeekerProfile>): string[] {
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

interface EditableLinksProps {
  profile?: Partial<TpJobSeekerProfile>
  disableEditing?: boolean
}

export function EditableLinks ({
  profile: overridingProfile,
  disableEditing,
}: EditableLinksProps) {
  const queryHookResult = useTpJobseekerProfileQuery({
    enabled: !disableEditing,
  })
  if (overridingProfile) queryHookResult.data = overridingProfile
  const mutationHookResult = useTpJobSeekerProfileUpdateMutation()
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
        <JobSeekerFormSectionLinks
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

EditableLinks.isSectionFilled = (profile: Partial<TpJobSeekerProfile>) =>
  buildAllLinksArray(profile).some((p) => p)

EditableLinks.isSectionEmpty = (profile: Partial<TpJobSeekerProfile>) =>
  !EditableLinks.isSectionFilled(profile)

// #####################################################################

const validationSchema = Yup.object({
  personalWebsite: Yup.string()
    .url()
    .label('Personal website URL'),
  githubUrl: Yup.string()
    .url()
    .label('Github profile URL'),
  linkedInUrl: Yup.string()
    .url()
    .label('LinkedIn profile URL'),
  twitterUrl: Yup.string()
    .url()
    .label('Twitter profile URL'),
  behanceUrl: Yup.string()
    .url()
    .label('Behance profile URL'),
  stackOverflowUrl: Yup.string()
    .url()
    .label('Stackoverflow profile URL'),
  dribbbleUrl: Yup.string()
    .url()
    .label('Dribbble profile URL'),
})

interface JobSeekerFormSectionLinksProps {
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

export function JobSeekerFormSectionLinks ({
  setIsEditing,
  setIsFormDirty,
  queryHookResult,
  mutationHookResult,
}: JobSeekerFormSectionLinksProps) {
  const { data: profile } = queryHookResult
  const mutation = mutationHookResult

  const initialValues = useMemo(() => ({
      personalWebsite: profile?.personalWebsite || '',
      githubUrl: profile?.githubUrl || '',
      linkedInUrl: profile?.linkedInUrl || '',
      twitterUrl: profile?.twitterUrl || '',
      behanceUrl: profile?.behanceUrl || '',
      stackOverflowUrl: profile?.stackOverflowUrl || '',
      dribbbleUrl: profile?.dribbbleUrl || '',
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

  const formik = useFormik<Partial<TpJobSeekerProfile>>({
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
