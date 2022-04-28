import {
  useLoadMyProfileQuery,
  usePatchMyProfileMutation,
} from '@talent-connect/data-access'
import {
  Editable,
  FormInput,
} from '@talent-connect/shared-atomic-design-components'
import { FormikValues, useFormik } from 'formik'
import { omit } from 'lodash'
import React from 'react'
import { useQueryClient } from 'react-query'
import * as Yup from 'yup'
import { getAccessTokenFromLocalStorage } from '../../services/auth/auth'
import { ReadContactDetails } from '../molecules'

export interface ContactsFormValues {
  firstName: string
  lastName: string
  email: string
  telephoneNumber: string
}

const validationSchema = Yup.object({
  firstName: Yup.string().required().max(255),
  lastName: Yup.string().required().max(255),
  // email: Yup.string().email().required().max(255).label('Contact email'),
  telephoneNumber: Yup.string().max(255).label('Telephone number'),
})

// props: FormikProps<AboutFormValues>
export function EditableContactDetails() {
  const loopbackUserId = getAccessTokenFromLocalStorage().userId
  const queryClient = useQueryClient()
  const myProfileQuery = useLoadMyProfileQuery({ loopbackUserId })
  const patchMyProfileMutation = usePatchMyProfileMutation()

  const profile = myProfileQuery.data.conProfile

  const submitForm = async (values: FormikValues) => {
    const cleanValues = omit(values, ['email'])
    const mutationResult = await patchMyProfileMutation.mutateAsync({
      input: { id: profile.id, ...cleanValues },
    })
    queryClient.setQueryData(useLoadMyProfileQuery.getKey({ loopbackUserId }), {
      conProfile: mutationResult.patchConProfile,
    })
  }

  const initialValues: ContactsFormValues = {
    firstName: profile?.firstName,
    lastName: profile?.lastName,
    email: profile?.email,
    telephoneNumber: profile?.telephoneNumber,
  }

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: submitForm,
  })

  if (!myProfileQuery.isSuccess) return null

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
        label="First name"
        {...formik}
      />
      <FormInput
        name="lastName"
        placeholder="Last name"
        label="Last name"
        {...formik}
      />
      {/* TODO: find a nicer way of showing this non-editable email */}
      <FormInput
        disabled
        name="email"
        type="email"
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

export default EditableContactDetails
