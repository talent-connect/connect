import {
  useLoadMyProfileQuery,
  usePatchMyProfileMutation,
  UserType,
} from '@talent-connect/data-access'
import {
  Editable,
  FormTextArea,
} from '@talent-connect/shared-atomic-design-components'
import { FormikValues, useFormik } from 'formik'
import React from 'react'
import { useQueryClient } from 'react-query'
import * as Yup from 'yup'
import { getAccessTokenFromLocalStorage } from '../../services/auth/auth'
import { ReadAbout } from '../molecules'

export interface AboutFormValues {
  personalDescription: string
  expectations: string
}

const personalDescriptionRange = { min: 100, max: 600 }
const validationSchema = Yup.object({
  personalDescription: Yup.string()
    .required('Write at least 100 characters about yourself.')
    .min(
      personalDescriptionRange.min,
      'Write at least 100 characters about yourself.'
    )
    .max(
      personalDescriptionRange.max,
      'The introduction text can be up to 600 characters long.'
    )
    .label('Personal description'),
})
// props: FormikProps<AboutFormValues>
function EditableAbout() {
  const loopbackUserId = getAccessTokenFromLocalStorage().userId
  const queryClient = useQueryClient()
  const myProfileQuery = useLoadMyProfileQuery(
    { loopbackUserId },
    { onSuccess: () => console.log('EditableAbout loaded it') }
  )
  const patchMyProfileMutation = usePatchMyProfileMutation()
  console.log('rerender')

  const profile = myProfileQuery.data.conProfile

  const userType = profile?.userType
  const personalDescription = profile?.personalDescription
  const expectations = profile?.expectations

  const submitForm = async (values: FormikValues) => {
    console.log('submit form')
    const mutationResult = await patchMyProfileMutation.mutateAsync({
      input: { id: profile.id, ...values },
    })
    queryClient.setQueryData(useLoadMyProfileQuery.getKey({ loopbackUserId }), {
      conProfile: mutationResult.patchConProfile,
    })
  }

  const initialValues: AboutFormValues = {
    personalDescription,
    expectations,
  }

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: submitForm,
  })

  return (
    <Editable
      title="About You"
      onSave={() => formik.handleSubmit()}
      onClose={() => formik.resetForm()}
      savePossible={formik.dirty && formik.isValid}
      read={<ReadAbout.Me />}
    >
      <FormTextArea
        label="Tell us a few words about yourself (this will be displayed on your profile)* (100-600 characters)"
        name="personalDescription"
        rows={4}
        placeholder="About you"
        minChar={personalDescriptionRange.min}
        maxChar={personalDescriptionRange.max}
        {...formik}
      />
      <FormTextArea
        label={expectationsFieldLabel(userType)}
        name="expectations"
        rows={4}
        placeholder={expectationsFieldPlaceholder(userType)}
        {...formik}
      />
    </Editable>
  )
}

const expectationsFieldLabel = (userType: UserType): string => {
  switch (userType) {
    case 'MENTEE':
      return 'What do you expect from a mentorship and which short- to medium-term goals would you like to achieve in about 5-6 mentoring sessions?'

    case 'MENTOR':
      return 'Feel free to share how you can best support your mentees and any expectations you may have towards them'

    default:
      return null
  }
}

const expectationsFieldPlaceholder = (userType: UserType): string => {
  switch (userType) {
    case 'MENTEE':
      return 'Support with finding a job, get better with my tech skills, build a portfolio, etc.'

    case 'MENTOR':
      return 'Providing career or technical support, expecting commitment, etc.'

    default:
      return null
  }
}

export default EditableAbout
