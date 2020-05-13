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
    .label('Slack username')
})

// props: FormikProps<AboutFormValues>
const SocialMedia = ({ profile, profileSaveStart }: any) => {
  const {
    id,
    linkedInProfileUrl,
    githubProfileUrl,
    slackUsername
  } = profile

  const submitForm = async (
    values: FormikValues
  ) => {
    const profileSocialMedia = values as Partial<RedProfile>
    profileSaveStart({ ...profileSocialMedia, id })
  }

  const initialValues: SocialMediaFormValues = {
    linkedInProfileUrl,
    githubProfileUrl,
    slackUsername
  }

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: submitForm
  })

  const readSocialMedia = () => {
    return <Content>
      {linkedInProfileUrl && <p>{linkedInProfileUrl}</p>}
      {githubProfileUrl && <p>{githubProfileUrl}</p>}
      {slackUsername && <p>{slackUsername}</p>}
    </Content>
  }

  const isEmptyProfile = !!linkedInProfileUrl || !!githubProfileUrl || !!slackUsername

  return (
    <Editable
      title="Social Media"
      onSave={ () => formik.handleSubmit()}
      savePossible={(formik.dirty && formik.isValid)}
      placeholder="Input your social media channels here."
      read={isEmptyProfile && readSocialMedia()}
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

const mapStateToProps = (state: RootState) => ({
  profile: state.user.profile
})

const mapDispatchToProps = (dispatch: any) => ({
  profileSaveStart: (profile: Partial<RedProfile>) => dispatch(profileSaveStart(profile))
})

export default connect(mapStateToProps, mapDispatchToProps)(SocialMedia)
