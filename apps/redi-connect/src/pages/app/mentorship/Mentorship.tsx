import {
  useLoadMyProfileQuery,
  usePatchMyProfileMutation,
} from '@talent-connect/data-access'
import {
  Button,
  Heading,
} from '@talent-connect/shared-atomic-design-components'
import { RedMatch, RedProfile } from '@talent-connect/shared-types'
import React, { useEffect } from 'react'
import { Columns, Content } from 'react-bulma-components'
import { useQueryClient } from 'react-query'
import { connect } from 'react-redux'
import { Redirect, useHistory, useParams } from 'react-router-dom'
import {
  CompleteMentorship,
  MContacts,
  MSessions,
  ProfileCard,
  ReportProblem,
} from '../../../components/organisms'
import { LoggedIn } from '../../../components/templates'
import { matchesFetchStart } from '../../../redux/matches/actions'
import { getMatches } from '../../../redux/matches/selectors'
import { RootState } from '../../../redux/types'
import { getAccessTokenFromLocalStorage } from '../../../services/auth/auth'

interface RouteParams {
  matchId: string
}
interface MentorshipProps {
  currentUser?: RedProfile
  matches: RedMatch[]
}

const Mentorship = ({ currentUser, matches }: MentorshipProps) => {
  const loopbackUserId = getAccessTokenFromLocalStorage().userId
  const queryClient = useQueryClient()
  const myProfileQuery = useLoadMyProfileQuery({ loopbackUserId })
  const patchMyProfileMutation = usePatchMyProfileMutation()
  const { matchId } = useParams<RouteParams>()
  const history = useHistory()

  const currentUserIsMentor = currentUser?.userType === 'mentor'
  const currentUserIsMentee = currentUser?.userType === 'mentee'
  const currentMatch = matches.find((match) => match.id === matchId)
  const profile =
    currentMatch && currentMatch[currentUserIsMentor ? 'mentee' : 'mentor']
  const pageHeading = currentUserIsMentor
    ? `Mentorship with ${profile?.firstName} ${profile?.lastName}`
    : 'My Mentorship'

  useEffect(() => {
    if (!profile) matchesFetchStart()
  }, [profile])

  if (!myProfileQuery.isSuccess) return null

  const myProfile = myProfileQuery.data.conProfile
  const myUserType = myProfile.userType

  console.log(myUserType, myProfile)

  if (!profile) return <Redirect to={'/app/mentorships/'} />

  return (
    <LoggedIn>
      {matches.length > 1 && (
        <Columns>
          <Columns.Column>
            <Button onClick={() => history.push('/app/mentorships/')} simple>
              <Button.Icon icon="arrowLeft" space="right" />
              Back to mentee overview
            </Button>
          </Columns.Column>
        </Columns>
      )}

      <Columns>
        <Columns.Column>
          <Heading subtitle size="small" className="double-bs">
            {pageHeading}
          </Heading>
        </Columns.Column>

        <Columns.Column className="is-narrow">
          {currentMatch &&
            currentMatch.status === 'accepted' &&
            currentUserIsMentor && <CompleteMentorship match={currentMatch} />}
        </Columns.Column>
      </Columns>
      {currentUserIsMentee && (
        <Content
          size="medium"
          renderAs="p"
          responsive={{ mobile: { hide: { value: true } } }}
        >
          Below you can see your ongoing mentorship with your mentor{' '}
          <strong>
            {profile?.firstName} {profile?.lastName}
          </strong>
          .
        </Content>
      )}

      <Columns>
        <Columns.Column size={4}>
          <ProfileCard
            profile={profile}
            linkTo={`/app/mentorships/profile/${profile.id}`}
          />
          <MContacts
            profile={profile as RedProfile}
            className="is-hidden-tablet"
          />
          <MSessions
            sessions={profile?.redMentoringSessionsWithCurrentUser}
            menteeId={profile.id}
            editable={currentUserIsMentor}
          />
          {currentUser && (
            <ReportProblem
              type={currentUser.userType}
              redProfileId={profile.id}
            />
          )}
        </Columns.Column>
        <Columns.Column size={8}>
          <MContacts
            profile={profile as RedProfile}
            className="is-hidden-mobile"
          />
        </Columns.Column>
      </Columns>
    </LoggedIn>
  )
}

const mapStateToProps = (state: RootState) => ({
  currentUser: state.user.profile,
  matches: getMatches(state.matches),
})

export default connect(mapStateToProps, null)(Mentorship)
