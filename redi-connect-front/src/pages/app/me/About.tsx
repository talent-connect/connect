import React from 'react'
import FormTextArea from '../../../components/atoms/FormTextArea'
import Editable from '../../../components/molecules/Editable'
import { RedProfile } from '../../../types/RedProfile'
import { connect } from 'react-redux'
import { RootState } from '../../../redux/types'

import {
  profileSaveStart
} from '../../../redux/user/actions'
import * as Yup from 'yup'

import { FormikValues, FormikHelpers as FormikActions, useFormik, FormikProps } from 'formik'

export interface AboutFormValues {
  personalDescription: string
}

const validationSchema = Yup.object({
  personalDescription: Yup.string()
    .required()
    .min(100)
    .max(600)
    .label('Personal description')
})
// props: FormikProps<AboutFormValues>
const About = ({ profile, profileSaveStart }: any) => {
  const submitForm = async (
    values: FormikValues
  ) => {
    const profileAbout = values as Partial<RedProfile>
    profileSaveStart({ ...profileAbout, id: profile.id })
  }

  const initialValues: AboutFormValues = {
    personalDescription: profile.personalDescription
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit: submitForm
  })

  return (
    <Editable
      title="About me"
      onSave={ () => formik.handleSubmit()}
      read={profile.personalDescription}
    >
      <FormTextArea
        name="personalDescription"
        rows={8}
        placeholder="Tell us a few words about yourself (this will be displayed on your profile)* (100-600 characters)"
        {...formik}
      />
    </Editable>
  )
}

const mapStateToProps = (state: RootState) => ({
  profile: state.user.profile
})

const mapDispatchToProps = (dispatch: any) => ({
  profileSaveStart: (profile: Partial<RedProfile>) => dispatch(profileSaveStart(profile))
})

export default connect(mapStateToProps, mapDispatchToProps)(About)
