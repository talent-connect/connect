import React from 'react'
import {
  FormInput,
  FormSelect,
} from '@talent-connect/shared-atomic-design-components'
import { Editable } from '@talent-connect/shared-atomic-design-components'
import { RedProfile } from '../../types/RedProfile'
import { connect } from 'react-redux'
import { RootState } from '../../redux/types'

import { profileSaveStart } from '../../redux/user/actions'
import * as Yup from 'yup'

import { FormikValues, useFormik } from 'formik'

import { menteeOccupationCategories } from '../../config/config'
import { ReadOccupation } from '../molecules'

const formMenteeOccupationCategories = menteeOccupationCategories.map(
  (level) => ({ value: level.id, label: level.label })
)
// do we really need all these type???
export type UserType =
  | 'mentor'
  | 'mentee'
  | 'public-sign-up-mentor-pending-review'
  | 'public-sign-up-mentee-pending-review'
  | 'public-sign-up-mentor-rejected'
  | 'public-sign-up-mentee-rejected'

export interface OccupationFormValues {
  userType: UserType
  mentor_occupation: string
  mentor_workPlace: string
  mentee_occupationCategoryId: string
  mentee_occupationJob_placeOfEmployment: string
  mentee_occupationJob_position: string
  mentee_occupationStudent_studyPlace: string
  mentee_occupationStudent_studyName: string
  mentee_occupationLookingForJob_what: string
  mentee_occupationOther_description: string
}

const validationSchema = Yup.object({
  mentor_occupation: Yup.string().when('userType', {
    is: 'mentor',
    then: Yup.string().required().max(255).label('Occupation'),
  }),
  mentor_workPlace: Yup.string().max(255).label('Work place'),
  mentee_occupationCategoryId: Yup.string().when('userType', {
    is: 'mentee',
    then: Yup.string()
      .required()
      .oneOf(menteeOccupationCategories.map((v) => v.id))
      .label('Current occupation'),
  }),
  mentee_occupationJob_placeOfEmployment: Yup.string()
    .max(255)
    .label('Where are you employed'),
  mentee_occupationJob_position: Yup.string()
    .max(255)
    .label('At what university do you study'),
  mentee_occupationStudent_studyPlace: Yup.string()
    .max(255)
    .label('Where do you study'),
  mentee_occupationStudent_studyName: Yup.string()
    .max(255)
    .label('What do you study'),
  mentee_occupationLookingForJob_what: Yup.string()
    .max(255)
    .label('What kind of job'),
  mentee_occupationOther_description: Yup.string()
    .max(255)
    .label('What are you currently doing'),
})

const EditableOccupation = ({ profile, profileSaveStart }: any) => {
  const {
    id,
    userType,
    mentor_occupation,
    mentor_workPlace,
    mentee_occupationCategoryId,
    mentee_occupationJob_placeOfEmployment,
    mentee_occupationJob_position,
    mentee_occupationStudent_studyPlace,
    mentee_occupationStudent_studyName,
    mentee_occupationLookingForJob_what,
    mentee_occupationOther_description,
  } = profile

  const isMentee =
    userType === 'mentee' || userType === 'public-sign-up-mentee-pending-review'
  const isMentor =
    userType === 'mentor' || userType === 'public-sign-up-mentor-pending-review'

  const submitForm = async (values: FormikValues) => {
    const education = values as Partial<RedProfile>
    profileSaveStart({ ...education, id })
  }

  const initialValues: OccupationFormValues = {
    userType,
    mentor_occupation,
    mentor_workPlace,
    mentee_occupationCategoryId,
    mentee_occupationJob_placeOfEmployment,
    mentee_occupationJob_position,
    mentee_occupationStudent_studyPlace,
    mentee_occupationStudent_studyName,
    mentee_occupationLookingForJob_what,
    mentee_occupationOther_description,
  }

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: submitForm,
  })

  const { mentee_occupationCategoryId: occupation } = formik.values

  return (
    <Editable
      title="Occupation"
      onSave={() => formik.handleSubmit()}
      onClose={() => formik.resetForm()}
      savePossible={formik.dirty && formik.isValid}
      read={<ReadOccupation.Me />}
    >
      {isMentor && (
        <>
          <FormInput
            name="mentor_occupation"
            label="What is your job title?"
            placeholder="Your job"
            {...formik}
          />
          <FormInput
            name="mentor_workPlace"
            label="Which company are you working for?"
            placeholder="Company"
            {...formik}
          />
        </>
      )}

      {isMentee && (
        <>
          <FormSelect
            label="What is your current occupation?"
            name="mentee_occupationCategoryId"
            placeholder="Current Occupation"
            items={formMenteeOccupationCategories}
            {...formik}
          />
          {occupation === 'job' && (
            <>
              <FormInput
                name="mentee_occupationJob_placeOfEmployment"
                label="Where are you employed?"
                placeholder="Company"
                {...formik}
              />
              <FormInput
                name="mentee_occupationJob_position"
                label="What is your position?"
                placeholder="Job position"
                {...formik}
              />
            </>
          )}
          {occupation === 'student' && (
            <>
              <FormInput
                name="mentee_occupationStudent_studyPlace"
                label="At what university do you study?"
                placeholder="University"
                {...formik}
              />
              <FormInput
                name="mentee_occupationStudent_studyName"
                label="What do you study?"
                placeholder="Study"
                {...formik}
              />
            </>
          )}
          {occupation === 'lookingForJob' && (
            <FormInput
              name="mentee_occupationLookingForJob_what"
              label="What kind of job?"
              placeholder="Dreamjob..."
              {...formik}
            />
          )}
          {occupation === 'other' && (
            <FormInput
              name="mentee_occupationOther_description"
              label="What are you currently doing?"
              placeholder="Whats up?"
              {...formik}
            />
          )}
        </>
      )}
    </Editable>
  )
}

const mapStateToProps = (state: RootState) => ({
  profile: state.user.profile,
})

const mapDispatchToProps = (dispatch: any) => ({
  profileSaveStart: (profile: Partial<RedProfile>) =>
    dispatch(profileSaveStart(profile)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EditableOccupation)
