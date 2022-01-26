import { FC, ReactNode } from 'react';
import ReactS3Uploader, { S3Response } from 'react-s3-uploader'
import classnames from 'classnames'

import {
  AWS_PROFILE_AVATARS_BUCKET_BASE_URL,
  S3_UPLOAD_SIGN_URL,
} from '@talent-connect/shared-config'
import { TpJobSeekerProfile, TpCompanyProfile } from '@talent-connect/shared-types'
import { Element } from 'react-bulma-components'
import placeholderImage from '../../assets/img-placeholder.png'
import { ReactComponent as UploadImage } from '../../assets/uploadImage.svg'
import './Avatar.scss'
import { AvatarFormValues, componentForm } from './Avatar.form'

interface AvatarProps {
  profile: Partial<TpJobSeekerProfile> | Partial<TpCompanyProfile>
}
interface AvatarEditableProps extends AvatarProps {
  profileSaveStart: AvatarFormValues['profileSaveStart']
}

const Avatar: FC<AvatarProps> & { Editable: typeof AvatarEditable, Some: ReactNode }= ({
  profile: { profileAvatarImageS3Key, firstName, lastName }
}) => {
  const imgSrc = profileAvatarImageS3Key
  ? AWS_PROFILE_AVATARS_BUCKET_BASE_URL + profileAvatarImageS3Key
  : placeholderImage
  
  return (
    <div
    className={classnames('avatar', {
      'avatar--placeholder': !profileAvatarImageS3Key,
    })}
    >
      <img
        src={imgSrc}
        alt={`${firstName} ${lastName}`}
        className="avatar__image"
        />
    </div>
  )
}

const AvatarEditable: FC<AvatarEditableProps> = ({
  profile: { profileAvatarImageS3Key, id, firstName, lastName },
  profileSaveStart
}) => {
  const imgURL = AWS_PROFILE_AVATARS_BUCKET_BASE_URL + profileAvatarImageS3Key

  const formik = componentForm({
    id,
    profileAvatarImageS3Key,
    profileSaveStart
  })

  const onUploadSuccess = ({ fileKey }: S3Response) => {
    formik.setFieldValue('profileAvatarImageS3Key', fileKey)
    formik.handleSubmit()
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
            alt={`${firstName} ${lastName}`}
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
      )}

      <ReactS3Uploader
        name="avatar-upload"
        id="avatar-upload"
        className="avatar__input"
        signingUrl={S3_UPLOAD_SIGN_URL}
        accept="image/*"
        uploadRequestHeaders={{ 'x-amz-acl': 'public-read' }}
        onSignedUrl={(c) => console.log(c)}
        onError={(c) => console.log(c)}
        onFinish={onUploadSuccess}
        contentDisposition="auto"
      />
    </div>
  )
}

Avatar.Some = (profile: TpJobSeekerProfile) => <Avatar profile={profile} />
Avatar.Editable = AvatarEditable

export default Avatar
