import {
  Button,
  Caption,
  FaqItem,
  FormSelect,
  FormTextArea,
} from '@talent-connect/shared-atomic-design-components'
import { TpCompanyProfile } from '@talent-connect/shared-types'
import {
  topSkills,
  topSkillsIdToLabelMap,
} from '@talent-connect/talent-pool/config'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Content, Element, Tag } from 'react-bulma-components'
import * as Yup from 'yup'
import { useTpCompanyProfileUpdateMutation } from '../../../react-query/use-tpcompanyprofile-mutation'
import { useTpCompanyProfileQuery } from '../../../react-query/use-tpcompanyprofile-query'
import { Editable } from '../../molecules/Editable'
import { EmptySectionPlaceholder } from '../../molecules/EmptySectionPlaceholder'

export function EditableAbout() {
  const { data: profile } = useTpCompanyProfileQuery()
  const [isEditing, setIsEditing] = useState(false)

  const isEmpty = EditableAbout.isSectionEmpty(profile)

  return (
    <Editable
      isEditing={isEditing}
      setIsEditing={setIsEditing}
      title="About"
      readComponent={
        <>
          <Caption>About</Caption>
          <Content>
            {!isEmpty ? (
              <p>{profile?.about}</p>
            ) : (
              <EmptySectionPlaceholder
                height="tall"
                text="Tell us about the company"
                onClick={() => setIsEditing(true)}
              />
            )}
          </Content>
        </>
      }
      modalTitle="About"
      modalHeadline="Summary"
      modalBody={<Form setIsEditing={setIsEditing} />}
    />
  )
}

EditableAbout.isSectionFilled = (profile: Partial<TpCompanyProfile>) =>
  !!profile?.about
EditableAbout.isSectionEmpty = (profile: Partial<TpCompanyProfile>) =>
  !EditableAbout.isSectionFilled(profile)

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

function Form({ setIsEditing }: { setIsEditing: (boolean) => void }) {
  const { data: profile } = useTpCompanyProfileQuery()
  const mutation = useTpCompanyProfileUpdateMutation()
  const initialValues: Partial<TpCompanyProfile> = {
    about: profile?.about ?? '',
  }
  const onSubmit = (values: Partial<TpCompanyProfile>) => {
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
        placeholder="Example: UX Designer with an academic background in Psychology. Experienced in negotiating with different kinds of clients and and resonlving customer complaints with a high level of empathy. Committed to understanding the human mind and designing impactful products by leveraging a strong sense of analythical and critical thinking."
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
