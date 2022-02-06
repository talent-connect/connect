import { ReactComponent as UploadImage } from '../../assets/images/uploadImage.svg'
import ReactS3Uploader from 'react-s3-uploader'
import { Element } from 'react-bulma-components'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import {
  AWS_PROFILE_AVATARS_BUCKET_BASE_URL,
  S3_UPLOAD_SIGN_URL,
} from '@talent-connect/shared-config'
import classnames from 'classnames'
import placeholderImage from '../../assets/images/img-placeholder.png'

import { connect } from 'react-redux'

import './Avatar.scss'

import { profileSaveStart } from '../../redux/user/actions'
import { RedProfile } from '@talent-connect/shared-types'
import { mapStateToProps } from '../../helpers';

// TODO: this looks like a repeated component. Move to shared components?

interface AvatarProps {
  profile: RedProfile
}

const validationSchema = Yup.object({
  profileAvatarImageS3Key: Yup.string().max(255),
})

function Avatar ({
  profile: { profileAvatarImageS3Key, firstName, lastName }
}: AvatarProps) {
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

interface AvatarFormValues {
  profileAvatarImageS3Key: string
}

interface AvatarEditable {
  profile: RedProfile
  profileSaveStart: (arg: AvatarFormValues & { id: string; }) => void
}

function AvatarEditable ({
  profile: { profileAvatarImageS3Key, id, firstName, lastName },
  profileSaveStart
}: AvatarEditable) {
  const imgURL = AWS_PROFILE_AVATARS_BUCKET_BASE_URL + profileAvatarImageS3Key

  const formik = useFormik<AvatarFormValues>({
    initialValues: {
      profileAvatarImageS3Key
    },
    validationSchema,
    onSubmit: (profileMe) => {
      profileSaveStart({ ...profileMe, id })
    },
  })

  const onUploadSuccess = (result: any) => {
    formik.setFieldValue('profileAvatarImageS3Key', result.fileKey)
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
        onSignedUrl={(c) => console.log(c)}
        onError={(c) => console.log(c)}
        onFinish={onUploadSuccess}
        contentDisposition="auto"
      />
    </div>
  )
}

const mapDispatchToProps = (dispatch: Function) => ({
  profileSaveStart: (profile: Partial<RedProfile>) =>
    dispatch(profileSaveStart(profile)),
})

Avatar.Some = (profile: RedProfile) => <Avatar profile={profile} />
Avatar.Editable = connect(mapStateToProps, mapDispatchToProps)(AvatarEditable)

export default Avatar
