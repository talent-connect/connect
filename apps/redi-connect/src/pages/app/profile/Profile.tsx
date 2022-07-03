import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useParams, useHistory } from 'react-router'
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
import { REDI_LOCATION_NAMES } from '@talent-connect/shared-config'
import './Profile.scss'
import DeclineMentorshipButton from '../../../components/organisms/DeclineMentorshipButton'
import {
  ConProfile,
  MentorshipMatchStatus,
  useFindConProfileQuery,
  useLoadMyProfileQuery,
} from '@talent-connect/data-access'
import { getAccessTokenFromLocalStorage } from '../../../services/auth/auth'

interface RouteParams {
  profileId: string
}

interface ProfileProps {
  profile: RedProfile | undefined
  currentUser: RedProfile | undefined
  hasReachedMenteeLimit: boolean
  profilesFetchOneStart: Function
}

/**
 *
 * What do we need?
 * - if mentor, computer whether mentee limit has been reached
 * - load current user's matches with the given mentor/mentee
 */

function Profile({
  currentUser,
  hasReachedMenteeLimit,
  profilesFetchOneStart,
}: ProfileProps) {
  const { profileId } = useParams<RouteParams>()
  const profileQuery = useFindConProfileQuery({ conProfileId: profileId })
  const myProfileQuery = useLoadMyProfileQuery({
    loopbackUserId: getAccessTokenFromLocalStorage().userId,
  })
  const history = useHistory()

  if (!profileQuery.isSuccess || !myProfileQuery.isSuccess) return null

  const myProfile = myProfileQuery.data.conProfile
  const profile = profileQuery.data.conProfile

  const currentUserIsMentor = currentUser && currentUser.userType === 'mentor'

  const currentUserIsMentee = currentUser && currentUser.userType === 'mentee'

  const myMatchWithThisProfile = myProfile.mentorshipMatches.find(
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

        {myMatchWithThisProfile && myMatchWithThisProfile.status === 'applied' && (
          <Columns.Column className="is-narrow">
            <ConfirmMentorship
              match={myMatchWithThisProfile}
              menteeName={profile && profile.firstName}
              hasReachedMenteeLimit={hasReachedMenteeLimit}
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

          {profile.categories?.length > 0 && (
            <Element className="block-separator">
              {/* //! TODO: fix this type assertion */}
              <ReadMentoringTopics.Some
                profile={profile as unknown as ConProfile}
              />
            </Element>
          )}

          {contactInfoAvailable && (
            <Element className="block-separator">
              <Columns>
                {!shouldHidePrivateContactInfo &&
                  (profile.firstName || profile.age) && (
                    <Columns.Column>
                      <Element className="block-separator">
                        {/* //! TODO: fix this type assertion */}
                        <ReadContactDetails.Some
                          profile={profile as unknown as ConProfile}
                        />
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
                      {/* //! TODO: fix this type assertion */}
                      <ReadPersonalDetail.Some
                        profile={profile as unknown as ConProfile}
                      />
                    </Element>
                  </Columns.Column>
                )}
                <Columns.Column>
                  <ReadLanguages.Some
                    profile={profile as unknown as ConProfile}
                  />
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
                      <ReadEducation.Some
                        profile={profile as unknown as ConProfile}
                      />
                    </Element>
                  </Columns.Column>
                )}
                <Columns.Column>
                  <ReadRediClass.Some
                    profile={profile as unknown as ConProfile}
                  />
                </Columns.Column>
              </Columns>
            </Element>
          )}

          {(profile.mentor_occupation ||
            profile.mentee_occupationCategoryId) && (
            <Element className="block-separator">
              <Columns>
                <Columns.Column>
                  <ReadOccupation.Some
                    profile={profile as unknown as ConProfile}
                  />
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
