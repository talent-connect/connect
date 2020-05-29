import Button from '../../../components/atoms/Button'

import React, { useEffect, useState } from 'react'
import { FullScreenCircle } from '../../../hooks/WithLoading'
import LoggedIn from '../../../components/templates/LoggedIn'
import { RedProfile } from '../../../types/RedProfile'
import { ProfileMentee } from './mentee/ProfileMentee'
import { ProfileMentor } from './mentor/ProfileMentor'
import { connect } from 'react-redux'
import { profilesFetchOneStart } from '../../../redux/profiles/actions'
import { RootState } from '../../../redux/types'
import { ProfileAcceptedMatch } from './acceptedMatch/ProfileAcceptedMatch'
import { ConnectionRequestForm } from './mentor/ConnectionRequestForm'

import { useParams, useHistory } from 'react-router'

import { Columns, Heading, Modal, Box } from 'react-bulma-components'

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
  const [show, setShow] = useState(false)

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

        <Columns>
          <Columns.Column>
            {(!isAcceptedMatch || currentUserIsMentor) &&
              <Button
                onClick={() => history.goBack()}
                simple
              >
                <Button.Icon icon="arrowLeft" space="right" />
                back
              </Button>
            }
          </Columns.Column>
          <Columns.Column className="is-narrow">
            {
              (
                !isAcceptedMatch &&
                typeof profile !== 'undefined' &&
                profile.numberOfPendingApplicationWithCurrentUser === 0 &&
                currentUser &&
                currentUser.userType === 'mentee'
              ) && <>
                <Button onClick={() => setShow(true)}>apply for this mentor</Button>
                <Modal show={show} onClose={() => setShow(false)}>
                  <Modal.Content>
                    <Box>
                      <ConnectionRequestForm mentorId={profile.id} />
                    </Box>
                  </Modal.Content>
                </Modal>
              </>
            }

            {typeof profile !== 'undefined' && profile.numberOfPendingApplicationWithCurrentUser > 0 && (
              <Heading subtitle size="small">You have already applied to this mentor.</Heading>
            )}
          </Columns.Column>
        </Columns>

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
