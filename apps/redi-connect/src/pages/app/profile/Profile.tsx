import { FC, useEffect } from 'react'
import { connect } from 'react-redux'
import { getHasReachedMenteeLimit } from '../../../redux/user/selectors'
import { useParams, useHistory } from 'react-router'
import { RootState } from '../../../redux/types'
import { Columns, Element, Notification, Content } from 'react-bulma-components'
import {
  Button,
  Heading,
  Icon,
} from '@talent-connect/shared-atomic-design-components'
import {
  ReadAbout,
  ReadMentoringTopics,
  ReadEducation,
  ReadContactDetails,
  ReadSocialMedia,
  ReadLanguages,
  ReadPersonalDetail,
  ReadRediClass,
  ReadOccupation,
} from '../../../components/molecules'
import {
  ApplyForMentor,
  Avatar,
  ConfirmMentorship,
} from '../../../components/organisms'
import { LoggedIn } from '../../../components/templates'
import { RedProfile } from '@talent-connect/shared-types'
import { profilesFetchOneStart } from '../../../redux/profiles/actions'
import { REDI_LOCATION_NAMES } from '@talent-connect/shared-config'
import './Profile.scss'
import DeclineMentorshipButton from '../../../components/organisms/DeclineMentorshipButton'

interface RouteParams {
  profileId: string
}

interface ProfileProps {
  profile: RedProfile | undefined
  currentUser: RedProfile | undefined
  hasReachedMenteeLimit: boolean
  profilesFetchOneStart: (profileId: string) => void
}

const Profile: FC<ProfileProps> = ({
  profile,
  currentUser,
  hasReachedMenteeLimit,
  profilesFetchOneStart,
}) => {
  const { profileId } = useParams<RouteParams>()
  const history = useHistory()

  useEffect(() => {
    profilesFetchOneStart(profileId)
  }, [profilesFetchOneStart, profileId])

  const currentUserIsMentor = currentUser?.userType === 'mentor'

  const currentUserIsMentee = currentUser?.userType === 'mentee'

  const isAcceptedMatch =
    profile?.redMatchesWithCurrentUser?.[0].status === 'accepted'

  const hasOpenApplication =
    profile?.numberOfPendingApplicationWithCurrentUser > 0

  const userCanApplyForMentorship =
    !isAcceptedMatch &&
    currentUserIsMentee &&
    profile &&
    !profile.numberOfPendingApplicationWithCurrentUser

  const contactInfoAvailable =
    profile &&
    (profile.firstName ||
      profile.lastName ||
      profile.contactEmail ||
      profile.telephoneNumber ||
      profile.linkedInProfileUrl ||
      profile.githubProfileUrl ||
      profile.slackUsername)

  const shouldHidePrivateContactInfo = currentUserIsMentee && !isAcceptedMatch

  const match =
    profile &&
    profile.userType === 'mentee' &&
    profile.redMatchesWithCurrentUser &&
    profile.redMatchesWithCurrentUser [
      profile.redMatchesWithCurrentUser.length - 1
    ]

  return (
    <LoggedIn>
      {hasOpenApplication && (
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
            <ApplyForMentor />
          </Columns.Column>
        )}

        {match?.status === 'applied' && (
          <Columns.Column className="is-narrow">
            <ConfirmMentorship
              match={match}
              menteeName={profile?.firstName}
              hasReachedMenteeLimit={hasReachedMenteeLimit}
            />
            <DeclineMentorshipButton match={match} />
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
              <Heading>
                {profile.firstName} {profile.lastName}
              </Heading>
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

          {profile.categories?.length && (
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
const mapStateToProps = ({ profiles, user }: RootState) => ({
  profile: profiles.oneProfile,
  currentUser: user.profile,
  hasReachedMenteeLimit: getHasReachedMenteeLimit(user),
})

const mapDispatchToProps = (dispatch: Function) => ({
  profilesFetchOneStart: (profileId: string) =>
    dispatch(profilesFetchOneStart(profileId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
