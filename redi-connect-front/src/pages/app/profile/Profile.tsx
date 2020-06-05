import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getHasReachedMenteeLimit } from '../../../redux/user/selectors'
import { useParams, useHistory } from 'react-router'
import { RootState } from '../../../redux/types'
import { Columns, Element, Notification } from 'react-bulma-components'
import { Button, Heading } from '../../../components/atoms'
import {
  ReadAbout,
  ReadMentoringTopics,
  ReadContactDetails,
  ReadSocialMedia,
  ReadLanguages,
  ReadPersonalDetail,
  ReadRediClass,
  ReadOccupation
} from '../../../components/molecules'
import { ApplyForMentor, Avatar, ConfirmMentorship } from '../../../components/organisms'
import { LoggedIn } from '../../../components/templates'
import { FullScreenCircle } from '../../../hooks/WithLoading'
import { RedProfile } from '../../../types/RedProfile'
import { profilesFetchOneStart } from '../../../redux/profiles/actions'
import { ProfileAcceptedMatch } from './acceptedMatch/ProfileAcceptedMatch'

interface RouteParams {
  profileId: string
}

interface ProfileProps {
  loading: boolean
  profile: RedProfile | undefined
  currentUser: RedProfile | undefined
  hasReachedMenteeLimit: boolean
  profilesFetchOneStart: Function
}

function Profile ({ loading, profile, currentUser, hasReachedMenteeLimit, profilesFetchOneStart }: ProfileProps) {
  const { profileId } = useParams<RouteParams>()
  const history = useHistory()

  useEffect(() => {
    profilesFetchOneStart(profileId)
  }, [profilesFetchOneStart])

  const currentUserIsMentor =
  currentUser && currentUser.userType === 'mentor'

  const currentUserIsMentee =
  currentUser && currentUser.userType === 'mentee'

  const isAcceptedMatch =
    profile &&
    profile.redMatchesWithCurrentUser &&
    profile.redMatchesWithCurrentUser[0] &&
    profile.redMatchesWithCurrentUser[0].status === 'accepted'

  const hasOpenApplication =
    profile &&
    profile.numberOfPendingApplicationWithCurrentUser > 0

  const userCanApplyForMentorship = !isAcceptedMatch &&
    currentUserIsMentee &&
    profile &&
    profile.numberOfPendingApplicationWithCurrentUser === 0

  const contactInfoAvailable =
    currentUserIsMentor &&
    profile && (
      profile.firstName ||
      profile.lastName ||
      profile.contactEmail ||
      profile.telephoneNumber ||
      profile.linkedInProfileUrl ||
      profile.githubProfileUrl ||
      profile.slackUsername
    )

  const match =
    profile &&
    profile.userType === 'mentee' &&
    profile.redMatchesWithCurrentUser &&
    profile.redMatchesWithCurrentUser[0]

  if (loading) return (<FullScreenCircle loading={loading} />)

  return (
    <LoggedIn>
      {hasOpenApplication &&
        <Notification>
          Awesome, your application has been sent.
          If you want to read it later on you can find it
          in <a onClick={() => history.push('/app/applications') }>your applications.</a>
        </Notification>
      }

      <Columns>
        <Columns.Column>
          {(!isAcceptedMatch || currentUserIsMentor) &&
            <Button onClick={() => history.goBack()} simple>
              <Button.Icon icon="arrowLeft" space="right" />
              back
            </Button>
          }
        </Columns.Column>

        {userCanApplyForMentorship &&
          <Columns.Column className="is-narrow">
            <ApplyForMentor />
          </Columns.Column>
        }

        {match && match.status === 'applied' &&
          <Columns.Column className="is-narrow">
            <ConfirmMentorship
              matchId={match.id}
              menteeName={profile && profile.firstName}
              hasReachedMenteeLimit={hasReachedMenteeLimit}
            />
          </Columns.Column>
        }
      </Columns>

      {isAcceptedMatch && profile && (
        <ProfileAcceptedMatch profile={profile} />
      )}

      {!isAcceptedMatch && profile && <>
        <Columns vCentered breakpoint="mobile" className="double-block-space">
          <Columns.Column size={3}>
            <Avatar profile={profile} />
          </Columns.Column>
          <Columns.Column size={9}>
            <Heading>{profile.firstName} {profile.lastName}</Heading>
          </Columns.Column>
        </Columns>

        <Element className="block-separator">
          <ReadAbout.Some profile={profile} />
        </Element>

        {profile.categories &&
          <Element className="block-separator">
            <ReadMentoringTopics.Some profile={profile} />
          </Element>
        }

        {contactInfoAvailable &&
          <Element className="block-separator">
            <Columns>
              {(profile.firstName || profile.age) && <Columns.Column>
                <Element className="block-separator">
                  <ReadContactDetails.Some profile={profile} />
                </Element>
              </Columns.Column>}
              <Columns.Column>
                <ReadSocialMedia.Some profile={profile} />
              </Columns.Column>
            </Columns>
          </Element>
        }

        {(profile.languages || profile.gender || profile.age) &&
           <Element className="block-separator">
             <Columns>
               {(profile.gender || profile.age) && <Columns.Column>
                 <Element className="block-separator">
                   <ReadPersonalDetail.Some profile={profile} />
                 </Element>
               </Columns.Column>}
               <Columns.Column>
                 <ReadLanguages.Some profile={profile} />
               </Columns.Column>
             </Columns>
           </Element>
        }

        {(profile.mentor_occupation || profile.mentee_occupationCategoryId || profile.mentee_currentlyEnrolledInCourse) &&
          <Element className="block-separator">
            <Columns>
              {(profile.mentor_occupation || profile.mentee_occupationCategoryId) && <Columns.Column>
                <Element className="block-separator">
                  <ReadOccupation.Some profile={profile} />
                </Element>
              </Columns.Column>}
              {currentUserIsMentor && <Columns.Column>
                <ReadRediClass.Some profile={profile} />
              </Columns.Column>}
            </Columns>
          </Element>
        }
      </>}
    </LoggedIn>
  )
}
const mapStateToProps = (state: RootState) => ({
  loading: state.profiles.loading,
  profile: state.profiles.oneProfile,
  currentUser: state.user.profile,
  hasReachedMenteeLimit: getHasReachedMenteeLimit(state.user)
})

const mapDispatchToProps = (dispatch: any) => ({
  profilesFetchOneStart: (profileId: string) => dispatch(profilesFetchOneStart(profileId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
