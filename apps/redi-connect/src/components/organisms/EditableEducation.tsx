import React from 'react'
import { FormSelect } from '@talent-connect/shared-atomic-design-components'
import { Editable } from '@talent-connect/shared-atomic-design-components'
import { RedProfile } from '../../types/RedProfile'
import { connect } from 'react-redux'
import { RootState } from '../../redux/types'

import { profileSaveStart } from '../../redux/user/actions'
import * as Yup from 'yup'

import { FormikValues, useFormik } from 'formik'

import { educationLevels } from '../../config/config'
import { ReadEducation } from '../molecules'

const formEducationLevels = educationLevels.map((level) => ({
  value: level.id,
  label: level.label,
}))

// do we really need all these type???
export type UserType =
  | 'mentor'
  | 'mentee'
  | 'public-sign-up-mentor-pending-review'
  | 'public-sign-up-mentee-pending-review'
  | 'public-sign-up-mentor-rejected'
  | 'public-sign-up-mentee-rejected'

export interface EducationFormValues {
  mentee_highestEducationLevel: string
}

const validationSchema = Yup.object({
  mentee_highestEducationLevel: Yup.string()
    .oneOf(educationLevels.map((level) => level.id))
    .label('Highest Education Level'),
})

const EditableEducation = ({ profile, profileSaveStart }: any) => {
  const { id, mentee_highestEducationLevel } = profile

  const submitForm = async (values: FormikValues) => {
    const education = values as Partial<RedProfile>
    profileSaveStart({ ...education, id })
  }

  const initialValues: EducationFormValues = {
    mentee_highestEducationLevel,
  }

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: submitForm,
  })

  return (
    <Editable
      title="Highest Education"
      onSave={() => formik.handleSubmit()}
      onClose={() => formik.resetForm()}
      savePossible={formik.dirty && formik.isValid}
      read={<ReadEducation.Me />}
    >
      <FormSelect
        label="What is your highest Education Level?"
        name="mentee_highestEducationLevel"
        placeholder="Education Level"
        items={formEducationLevels}
        {...formik}
      />
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

export default connect(mapStateToProps, mapDispatchToProps)(EditableEducation)
