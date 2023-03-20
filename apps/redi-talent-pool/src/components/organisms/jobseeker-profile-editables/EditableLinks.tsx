import {
  useMyTpDataQuery,
  usePatchUserContactMutation,
  useTpJobseekerProfilePatchMutation,
} from '@talent-connect/data-access'
import {
  Button,
  FormInput,
} from '@talent-connect/shared-atomic-design-components'
import { useFormik } from 'formik'
import { useEffect, useMemo, useState } from 'react'
import { Content, Element } from 'react-bulma-components'
import { useQueryClient } from 'react-query'
import * as Yup from 'yup'
import { useIsBusy } from '../../../hooks/useIsBusy'
import { Editable } from '../../molecules/Editable'
import { EmptySectionPlaceholder } from '../../molecules/EmptySectionPlaceholder'
import { EditableLinksProfilePropFragment } from './EditableLinks.generated'

interface Props {
  profile?: EditableLinksProfilePropFragment
  disableEditing?: boolean
}

export function EditableLinks({ profile, disableEditing }: Props) {
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
        />
      }
      modalStyles={{ minHeight: 700 }}
    />
  )
}

function buildAllLinksArray(
  profile: EditableLinksProfilePropFragment
): string[] {
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

EditableLinks.isSectionFilled = (profile: EditableLinksProfilePropFragment) =>
  buildAllLinksArray(profile).some((p) => p)
EditableLinks.isSectionEmpty = (profile: EditableLinksProfilePropFragment) =>
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
}

export function JobseekerFormSectionLinks({
  setIsEditing,
  setIsFormDirty,
}: JobseekerFormSectionLinksProps) {
  const queryClient = useQueryClient()
  const myData = useMyTpDataQuery()
  const profile = myData.data?.tpCurrentUserDataGet?.tpJobseekerDirectoryEntry
  const tpJobsekerProfileMutation = useTpJobseekerProfilePatchMutation()
  const userContactMutation = usePatchUserContactMutation()
  const isBusy = useIsBusy()

  const initialValues: EditableLinksProfilePropFragment = useMemo(
    () => ({
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
  const onSubmit = async (values: EditableLinksProfilePropFragment) => {
    formik.setSubmitting(true)
    await userContactMutation.mutate({
      input: {
        personalWebsite: values.personalWebsite,
        githubProfileUrl: values.githubUrl,
        linkedInProfileUrl: values.linkedInUrl,
        twitterUrl: values.twitterUrl,
        behanceUrl: values.behanceUrl,
        stackOverflowUrl: values.stackOverflowUrl,
        dribbbleUrl: values.dribbbleUrl,
      },
    })
    queryClient.invalidateQueries()
    formik.setSubmitting(false)
    setIsEditing(false)
  }
  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit,
    validateOnMount: true,
  })
  useEffect(
    () => setIsFormDirty?.(formik.dirty),
    [formik.dirty, setIsFormDirty]
  )
  useEffect(
    () => setIsFormDirty?.(formik.dirty),
    [formik.dirty, setIsFormDirty]
  )
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

      <FormInput
        name="personalWebsite"
        placeholder="https://www.mysite.com"
        label="Personal Website"
        {...formik}
      />
      <FormInput
        name="githubUrl"
        placeholder="https://github.com/myusername"
        label="Github URL"
        {...formik}
      />
      <FormInput
        name="linkedInUrl"
        placeholder="https://linkedin.com/in/firstname-lastname"
        label="LinkedIn Profile URL"
        {...formik}
      />
      <FormInput
        name="twitterUrl"
        placeholder="https://twitter.com/mytwitterpage"
        label="Your twitter page URL"
        {...formik}
      />
      <FormInput
        name="behanceUrl"
        placeholder="https://behance.net/mybehancepage"
        label="Your Behance page URL"
        {...formik}
      />
      <FormInput
        name="stackOverflowUrl"
        placeholder="https://stackoverflow.com/users/mypage"
        label="Your Stackoverflow profile"
        {...formik}
      />
      <FormInput
        name="dribbbleUrl"
        placeholder="https://dribbble.com/mypage"
        label="Your Dribbble Page"
        {...formik}
      />

      <Button disabled={!formik.isValid || isBusy} onClick={formik.submitForm}>
        Save
      </Button>
      <Button simple disabled={isBusy} onClick={() => setIsEditing(false)}>
        Cancel
      </Button>
    </>
  )
}

const summaryTips = `Write not more than 3-4 sentences.
<br /><br />
Make sure you talk about:<br />
1. Who are you? - Include your professional title and past relevant experiences or education with key funcitons.
<br /><br />
2. What do you have to offer?- Emphasize your strenghts and skills that matter in your desired job, mention notable achievements, projects.
<br /><br />
3. What is your goal?- Emplain how you want to add value and how your approach problems that your are passionate to solve.`
