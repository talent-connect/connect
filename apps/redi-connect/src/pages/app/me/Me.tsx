// import { usePatchMyProfileMutation } from '@talent-connect/data-access'
import {
  Button,
  Heading,
  Icon,
} from '@talent-connect/shared-atomic-design-components'
import { Columns, Content, Element } from 'react-bulma-components'
import { useQueryClient } from 'react-query'
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

import {
  ConnectProfileStatus,
  UserType,
  useConProfileSubmitForReviewMutation,
  useLoadMyProfileQuery,
} from '@talent-connect/data-access'
import { REDI_LOCATION_NAMES } from '@talent-connect/shared-config'
import { useLoading } from '../../../hooks/WithLoading'
// CHECK OUT THE LOADER
import './Me.scss'
import OnboardingSteps from './OnboardingSteps'

function Me() {
  const queryClient = useQueryClient()
  const submitProfileForReviewMutation = useConProfileSubmitForReviewMutation()
  const { Loading, isLoading } = useLoading()
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
  if (!conProfile) return <Loading />

  const {
    userType,
    firstName,
    lastName,
    mentor_isPartnershipMentor,
    profileStatus,
    personalDescription,
    languages,
    mentee_occupationCategoryId,
    categories,
    menteeCountCapacity,
    mentor_workPlace,
    rediLocation,
  } = conProfile

  const isMentee = userType === UserType.Mentee
  const isMentor = userType === UserType.Mentor
  const isCorporateMentor = isMentor && mentor_isPartnershipMentor

  const isMenteeProfileComplete =
    isMentee &&
    personalDescription !== null &&
    categories.length > 0 &&
    languages !== null &&
    mentee_occupationCategoryId !== null

  const isMentorProfileComplete =
    isMentor &&
    personalDescription !== null &&
    categories.length > 0 &&
    languages !== null &&
    menteeCountCapacity !== null &&
    mentor_workPlace !== null

  const isReadyToSubmit = isMenteeProfileComplete || isMentorProfileComplete
  const isDraftingProfile =
    profileStatus === ConnectProfileStatus.DraftingProfile

  const currentStep = defineCurrentStep(profileStatus, isReadyToSubmit)

  const submitProfileForReview = async () => {
    if (!window.confirm('Would you like to submit your profile for review?'))
      return

    const mutationResult = await submitProfileForReviewMutation.mutateAsync({})
    queryClient.setQueryData(
      useLoadMyProfileQuery.getKey({
        loopbackUserId: getAccessTokenFromLocalStorage().userId,
      }),
      {
        conProfile: mutationResult.conProfileSubmitForReview,
      }
    )
  }

  return (
    <LoggedIn>
      {/* testing Tailwind classes */}
      <div className="text-2xl bg-purple-200 text-red-500">
        Hello TailwindCSS
      </div>
      <div className="text-3xl font-bold underline">Hello TailwindCSS</div>
      <div className="bg-indigo-500 p-2 font-mono text-white">
        Hello TailwindCSS
      </div>
      <div className="bg-purple-200">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">Ready to dive in?</span>
            <span className="block text-indigo-600">
              Start your free trial today.
            </span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <a
                href="#"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Get started
              </a>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <a
                href="#"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
              >
                Learn more
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* testing Tailwind classes */}

      <Columns vCentered breakpoint="mobile" className="oneandhalf-bs">
        <Columns.Column size={3}>
          <Avatar.Editable />
        </Columns.Column>
        <Columns.Column size={8}>
          <Heading size="medium">
            {firstName} {lastName}
          </Heading>
          <Element className="location-tag">
            <Icon icon="mapPin" className="icon-align" />
            <Content size="medium" renderAs="p">
              {REDI_LOCATION_NAMES[rediLocation]}
            </Content>
          </Element>
        </Columns.Column>
      </Columns>
      <Element>
        <OnboardingSteps
          currentStep={currentStep}
          profile={conProfile}
          isMentor={isMentor}
          isCorporateMentor={isCorporateMentor}
        />
      </Element>
      <Element className="block-separator">
        <EditableAbout />
      </Element>

      <Element className="block-separator">
        <EditableMentoringTopics />
      </Element>
      {isMentor && (
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

      {isMentee && (
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

      {/* When ReDI course is re-implemented, remove isMentor condition from here & EditableOccupation component above */}
      {isMentor && (
        <Element className="block-separator">
          <Columns>
            <Columns.Column size={6}>
              <EditableOccupation />
            </Columns.Column>
          </Columns>
        </Element>
      )}

      {isDraftingProfile && (
        <Element className="block-separator" textAlignment="right">
          <Button
            onClick={submitProfileForReview}
            disabled={!isReadyToSubmit}
            style={!isReadyToSubmit ? { pointerEvents: 'none' } : null}
          >
            Send profile to review
          </Button>
        </Element>
      )}
    </LoggedIn>
  )
}

export default Me

// We controll the stepper by passing the current step index (zero-based) as the activeStep prop
const defineCurrentStep = (
  profileStatus: ConnectProfileStatus,
  isProfileComplete: boolean
) => {
  switch (profileStatus) {
    case ConnectProfileStatus.DraftingProfile:
      return isProfileComplete ? 1 : 0
    case ConnectProfileStatus.SubmittedForReview:
      return 2
    case ConnectProfileStatus.Approved:
      return 3
    default:
      return 0
  }
}
