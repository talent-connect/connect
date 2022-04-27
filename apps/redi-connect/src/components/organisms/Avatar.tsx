import React from 'react'
import { ReactComponent as UploadImage } from '../../assets/images/uploadImage.svg'
import ReactS3Uploader from 'react-s3-uploader'
import { Element } from 'react-bulma-components'
import { FormikValues, useFormik } from 'formik'
import * as Yup from 'yup'
import {
  AWS_PROFILE_AVATARS_BUCKET_BASE_URL,
  S3_UPLOAD_SIGN_URL,
} from '@talent-connect/shared-config'
import classnames from 'classnames'
import placeholderImage from '../../assets/images/img-placeholder.png'

import { RootState } from '../../redux/types'
import { connect } from 'react-redux'

import './Avatar.scss'

import { profileSaveStart } from '../../redux/user/actions'
import { RedProfile } from '@talent-connect/shared-types'
import { ConProfile, useLoadMyProfileQuery } from '@talent-connect/data-access'
import { getAccessTokenFromLocalStorage } from '../../services/auth/auth'

type AvatarProps = {
  profile: Pick<
    ConProfile,
    'firstName' | 'lastName' | 'profileAvatarImageS3Key'
  >
}

function Avatar({ profile }: AvatarProps) {
  const imgSrc = profile.profileAvatarImageS3Key
    ? profile.profileAvatarImageS3Key
    : placeholderImage

  return (
    <div
      className={classnames('avatar', {
        'avatar--placeholder': !profile.profileAvatarImageS3Key,
      })}
    >
      <img
        src={imgSrc}
        alt={`${profile.firstName} ${profile.lastName}`}
        className="avatar__image"
      />
    </div>
  )
}

function AvatarEditable() {
  const myProfileResult = useLoadMyProfileQuery({
    loopbackUserId: getAccessTokenFromLocalStorage().userId,
  })

  if (!myProfileResult.isSuccess) return null

  const profile = myProfileResult.data.conProfile

  const { profileAvatarImageS3Key } = profile
  const imgURL = profileAvatarImageS3Key

  const onUploadSuccess = (result: any) => {
    const profileAvatarImageS3Key =
      AWS_PROFILE_AVATARS_BUCKET_BASE_URL + result.fileKey
    // save it
  }

  return (
    <div
      className={classnames('avatar avatar--editable', {
        'avatar--placeholder': !profileAvatarImageS3Key,
      })}
    >
      {profileAvatarImageS3Key && (
        <>
          <img
            src={imgURL}
            alt={`${profile.firstName} ${profile.lastName}`}
            className="avatar__image"
          />
          <Element
            renderAs="span"
            className="avatar__button"
            textSize={7}
            textTransform="uppercase"
          >
            Edit Photo
          </Element>
        </>
      )}

      {!profileAvatarImageS3Key && (
        <>
          <div className="avatar__placeholder">
            <UploadImage className="avatar__placeholder__image" />
            <Element
              textSize={6}
              className="avatar__placeholder__text"
              responsive={{ mobile: { hide: { value: true } } }}
            >
              Add your picture
            </Element>
          </div>
        </>
      )}

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

Avatar.Some = Avatar
Avatar.Editable = AvatarEditable

export default Avatar
