import {
  useLoadMyProfileQuery,
  usePatchMyProfileMutation,
} from '@talent-connect/data-access'
import {
  Editable,
  FormInput,
} from '@talent-connect/shared-atomic-design-components'
import { toPascalCaseAndTrim } from '@talent-connect/shared-utils'
import { FormikValues, useFormik } from 'formik'
import { omit } from 'lodash'
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
  firstName: Yup.string()
    .transform(toPascalCaseAndTrim)
    .required('Your first name is required')
    .max(255),
  lastName: Yup.string()
    .transform(toPascalCaseAndTrim)
    .required('Your last name is required')
    .max(255),
  telephoneNumber: Yup.string().nullable().max(255).label('Telephone Number'),
})

// props: FormikProps<AboutFormValues>
export function EditableContactDetails() {
  const loopbackUserId = getAccessTokenFromLocalStorage().userId
  const queryClient = useQueryClient()
  const myProfileQuery = useLoadMyProfileQuery({ loopbackUserId })
  const patchMyProfileMutation = usePatchMyProfileMutation()

  const profile = myProfileQuery.data?.conProfile

  const submitForm = async (values: FormikValues) => {
    const transformedValues = validationSchema.cast(values)
    const cleanValues = omit(transformedValues, ['email'])
    const mutationResult = await patchMyProfileMutation.mutateAsync({
      input: cleanValues,
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
        label="First name*"
        {...formik}
      />
      <FormInput
        name="lastName"
        placeholder="Last name"
        label="Last name*"
        {...formik}
      />
      {/* TODO: find a nicer way of showing this non-editable email */}
      <FormInput
        disabled
        name="email"
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

export default EditableContactDetails
