import React from 'react'
import { Content } from 'react-bulma-components'
import FormInput from '../../../components/atoms/FormInput'
import Editable from '../../../components/molecules/Editable'
import { RedProfile } from '../../../types/RedProfile'
import { connect } from 'react-redux'
import { RootState } from '../../../redux/types'

import {
  profileSaveStart
} from '../../../redux/user/actions'
import * as Yup from 'yup'

import { FormikValues, useFormik } from 'formik'

export interface ContactsFormValues {
  firstName: string
  lastName: string
  contactEmail: string
  telephoneNumber: string
}

const validationSchema = Yup.object({
  firstName: Yup.string()
    .required()
    .max(255),
  lastName: Yup.string()
    .required()
    .max(255),
  contactEmail: Yup.string()
    .email()
    .required()
    .max(255)
    .label('Contact email'),
  telephoneNumber: Yup.string()
    .max(255)
    .label('Telephone number')
})

// props: FormikProps<AboutFormValues>
const Contacts = ({ profile, profileSaveStart }: any) => {
  const submitForm = async (
    values: FormikValues
  ) => {
    const profileContacts = values as Partial<RedProfile>
    profileSaveStart({ ...profileContacts, id: profile.id })
  }

  const initialValues: ContactsFormValues = {
    firstName: profile.firstName,
    lastName: profile.lastName,
    contactEmail: profile.contactEmail,
    telephoneNumber: profile.telephoneNumber
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit: submitForm
  })

  const readContacts = () => {
    return <Content>
      <p>{profile.firstName}</p>
      <p>{profile.lastName}</p>
      <p>{profile.contactEmail}</p>
      <p>{profile.telephoneNumber}</p>
    </Content>
  }

  return (
    <Editable
      title="Contact Detail"
      onSave={ () => formik.handleSubmit()}
      savePossible={!(formik.dirty && formik.isValid)}
      read={readContacts()}
    >
      <FormInput
        name="firstName"
        placeholder="First name"
        {...formik}
      />

      <FormInput
        name="lastName"
        placeholder="Last name"
        {...formik}
      />

      <FormInput
        name="contactEmail"
        type="email"
        placeholder="Email"
        {...formik}
      />

      <FormInput
        name="telephoneNumber"
        placeholder="Telephone number"
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

export default connect(mapStateToProps, mapDispatchToProps)(Contacts)
