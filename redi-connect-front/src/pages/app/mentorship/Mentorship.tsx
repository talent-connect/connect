import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useParams, useHistory } from 'react-router'
import { Heading, Button } from '../../../components/atoms'
import { ProfileCard, MContacts, MSessions, ReportProblem } from '../../../components/organisms'
import { Columns, Content } from 'react-bulma-components'
import { RootState } from '../../../redux/types'
import { RedProfile } from '../../../types/RedProfile'
import { profilesFetchOneStart } from '../../../redux/profiles/actions'
import { LoggedIn } from '../../../components/templates'

interface RouteParams {
  profileId: string
}
interface MentorshipProps {
  profile?: RedProfile
  currentUser?: RedProfile
  profilesFetchOneStart: (profileId: string) => void
}

const Mentorship = ({ profile, currentUser, profilesFetchOneStart }: MentorshipProps) => {
  const { profileId } = useParams<RouteParams>()
  const history = useHistory()

  useEffect(() => {
    profilesFetchOneStart(profileId)
  }, [profileId])

  if (!profile) return <>loading...</>

  const currentUserIsMentor = currentUser?.userType === 'mentor'
  const currentUserIsMentee = currentUser?.userType === 'mentee'

  const pageHeading = currentUserIsMentor
    ? `Mentorship with ${profile.firstName} ${profile.lastName}`
    : 'My Mentorship'

  const isMentorWithMultipleActiveMentees =
  currentUserIsMentor &&
  currentUser &&
  currentUser.currentMenteeCount > 1

  return (
    <LoggedIn>
      <Columns>
        <Columns.Column>
          { isMentorWithMultipleActiveMentees && (
            <Button onClick={() => history.goBack()} simple>
              <Button.Icon icon="arrowLeft" space="right" />
              Back to mentee overview
            </Button>
          )}
        </Columns.Column>
      </Columns>

      <Heading subtitle size="small" className="double-bs">{pageHeading}</Heading>
      {currentUserIsMentee && <Content size="medium" renderAs="p" responsive={{ mobile: { hide: { value: true } } }}>
        Below you can see your ongoing mentorship with your mentor <strong>{profile?.firstName} {profile?.lastName}</strong>.
      </Content>}

      <Columns>
        <Columns.Column size={4}>
          <ProfileCard profile={profile} />
          <MSessions
            sessions={profile?.redMentoringSessionsWithCurrentUser}
            menteeId={profile.id}
            editable={currentUserIsMentor}
          />
          {currentUser && <ReportProblem
            type={currentUser.userType}
            redProfileId={profile.id}
          />}
        </Columns.Column>
        <Columns.Column size={8}>
          <MContacts profile={profile as RedProfile} />
        </Columns.Column>
      </Columns>
    </LoggedIn>
  )
}

const mapStateToProps = (state: RootState) => ({
  currentUser: state.user.profile,
  profile: state.profiles.oneProfile
})

const mapDispatchToProps = (dispatch: any) => ({
  profilesFetchOneStart: (profileId: string) => dispatch(profilesFetchOneStart(profileId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Mentorship)
