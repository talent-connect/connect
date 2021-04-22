import React from 'react'
import { FormInput, FormSelect } from '../atoms'
import { Editable, ReadPersonalDetail } from '../molecules'
import { RedProfile } from '../../types/RedProfile'
import { connect } from 'react-redux'
import { RootState } from '../../redux/types'

import { profileSaveStart } from '../../redux/user/actions'
import * as Yup from 'yup'

import { FormikValues, useFormik } from 'formik'

import { genders } from '../../config/config'

const formGenders = genders.map((gender) => ({
  value: gender.id,
  label: gender.label,
}))

export interface PersonalDetailFormValues {
  gender: string
  age?: number
}

const validationSchema = Yup.object({
  gender: Yup.string().oneOf(['male', 'female', 'other']).label('Gender'),
  age: Yup.number().min(16).max(99).label('Age'),
})

const EditablePersonalDetail = ({ profile, profileSaveStart }: any) => {
  const { id, gender, age } = profile

  const submitForm = async (values: FormikValues) => {
    const personalDetail = values as Partial<RedProfile>
    profileSaveStart({ ...personalDetail, id })
  }

  const initialValues: PersonalDetailFormValues = {
    gender,
    age,
  }

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: submitForm,
  })

  return (
    <Editable
      title="Personal Details"
      onSave={() => formik.handleSubmit()}
      onClose={() => formik.resetForm()}
      savePossible={formik.dirty && formik.isValid}
      read={<ReadPersonalDetail.Me />}
    >
      <FormSelect
        label="Gender"
        name="gender"
        placeholder="Prefer not to answer"
        items={formGenders}
        {...formik}
      />

      <FormInput name="age" placeholder="Age" label="Your age" {...formik} />
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditablePersonalDetail)
