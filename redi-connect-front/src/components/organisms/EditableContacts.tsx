import React from 'react'
import { Content } from 'react-bulma-components'
import { FormInput } from '../atoms'
import { Editable, ReadContacts } from '../molecules'
import { RedProfile } from '../../types/RedProfile'
import { connect } from 'react-redux'
import { RootState } from '../../redux/types'

import {
  profileSaveStart
} from '../../redux/user/actions'
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
const EditableContacts = ({ profile, profileSaveStart }: any) => {
  const {
    id,
    firstName,
    lastName,
    contactEmail,
    telephoneNumber
  } = profile

  const submitForm = async (
    values: FormikValues
  ) => {
    const profileContacts = values as Partial<RedProfile>
    profileSaveStart({ ...profileContacts, id })
  }

  const initialValues: ContactsFormValues = {
    firstName,
    lastName,
    contactEmail,
    telephoneNumber
  }

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: submitForm
  })

  return (
    <Editable
      title="Contact Details"
      onSave={() => formik.handleSubmit()}
      savePossible={(formik.dirty && formik.isValid)}
      read={<ReadContacts.Me />}
    >
      <FormInput
        name="firstName"
        placeholder="First name"
        label="First name"
        {...formik}
      />
      <FormInput
        name="lastName"
        placeholder="Last name"
        label="Last name"
        {...formik}
      />
      <FormInput
        name="contactEmail"
        type="email"
        placeholder="Email"
        label="E-mail address"
        {...formik}
      />
      <FormInput
        name="telephoneNumber"
        placeholder="Telephone number"
        label="Telephone number"
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

export default connect(mapStateToProps, mapDispatchToProps)(EditableContacts)
