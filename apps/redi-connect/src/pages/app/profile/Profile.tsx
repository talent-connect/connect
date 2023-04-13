import {
  MentorshipMatchStatus,
  useLoadMyProfileQuery,
  UserType,
} from '@talent-connect/data-access'
import {
  Button,
  Heading,
  Icon,
} from '@talent-connect/shared-atomic-design-components'
import { REDI_LOCATION_NAMES } from '@talent-connect/shared-config'
import { Columns, Content, Element, Notification } from 'react-bulma-components'
import { useHistory, useParams } from 'react-router-dom'
import {
  ReadAbout,
  ReadContactDetails,
  ReadEducation,
  ReadLanguages,
  ReadMentoringTopics,
  ReadOccupation,
  ReadPersonalDetail,
  ReadRediClass,
  ReadSocialMedia,
} from '../../../components/molecules'
import {
  ApplyForMentor,
  Avatar,
  ConfirmMentorship,
} from '../../../components/organisms'
import DeclineMentorshipButton from '../../../components/organisms/DeclineMentorshipButton'
import { LoggedIn } from '../../../components/templates'
import { getAccessTokenFromLocalStorage } from '../../../services/auth/auth'
import { useProfilePageQueryQuery } from './Profile.generated'
import './Profile.scss'

interface RouteParams {
  profileId: string
}

function Profile() {
  const { profileId } = useParams<RouteParams>()
  const profileQuery = useProfilePageQueryQuery({ id: profileId })
  const myProfileQuery = useLoadMyProfileQuery({
    loopbackUserId: getAccessTokenFromLocalStorage().userId,
  })
  const history = useHistory()

  if (!profileQuery.isSuccess || !myProfileQuery.isSuccess) return null

  const myProfile = myProfileQuery.data.conProfile
  const profile = profileQuery.data.conProfile

  const currentUserIsMentor = myProfile.userType === UserType.Mentor
  const currentUserIsMentee = myProfile.userType === UserType.Mentee

  // If any match exists between this mentee and mentor, get the most recent one.
  // This is an edge case, but it is possible for a mentee to apply to the same
  // mentor more than once.
  const myMatchWithThisProfile = myProfile.mentorshipMatches
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .find(
      (match) => match.mentee.id === profileId || match.mentor.id === profileId
    )

  const isAcceptedMatch = Boolean(
    myMatchWithThisProfile?.status === MentorshipMatchStatus.Accepted
  )

  const hasOpenApplication =
    myMatchWithThisProfile?.status === MentorshipMatchStatus.Applied

  const userCanApplyForMentorship =
    !isAcceptedMatch && currentUserIsMentee && !hasOpenApplication

  const contactInfoAvailable =
    profile &&
    (profile.firstName ||
      profile.lastName ||
      profile.email ||
      profile.telephoneNumber ||
      profile.linkedInProfileUrl ||
      profile.githubProfileUrl ||
      profile.slackUsername)

  const shouldHidePrivateContactInfo = currentUserIsMentee && !isAcceptedMatch

  return (
    <LoggedIn>
      {currentUserIsMentee && hasOpenApplication && (
        <Notification>
          Awesome, your application has been sent. If you want to read it later
          on you can find it in{' '}
          <a onClick={() => history.push('/app/applications')}>
            your applications.
          </a>
        </Notification>
      )}

      <Columns>
        <Columns.Column>
          <Button onClick={() => history.goBack()} simple>
            <Button.Icon icon="arrowLeft" space="right" />
            back
          </Button>
        </Columns.Column>

        {userCanApplyForMentorship && (
          <Columns.Column className="is-narrow">
            <ApplyForMentor mentor={profile} />
          </Columns.Column>
        )}

        {myMatchWithThisProfile &&
          currentUserIsMentor &&
          myMatchWithThisProfile.status === MentorshipMatchStatus.Applied && (
            <Columns.Column className="is-narrow">
              <ConfirmMentorship
                match={myMatchWithThisProfile}
                menteeName={profile && profile.firstName}
              />
              <DeclineMentorshipButton match={myMatchWithThisProfile} />
            </Columns.Column>
          )}
      </Columns>

      {profile && (
        <>
          <Columns vCentered breakpoint="mobile" className="oneandhalf-bs">
            <Columns.Column size={3}>
              <Avatar profile={profile} />
            </Columns.Column>
            <Columns.Column size={9}>
              <Heading>{profile.fullName}</Heading>
              <Element className="location-tag">
                <Icon icon="mapPin" className="icon-align" />
                <Content size="medium" renderAs="p">
                  {REDI_LOCATION_NAMES[profile.rediLocation]}
                </Content>
              </Element>
            </Columns.Column>
          </Columns>

          {(profile.personalDescription || profile.expectations) && (
            <Element className="block-separator">
              <ReadAbout.Some profile={profile} />
            </Element>
          )}

          {profile.categories?.length > 0 && (
            <Element className="block-separator">
              <ReadMentoringTopics.Some profile={profile} />
            </Element>
          )}

          {contactInfoAvailable && (
            <Element className="block-separator">
              <Columns>
                {!shouldHidePrivateContactInfo &&
                  (profile.firstName || profile.age) && (
                    <Columns.Column>
                      <Element className="block-separator">
                        <ReadContactDetails.Some profile={profile} />
                      </Element>
                    </Columns.Column>
                  )}
                {(profile.linkedInProfileUrl ||
                  profile.githubProfileUrl ||
                  profile.slackUsername) && (
                  <Columns.Column>
                    <ReadSocialMedia.Some profile={profile} />
                  </Columns.Column>
                )}
              </Columns>
            </Element>
          )}

          {(profile.languages || profile.gender || profile.age) && (
            <Element className="block-separator">
              <Columns>
                {(profile.gender || profile.age) && (
                  <Columns.Column>
                    <Element className="block-separator">
                      <ReadPersonalDetail.Some profile={profile} />
                    </Element>
                  </Columns.Column>
                )}
                <Columns.Column>
                  <ReadLanguages.Some profile={profile} />
                </Columns.Column>
              </Columns>
            </Element>
          )}

          {currentUserIsMentor && (
            <Element className="block-separator">
              <Columns>
                {profile.mentee_highestEducationLevel && (
                  <Columns.Column>
                    <Element className="block-separator">
                      <ReadEducation.Some profile={profile} />
                    </Element>
                  </Columns.Column>
                )}
                <Columns.Column>
                  <ReadRediClass.Some profile={profile} />
                </Columns.Column>
              </Columns>
            </Element>
          )}

          {(profile.mentor_occupation ||
            profile.mentee_occupationCategoryId) && (
            <Element className="block-separator">
              <Columns>
                <Columns.Column>
                  <ReadOccupation.Some profile={profile} />
                </Columns.Column>
              </Columns>
            </Element>
          )}
        </>
      )}
    </LoggedIn>
  )
}

export default Profile
