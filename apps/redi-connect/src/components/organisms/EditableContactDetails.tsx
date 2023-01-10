import React from 'react'
import { FormInput } from '@talent-connect/shared-atomic-design-components'
import { Editable } from '@talent-connect/shared-atomic-design-components'
import { RedProfile } from '@talent-connect/shared-types'
import { toPascalCaseAndTrim } from '@talent-connect/shared-utils'
import { connect } from 'react-redux'
import { RootState } from '../../redux/types'

import { profileSaveStart } from '../../redux/user/actions'
import * as Yup from 'yup'

import { FormikValues, useFormik } from 'formik'
import { ReadContactDetails } from '../molecules'

export interface ContactsFormValues {
  firstName: string
  lastName: string
  contactEmail: string
  telephoneNumber: string
}

const validationSchema = Yup.object({
  firstName: Yup.string()
    .transform(toPascalCaseAndTrim)
    .required('Your first name is required')
    .max(255),
  lastName: Yup.string()
    .transform(toPascalCaseAndTrim)
    .required('Your last name is required')
    .max(255),
  contactEmail: Yup.string()
    .email()
    .required()
    .max(255)
    .label('E-mail address'),
  telephoneNumber: Yup.string().max(255).label('Telephone Number'),
})

// props: FormikProps<AboutFormValues>
const EditableContactDetails = ({ profile, profileSaveStart }: any) => {
  const { id, firstName, lastName, contactEmail, telephoneNumber } = profile

  const submitForm = async (values: FormikValues) => {
    const transformedValues = validationSchema.cast(values)
    const profileContacts = transformedValues as Partial<RedProfile>
    profileSaveStart({ ...profileContacts, id })
  }

  const initialValues: ContactsFormValues = {
    firstName,
    lastName,
    contactEmail,
    telephoneNumber,
  }

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: submitForm,
  })

  return (
    <Editable
      title="Contact Details"
      onSave={() => formik.handleSubmit()}
      onClose={() => formik.resetForm()}
      savePossible={formik.dirty && formik.isValid}
      read={<ReadContactDetails.Me />}
    >
      <FormInput
        name="firstName"
        placeholder="First name"
        label="First name*"
        {...formik}
      />
      <FormInput
        name="lastName"
        placeholder="Last name"
        label="Last name*"
        {...formik}
      />
      <FormInput
        name="contactEmail"
        type="email"
        placeholder="E-mail"
        label="E-mail address*"
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
  profile: state.user.profile,
})

const mapDispatchToProps = (dispatch: any) => ({
  profileSaveStart: (profile: Partial<RedProfile>) =>
    dispatch(profileSaveStart(profile)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditableContactDetails)
