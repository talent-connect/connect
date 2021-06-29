import {
  Button,
  Caption,
  FaqItem,
  FormSelect,
  FormTextArea,
} from '@talent-connect/shared-atomic-design-components'
import { TpJobseekerProfile } from '@talent-connect/shared-types'
import {
  topSkills,
  topSkillsIdToLabelMap,
} from '@talent-connect/talent-pool/config'
import { useFormik } from 'formik'
import React, { useEffect, useMemo, useState } from 'react'
import { Content, Element, Tag } from 'react-bulma-components'
import * as Yup from 'yup'
import { useTpjobseekerprofileUpdateMutation } from '../../../react-query/use-tpjobseekerprofile-mutation'
import { useTpJobseekerProfileQuery } from '../../../react-query/use-tpjobseekerprofile-query'
import { Editable } from '../../molecules/Editable'
import { EmptySectionPlaceholder } from '../../molecules/EmptySectionPlaceholder'

export function EditableSummary() {
  const { data: profile } = useTpJobseekerProfileQuery()
  const [isEditing, setIsEditing] = useState(false)
  const [isFormDirty, setIsFormDirty] = useState(false)

  return (
    <Editable
      isEditing={isEditing}
      isFormDirty={isFormDirty}
      setIsEditing={setIsEditing}
      title="Summary"
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
          {profile?.topSkills?.length > 0 ? (
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
      modalTitle="About you"
      modalHeadline="Summary"
      modalBody={
        <ModalForm
          setIsEditing={setIsEditing}
          setIsFormDirty={setIsFormDirty}
        />
      }
      modalStyles={{ minHeight: 700 }}
    />
  )
}

EditableSummary.isSectionFilled = (profile: Partial<TpJobseekerProfile>) =>
  !!profile?.aboutYourself && profile?.topSkills?.length > 0
EditableSummary.isSectionEmpty = (profile: Partial<TpJobseekerProfile>) =>
  !EditableSummary.isSectionFilled(profile)

const formTopSkills = topSkills.map(({ id, label }) => ({
  value: id,
  label,
}))

const minChars = 100
const maxChars = 600

const validationSchema = Yup.object({
  topSkills: Yup.array()
    .min(1, 'Pick at least one top technical skill')
    .max(5, "Your profile can't contain too many skills - five at most"),
  aboutYourself: Yup.string()
    .required()
    .min(minChars, 'Write at least 100 characters about yourself.')
    .max(maxChars, 'The text about yourself can be up to 600 characters long.'),
})

function ModalForm({
  setIsEditing,
  setIsFormDirty,
}: {
  setIsEditing: (boolean) => void
  setIsFormDirty: (boolean) => void
}) {
  const { data: profile } = useTpJobseekerProfileQuery()
  const mutation = useTpjobseekerprofileUpdateMutation()
  const initialValues: Partial<TpJobseekerProfile> = useMemo(
    () => ({
      aboutYourself: profile?.aboutYourself ? profile.aboutYourself : '',
      topSkills: profile?.topSkills ?? [],
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )
  const onSubmit = (values: Partial<TpJobseekerProfile>) => {
    formik.setSubmitting(true)
    mutation.mutate(values, {
      onSettled: () => {
        formik.setSubmitting(false)
      },
      onSuccess: () => {
        setIsEditing(false)
      },
    })
  }
  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit,
    validateOnMount: true,
  })
  useEffect(() => setIsFormDirty(formik.dirty), [formik.dirty, setIsFormDirty])

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
        multiselect
      />
      <FormTextArea
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
