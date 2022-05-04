import {
  MentorshipMatchStatus,
  useFindMatchQuery,
  useLoadMyProfileQuery,
  useMyMatchesQuery,
} from '@talent-connect/data-access'
import {
  Button,
  Heading,
} from '@talent-connect/shared-atomic-design-components'
import { RedMatch, RedProfile, UserType } from '@talent-connect/shared-types'
import React from 'react'
import { Columns, Content } from 'react-bulma-components'
import { connect } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import {
  CompleteMentorship,
  MContacts,
  MSessions,
  ProfileCard,
  ReportProblem,
} from '../../../components/organisms'
import { LoggedIn } from '../../../components/templates'
import { getAccessTokenFromLocalStorage } from '../../../services/auth/auth'

export interface MentorshipRouteParams {
  matchId: string
}

function Mentorship() {
  const myAcceptedMatchesQuery = useMyMatchesQuery({
    status: MentorshipMatchStatus.Accepted,
  })
  const loopbackUserId = getAccessTokenFromLocalStorage().userId
  const myProfileQuery = useLoadMyProfileQuery({ loopbackUserId })

  const { matchId } = useParams<MentorshipRouteParams>()
  const findMatchQuery = useFindMatchQuery({ id: matchId })
  const history = useHistory()

  if (!findMatchQuery.isSuccess) return null
  if (!myProfileQuery.isSuccess) return null
  if (!myAcceptedMatchesQuery.isSuccess) return null

  const myProfile = myProfileQuery.data.conProfile
  const myUserType = myProfile.userType
  const viewMatch = findMatchQuery.data.conMentorshipMatch
  const myActiveMatches = myAcceptedMatchesQuery.data.conMentorshipMatches

  const currentUserIsMentee = myUserType === 'MENTEE'
  const currentUserIsMentor = myUserType === 'MENTOR'
  const currentMatch = findMatchQuery.data.conMentorshipMatch
  const viewProfile = currentMatch[currentUserIsMentor ? 'mentee' : 'mentor']
  const pageHeading = currentUserIsMentor
    ? `Mentorship with ${viewProfile.firstName} ${viewProfile.lastName}`
    : 'My Mentorship'

  return (
    <LoggedIn>
      {myActiveMatches.length > 1 && (
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
          {viewMatch.status === MentorshipMatchStatus.Accepted &&
            currentUserIsMentor && (
              <CompleteMentorship match={currentMatch as unknown as RedMatch} />
            )}
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
            {viewProfile.firstName} {viewProfile.lastName}
          </strong>
          .
        </Content>
      )}

      <Columns>
        <Columns.Column size={4}>
          <ProfileCard
            profile={viewProfile}
            linkTo={`/app/mentorships/profile/${viewProfile.id}`}
          />
          <MContacts
            profile={viewProfile as unknown as RedProfile}
            className="is-hidden-tablet"
          />
          <MSessions
            sessions={viewMatch.mentoringSessions}
            menteeId={viewProfile._contactId}
            editable={currentUserIsMentor}
          />
          <ReportProblem
            type={myProfile.userType as unknown as UserType}
            redProfileId={myProfile.id}
          />
        </Columns.Column>
        <Columns.Column size={8}>
          <MContacts
            profile={viewProfile as unknown as RedProfile}
            className="is-hidden-mobile"
          />
        </Columns.Column>
      </Columns>
    </LoggedIn>
  )
}

export default Mentorship
