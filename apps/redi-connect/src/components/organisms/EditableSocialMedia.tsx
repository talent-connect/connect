import { FC } from 'react'
import { connect } from 'react-redux'
import * as Yup from 'yup'
import { useFormik } from 'formik'

import { TextInput } from '@talent-connect/shared-atomic-design-components'
import { Editable } from '@talent-connect/shared-atomic-design-components'
import { RedProfile } from '@talent-connect/shared-types'
import { profileSaveStart } from '../../redux/user/actions'
import { ReadSocialMedia } from '../molecules'
import { mapStateToProps } from '../../helpers';

export interface SocialMediaFormValues {
  linkedInProfileUrl: string
  githubProfileUrl: string
  slackUsername: string
}

const validationSchema = Yup.object({
  linkedInProfileUrl: Yup.string()
    .max(255)
    .url()
    .label('LinkedIn Profile'),
  githubProfileUrl: Yup.string()
    .max(255)
    .url()
    .label('Github Profile'),
  slackUsername: Yup.string()
    .max(255)
    .label('Slack username'),
})

interface Props {
  profile: RedProfile
  profileSaveStart: (arg: SocialMediaFormValues & { id: string }) => void
}

function EditableSocialMedia ({
  profile: { id, linkedInProfileUrl, githubProfileUrl, slackUsername },
  profileSaveStart
}: Props) {

  const formik = useFormik<SocialMediaFormValues>({
    initialValues: {
      linkedInProfileUrl,
      githubProfileUrl,
      slackUsername,
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (profileSocialMedia: SocialMediaFormValues) => {
      profileSaveStart({ ...profileSocialMedia, id })
    },
  })

  return (
    <Editable
      title="Social Media"
      onSave={() => formik.handleSubmit()}
      onClose={() => formik.resetForm()}
      savePossible={formik.dirty && formik.isValid}
      read={<ReadSocialMedia.Me />}
    >
      <TextInput
        name="linkedInProfileUrl"
        placeholder="LinkedIn Profile"
        label="LinkedIn Profile"
        {...formik}
      />
      <TextInput
        name="githubProfileUrl"
        placeholder="Github Profile"
        label="Github Profile"
        {...formik}
      />
      <TextInput
        name="slackUsername"
        placeholder="Username in ReDI Slack"
        label="Username in ReDI Slack"
        {...formik}
      />
    </Editable>
  )
}

const mapDispatchToProps = (dispatch: Function) => ({
  profileSaveStart: (profile: Partial<RedProfile>) =>
    dispatch(profileSaveStart(profile)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EditableSocialMedia)
