import { Loader } from '@talent-connect/shared-atomic-design-components'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { RootState } from '../../../redux/types'
import { profileFetchStart } from '../../../redux/user/actions'
import MeMenteeProfile from './me-mentee-profile/MeMenteeProfile'
import MeMentorProfile from './MeMentorProfile'

const Me = ({ loading, saveResult, profileFetchStart, profile }: any) => {
  useEffect(() => {
    profileFetchStart()
  }, [profileFetchStart])

  if (loading) return <Loader loading={true} />

  const userIsMentee =
    profile.userType === 'mentee' ||
    profile.userType === 'public-sign-up-mentee-pending-review'

  const userIsMentor =
    profile.userType === 'mentor' ||
    profile.userType === 'public-sign-up-mentor-pending-review'

  return (
    <>
      {userIsMentee ? <MeMenteeProfile /> : null}
      {userIsMentor ? <MeMentorProfile /> : null}
    </>
  )
}

const mapStateToProps = (state: RootState) => ({
  saveResult: state.user.saveResult,
  loading: state.user.loading,
  profile: state.user.profile,
})

const mapDispatchToProps = (dispatch: any) => ({
  profileFetchStart: () => dispatch(profileFetchStart()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Me)
