import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useParams, useHistory, Redirect } from 'react-router'
import {
  Heading,
  Button,
} from '@talent-connect/shared-atomic-design-components'
import {
  ProfileCard,
  MContacts,
  MSessions,
  ReportProblem,
  CompleteMentorship,
} from '../../../components/organisms'
import { Columns, Content } from 'react-bulma-components'
import { RootState } from '../../../redux/types'
import { RedProfile } from '@talent-connect/shared-types'
import { LoggedIn } from '../../../components/templates'
import { useLoading } from '../../../hooks/WithLoading'
import { getMatches } from '../../../redux/matches/selectors'
import { RedMatch } from '@talent-connect/shared-types'
import { matchesFetchStart } from '../../../redux/matches/actions'

interface RouteParams {
  profileId: string
}
interface MentorshipProps {
  currentUser?: RedProfile
  matches: RedMatch[]
}

const Mentorship = ({ currentUser, matches }: MentorshipProps) => {
  const { profileId } = useParams<RouteParams>()
  const history = useHistory()
  const currentUserIsMentor = currentUser?.userType === 'mentor'
  const currentUserIsMentee = currentUser?.userType === 'mentee'
  const currentMatch = matches.find((match) => match.id === profileId)
  const profile =
    currentMatch && currentMatch[currentUserIsMentor ? 'mentee' : 'mentor']
  const pageHeading = currentUserIsMentor
    ? `Mentorship with ${profile?.firstName} ${profile?.lastName}`
    : 'My Mentorship'

  useEffect(() => {
    if (!profile) matchesFetchStart()
  }, [])

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
