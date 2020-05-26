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

export interface MeFormValues {
  profileAvatarImageS3Key: string
}

const validationSchema = Yup.object({
  profileAvatarImageS3Key: Yup.string().max(255)
})

const Avatar = ({ profile, profileSaveStart, mePage }: any) => {
  const { profileAvatarImageS3Key } = profile
  const imgURL = AWS_PROFILE_AVATARS_BUCKET_BASE_URL + profileAvatarImageS3Key

  const submitForm = async (
    values: FormikValues
  ) => {
    const profileMe = values as Partial<RedProfile>
    profileSaveStart({ ...profileMe, id: profile.id })
  }

  const initialValues: MeFormValues = {
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
    <div className={classnames('avatar', `avatar--border${mePage ? '__me' : '__other'}`, {
      'avatar--cursor': mePage,
      'avatar--large': profileAvatarImageS3Key,
      'avatar--placeholder': !profileAvatarImageS3Key
    })}>
      {profileAvatarImageS3Key && <>
        <img src={imgURL} className="avatar__image" />
        {mePage && <Element renderAs="span" className="avatar__button" textSize={7} textTransform="uppercase" >Edit Photo</Element>}
      </>}

      {!profileAvatarImageS3Key && <>
        <div className="avatar__placeholder">
          <UploadImage className="avatar__placeholder__image" />
          {mePage && <Element className="is-size-6" responsive={{ mobile: { hide: { value: true } } }}>Add your picture</Element>}
        </div>
      </>}

      {mePage && <ReactS3Uploader
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
      />}
    </div>
  )
}

const mapStateToProps = (state: RootState) => ({
  profile: state.user.profile
})
const mapDispatchToProps = (dispatch: any) => ({
  profileSaveStart: (profile: Partial<RedProfile>) => dispatch(profileSaveStart(profile))
})

export default connect(mapStateToProps, mapDispatchToProps)(Avatar)
