import Button from '../../../components/atoms/Button'

import React, { useEffect } from 'react'
import { FullScreenCircle } from '../../../hooks/WithLoading'
import LoggedIn from '../../../components/templates/LoggedIn'
import { RedProfile } from '../../../types/RedProfile'
import { ProfileMentee } from './mentee/ProfileMentee'
import { ProfileMentor } from './mentor/ProfileMentor'
import { connect } from 'react-redux'
import { profilesFetchOneStart } from '../../../redux/profiles/actions'
import { RootState } from '../../../redux/types'
import { ProfileAcceptedMatch } from './acceptedMatch/ProfileAcceptedMatch'

import { useParams, useHistory } from 'react-router'

interface RouteParams {
  profileId: string
}

interface ProfileProps {
  loading: boolean
  profile: RedProfile | undefined
  currentUser: RedProfile | undefined
  profilesFetchOneStart: Function
}

function Profile ({ loading, profile, currentUser, profilesFetchOneStart }: ProfileProps) {
  const { profileId } = useParams<RouteParams>()

  useEffect(() => {
    profilesFetchOneStart(profileId)
  }, [profilesFetchOneStart])

  const isAcceptedMatch =
    profile &&
    profile.redMatchesWithCurrentUser &&
    profile.redMatchesWithCurrentUser[0] &&
    profile.redMatchesWithCurrentUser[0].status === 'accepted'
  const currentUserIsMentor =
    currentUser && currentUser.userType === 'mentor'

  const history = useHistory()

  return (
    <>
      <FullScreenCircle loading={loading} />
      {!loading && <LoggedIn>
        {(!isAcceptedMatch || currentUserIsMentor) && (
          <Button
            onClick={() => history.goBack()}
            simple
          >
            Back
          </Button>
        )}
        {isAcceptedMatch && profile && (
          <ProfileAcceptedMatch profile={profile} />
        )}
        {!isAcceptedMatch &&
          typeof profile !== 'undefined' &&
          profile.userType === 'mentee' && <ProfileMentee mentee={profile} />}
        {!isAcceptedMatch &&
          typeof profile !== 'undefined' &&
          profile.userType === 'mentor' && <ProfileMentor mentor={profile} />}
      </LoggedIn>}
    </>
  )
}
const mapStateToProps = (state: RootState) => ({
  loading: state.profiles.loading,
  profile: state.profiles.oneProfile,
  currentUser: state.user.profile
})

const mapDispatchToProps = (dispatch: any) => ({
  profilesFetchOneStart: (profileId: string) => dispatch(profilesFetchOneStart(profileId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
