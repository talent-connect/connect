import React from 'react'
import { ReactComponent as UploadImage } from '../../assets/images/uploadImage.svg'
import { RedProfile } from '../../types/RedProfile'
import { AWS_PROFILE_AVATARS_BUCKET_BASE_URL, S3_UPLOAD_SIGN_URL } from '../../config/config'
import classnames from 'classnames'

import { RootState } from '../../redux/types'
import { connect } from 'react-redux'

import './StaticAvatar.scss'

import {
  profileSaveStart
} from '../../redux/user/actions'

export interface MeFormValues {
  profileAvatarImageS3Key: string
}

const StaticAvatar = ({ profile }: any) => {
  const { profileAvatarImageS3Key } = profile
  const imgURL = AWS_PROFILE_AVATARS_BUCKET_BASE_URL + profileAvatarImageS3Key

  return (
    <div className={classnames('static-avatar', {
      'static-avatar--placeholder': !profileAvatarImageS3Key
    })}>
      {profileAvatarImageS3Key && <>
        <img src={imgURL} className="static-avatar__image" />
      </>}

      {!profileAvatarImageS3Key && <>
        <div className="static-avatar__placeholder">
          <UploadImage className="static-avatar__placeholder__image" />
        </div>
      </>}
    </div>
  )
}

const mapStateToProps = (state: RootState) => ({
  profile: state.user.profile
})
const mapDispatchToProps = (dispatch: any) => ({
  profileSaveStart: (profile: Partial<RedProfile>) => dispatch(profileSaveStart(profile))
})

export default connect(mapStateToProps, mapDispatchToProps)(StaticAvatar)