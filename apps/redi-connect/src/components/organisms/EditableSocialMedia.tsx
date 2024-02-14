import {
  useLoadMyProfileQuery,
  usePatchMyProfileMutation,
} from '@talent-connect/data-access'
import {
  Editable,
  FormInput,
} from '@talent-connect/shared-atomic-design-components'
import { FormikValues, useFormik } from 'formik'
import { useQueryClient } from 'react-query'
import * as Yup from 'yup'
import { getAccessTokenFromLocalStorage } from '../../services/auth/auth'
import { ReadSocialMedia } from '../molecules'

export interface SocialMediaFormValues {
  linkedInProfileUrl: string
  githubProfileUrl: string
  slackUsername: string
}

const validationSchema = Yup.object({
  linkedInProfileUrl: Yup.string()
    .nullable()
    .max(255)
    .url()
    .label('LinkedIn Profile'),
  githubProfileUrl: Yup.string()
    .nullable()
    .max(255)
    .url()
    .label('Github Profile'),
  slackUsername: Yup.string().nullable().max(255).label('Slack username'),
})

// props: FormikProps<AboutFormValues>
function EditableSocialMedia() {
  const loopbackUserId = getAccessTokenFromLocalStorage().userId
  const queryClient = useQueryClient()
  const myProfileQuery = useLoadMyProfileQuery({ loopbackUserId })
  const patchMyProfileMutation = usePatchMyProfileMutation()

  const profile = myProfileQuery.data?.conProfile

  const linkedInProfileUrl = profile?.linkedInProfileUrl
  const githubProfileUrl = profile?.githubProfileUrl
  const slackUsername = profile?.slackUsername

  const submitForm = async (values: FormikValues) => {
    const mutationResult = await patchMyProfileMutation.mutateAsync({
      input: values,
    })
    queryClient.setQueryData(useLoadMyProfileQuery.getKey({ loopbackUserId }), {
      conProfile: mutationResult.patchConProfile,
    })
  }

  const initialValues: SocialMediaFormValues = {
    linkedInProfileUrl,
    githubProfileUrl,
    slackUsername,
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
      title="Social Media (optional)"
      onSave={() => formik.handleSubmit()}
      onClose={() => formik.resetForm()}
      savePossible={formik.dirty && formik.isValid}
      read={<ReadSocialMedia.Me />}
    >
      <FormInput
        name="linkedInProfileUrl"
        placeholder="LinkedIn Profile"
        label="LinkedIn Profile"
        {...formik}
      />
      <FormInput
        name="githubProfileUrl"
        placeholder="Github Profile"
        label="Github Profile"
        {...formik}
      />
      <FormInput
        name="slackUsername"
        placeholder="Username in ReDI Slack"
        label="Username in ReDI Slack"
        {...formik}
      />
    </Editable>
  )
}

export default EditableSocialMedia
