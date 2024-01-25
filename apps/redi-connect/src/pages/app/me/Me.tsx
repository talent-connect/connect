import {
  Heading,
  OnboardingSteps,
} from '@talent-connect/shared-atomic-design-components'
import { Columns, Element } from 'react-bulma-components'
import {
  Avatar,
  EditableAbout,
  EditableContactDetails,
  EditableEducation,
  EditableLanguages,
  EditableMenteeCount,
  EditableMentoringTopics,
  EditableOccupation,
  EditablePersonalDetail,
  EditableSocialMedia,
} from '../../../components/organisms'

import { LoggedIn } from '../../../components/templates'
import { getAccessTokenFromLocalStorage } from '../../../services/auth/auth'

import { useLoadMyProfileQuery, UserType } from '@talent-connect/data-access'
// CHECK OUT THE LOADER

function Me() {
  const myProfileResult = useLoadMyProfileQuery(
    {
      loopbackUserId: getAccessTokenFromLocalStorage().userId,
    },
    { onSuccess: () => console.log('Me loaded it') }
  )

  // TODO: insert proper error handling here and elsewhere. We should cover cases where we
  // get values usch as myProfileResult.isError. Perhaps we-ure the error boundary logic
  // that Eric has been looking into.

  const conProfile = myProfileResult?.data?.conProfile
  console.log('conProfile', conProfile)

  const userIsMentee = conProfile?.userType === UserType.Mentee
  const userIsMentor = conProfile?.userType === UserType.Mentor

  const steps = [
    'Fill out your profile',
    'Send profile for review',
    'Await profile approval',
    `You're all set!`,
  ]

  return (
    <LoggedIn>
      <Columns vCentered breakpoint="mobile" className="oneandhalf-bs">
        <Columns.Column size={3}>
          <Avatar.Editable />
        </Columns.Column>
        <Columns.Column size={8}>
          <Heading>
            {conProfile?.firstName} {conProfile?.lastName}
          </Heading>
        </Columns.Column>
      </Columns>
      <Element>
        <OnboardingSteps steps={steps} profile={conProfile} />
      </Element>
      <Element className="block-separator">
        <EditableAbout />
      </Element>

      <Element className="block-separator">
        <EditableMentoringTopics />
      </Element>
      {userIsMentor && (
        <Element className="block-separator">
          <Columns>
            <Columns.Column size={12}>
              <EditableMenteeCount />
            </Columns.Column>
          </Columns>
        </Element>
      )}

      <Element className="block-separator">
        <Columns>
          <Columns.Column size={6}>
            <Element className="block-separator">
              <EditableContactDetails />
            </Element>
          </Columns.Column>
          <Columns.Column size={6}>
            <EditableSocialMedia />
          </Columns.Column>
        </Columns>
      </Element>

      <Element className="block-separator">
        <Columns>
          <Columns.Column size={6}>
            <Element className="block-separator">
              <EditablePersonalDetail />
            </Element>
          </Columns.Column>
          <Columns.Column size={6}>
            <EditableLanguages />
          </Columns.Column>
        </Columns>
      </Element>

      {userIsMentee && (
        <Element className="block-separator">
          <Columns>
            <Columns.Column size={6}>
              <Element className="block-separator">
                <EditableEducation />
              </Element>
            </Columns.Column>
            <Columns.Column size={6}>
              {/* Commented until we implement it using the data available in Salesforce */}
              {/* <ReadRediClass.Me /> */}
              <EditableOccupation />
            </Columns.Column>
          </Columns>
        </Element>
      )}

      {/* When ReDI course is re-implemented, remove userIsMentor condition from here & EditableOccupation component above */}
      {userIsMentor && (
        <Element className="block-separator">
          <Columns>
            <Columns.Column size={6}>
              <EditableOccupation />
            </Columns.Column>
          </Columns>
        </Element>
      )}
    </LoggedIn>
  )
}

export default Me
