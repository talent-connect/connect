import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getHasReachedMenteeLimit } from '../../../redux/user/selectors'
import { useParams, useHistory } from 'react-router'
import { RootState } from '../../../redux/types'
import { Columns, Element, Notification, Tag } from 'react-bulma-components'
import {
  Button,
  Heading,
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
import { RedProfile } from '../../../types/RedProfile'
import { profilesFetchOneStart } from '../../../redux/profiles/actions'
import { rediLocationNames } from '../../../config/config'

interface RouteParams {
  profileId: string
}

interface ProfileProps {
  profile: RedProfile | undefined
  currentUser: RedProfile | undefined
  hasReachedMenteeLimit: boolean
  profilesFetchOneStart: Function
}

function Profile({
  profile,
  currentUser,
  hasReachedMenteeLimit,
  profilesFetchOneStart,
}: ProfileProps) {
  const { profileId } = useParams<RouteParams>()
  const history = useHistory()

  useEffect(() => {
    profilesFetchOneStart(profileId)
  }, [profilesFetchOneStart, profileId])

  const currentUserIsMentor = currentUser && currentUser.userType === 'mentor'

  const currentUserIsMentee = currentUser && currentUser.userType === 'mentee'

  const isAcceptedMatch =
    profile &&
    profile.redMatchesWithCurrentUser &&
    profile.redMatchesWithCurrentUser[0] &&
    profile.redMatchesWithCurrentUser[0].status === 'accepted'

  const hasOpenApplication =
    profile && profile.numberOfPendingApplicationWithCurrentUser > 0

  const userCanApplyForMentorship =
    !isAcceptedMatch &&
    currentUserIsMentee &&
    profile &&
    profile.numberOfPendingApplicationWithCurrentUser === 0

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
    profile.redMatchesWithCurrentUser[0]

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

        {match && match.status === 'applied' && (
          <Columns.Column className="is-narrow">
            <ConfirmMentorship
              match={match}
              menteeName={profile && profile.firstName}
              hasReachedMenteeLimit={hasReachedMenteeLimit}
            />
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
                {profile.firstName} {profile.lastName}{' '}
                <Tag size="medium" rounded>
                  (in {rediLocationNames[profile.rediLocation]})
                </Tag>
              </Heading>
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
const mapStateToProps = (state: RootState) => ({
  profile: state.profiles.oneProfile,
  currentUser: state.user.profile,
  hasReachedMenteeLimit: getHasReachedMenteeLimit(state.user),
})

const mapDispatchToProps = (dispatch: any) => ({
  profilesFetchOneStart: (profileId: string) =>
    dispatch(profilesFetchOneStart(profileId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
