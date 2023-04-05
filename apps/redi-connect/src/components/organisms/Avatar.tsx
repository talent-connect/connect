import { S3_UPLOAD_SIGN_URL } from '@talent-connect/shared-config'
import classnames from 'classnames'
import { Element } from 'react-bulma-components'
import ReactS3Uploader from 'react-s3-uploader'
import placeholderImage from '../../assets/images/img-placeholder.png'
import { ReactComponent as UploadImage } from '../../assets/images/uploadImage.svg'

import './Avatar.scss'

import {
  ConProfile,
  useLoadMyProfileQuery,
  usePatchMyProfileMutation,
} from '@talent-connect/data-access'
import { useQueryClient } from 'react-query'
import { getAccessTokenFromLocalStorage } from '../../services/auth/auth'

type AvatarProps = {
  profile: Pick<ConProfile, 'fullName' | 'profileAvatarImageS3Key'>
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
      <img src={imgSrc} alt={profile.fullName} className="avatar__image" />
    </div>
  )
}

function AvatarEditable() {
  const loopbackUserId = getAccessTokenFromLocalStorage().userId

  const queryClient = useQueryClient()
  const myProfileQuery = useLoadMyProfileQuery({
    loopbackUserId,
  })
  const patchMyProfileMutation = usePatchMyProfileMutation()
  // patchMyProfileMutation.mutate({ input: {} })

  if (!myProfileQuery.isSuccess) return null

  const profile = myProfileQuery.data.conProfile

  const { profileAvatarImageS3Key } = profile
  const imgURL = profileAvatarImageS3Key

  const onUploadSuccess = async (result: any) => {
    const profileAvatarImageS3Key = result.fileKey
    const mutationResult = await patchMyProfileMutation.mutateAsync({
      input: { profileAvatarImageS3Key },
    })
    queryClient.setQueryData(
      useLoadMyProfileQuery.getKey({
        loopbackUserId,
      }),
      { conProfile: mutationResult.patchConProfile }
    )
  }

  return (
    <div
      className={classnames('avatar avatar--editable', {
        'avatar--placeholder': !profileAvatarImageS3Key,
      })}
    >
      {profileAvatarImageS3Key && (
        <>
          <img src={imgURL} alt={profile.fullName} className="avatar__image" />
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
      <div>
        <ReactS3Uploader
          name="avatar-upload"
          id="avatar-upload"
          className="avatar__input"
          signingUrl={S3_UPLOAD_SIGN_URL}
          accept="image/*"
          uploadRequestHeaders={{ 'x-amz-acl': 'public-read' }}
          onFinish={onUploadSuccess}
          contentDisposition="auto"
        />
      </div>
    </div>
  )
}

Avatar.Some = Avatar
Avatar.Editable = AvatarEditable

export default Avatar
