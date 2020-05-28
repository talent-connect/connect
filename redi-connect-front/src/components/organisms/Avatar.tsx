import React from 'react'
import { ReactComponent as UploadImage } from '../../assets/images/uploadImage.svg'
import ReactS3Uploader from 'react-s3-uploader'
import { Element } from 'react-bulma-components'
import { FormikValues, useFormik } from 'formik'
import * as Yup from 'yup'
import { RedProfile } from '../../types/RedProfile'
import { AWS_PROFILE_AVATARS_BUCKET_BASE_URL, S3_UPLOAD_SIGN_URL } from '../../config/config'
import classnames from 'classnames'

import { RootState } from '../../redux/types'
import { connect } from 'react-redux'

import './Avatar.scss'

import {
  profileSaveStart
} from '../../redux/user/actions'

interface AvatarProps {
  profile: RedProfile
}
interface AvatarEditable {
  profile: RedProfile
  profileSaveStart: Function
}

interface AvatarFormValues {
  profileAvatarImageS3Key: string
}

const validationSchema = Yup.object({
  profileAvatarImageS3Key: Yup.string().max(255)
})

const Avatar = ({ profile }: AvatarProps) => {
  const { profileAvatarImageS3Key } = profile
  const imgURL = AWS_PROFILE_AVATARS_BUCKET_BASE_URL + profileAvatarImageS3Key

  return (
    <div className={classnames('avatar', {
      'avatar--placeholder': !profileAvatarImageS3Key
    })}>
      {profileAvatarImageS3Key &&
        <img src={imgURL} className="avatar__image" />
      }

      {!profileAvatarImageS3Key &&
        <div className="avatar__placeholder">
          <UploadImage className="avatar__placeholder__image" />
        </div>
      }
    </div>
  )
}

const AvatarEditable = ({ profile, profileSaveStart }: AvatarEditable) => {
  const { profileAvatarImageS3Key } = profile
  const imgURL = AWS_PROFILE_AVATARS_BUCKET_BASE_URL + profileAvatarImageS3Key

  const submitForm = async (
    values: FormikValues
  ) => {
    const profileMe = values as Partial<RedProfile>
    profileSaveStart({ ...profileMe, id: profile.id })
  }

  const initialValues: AvatarFormValues = {
    profileAvatarImageS3Key: profileAvatarImageS3Key
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit: submitForm
  })

  const onUploadSuccess = (result: any) => {
    formik.setFieldValue('profileAvatarImageS3Key', result.fileKey)
    formik.handleSubmit()
  }

  return (
    <div className={classnames('avatar', {
      'avatar--editable': profileAvatarImageS3Key,
      'avatar--placeholder': !profileAvatarImageS3Key
    })}>
      {profileAvatarImageS3Key && <>
        <img src={imgURL} className="avatar__image" />
        <Element renderAs="span" className="avatar__button" textSize={7} textTransform="uppercase" >Edit Photo</Element>
      </>}

      {!profileAvatarImageS3Key && <>
        <div className="avatar__placeholder">
          <UploadImage className="avatar__placeholder__image" />
          <Element className="is-size-6" responsive={{ mobile: { hide: { value: true } } }}>Add your picture</Element>
        </div>
      </>}

      <ReactS3Uploader
        name="avatar-upload"
        id="avatar-upload"
        className="avatar__input"
        signingUrl={S3_UPLOAD_SIGN_URL}
        accept="image/*"
        uploadRequestHeaders={{ 'x-amz-acl': 'public-read' }}
        onSignedUrl={(c: any) => console.log(c)}
        onError={(c: any) => console.log(c)}
        onFinish={onUploadSuccess}
        contentDisposition="auto"
      />
    </div>
  )
}

const mapStateToProps = (state: RootState) => ({
  profile: state.user.profile as RedProfile
})

const mapDispatchToProps = (dispatch: any) => ({
  profileSaveStart: (profile: Partial<RedProfile>) => dispatch(profileSaveStart(profile))
})

Avatar.Editable = connect(mapStateToProps, mapDispatchToProps)(AvatarEditable)

export default Avatar
