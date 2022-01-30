import { FC, useCallback, useRef } from 'react'
import classnames from 'clsx'
// import { Subject } from 'rxjs'
import { Tooltip } from '@material-ui/core'
import { Columns, Element, Notification, Content } from 'react-bulma-components'
import {
  Button,
  Icon,
  Checkbox,
} from '@talent-connect/shared-atomic-design-components'
import {
  TpJobSeekerProfile,
  TpJobSeekerProfileState,
} from '@talent-connect/shared-types'
import { EditableEducation } from '../../../components/organisms/jobseeker-profile-editables/EditableEducation'
import { EditableImportantDetails } from '../../../components/organisms/jobseeker-profile-editables/EditableImportantDetails'
// import { EditableJobPreferences } from '../../../components/organisms/jobseeker-profile-editables/EditableJobPreferences'
import { EditableLanguages } from '../../../components/organisms/jobseeker-profile-editables/EditableLanguages'
import { EditableLinks } from '../../../components/organisms/jobseeker-profile-editables/EditableLinks'
import { EditableNamePhotoLocation } from '../../../components/organisms/jobseeker-profile-editables/EditableNamePhotoLocation'
import { EditableOverview } from '../../../components/organisms/jobseeker-profile-editables/EditableOverview'
import { EditableProfessionalExperience } from '../../../components/organisms/jobseeker-profile-editables/EditableProfessionalExperience'
import { EditableSummary } from '../../../components/organisms/jobseeker-profile-editables/EditableSummary'
import { LoggedIn } from '../../../components/templates'
import { useTpJobSeekerProfileUpdateMutation } from '../../../react-query/use-tpjobseekerprofile-mutation'
import { useTpJobSeekerProfileQuery } from '../../../react-query/use-tpjobseekerprofile-query'
import { ReactComponent as ChecklistActiveImage } from './checklist-item-active.svg'
import { ReactComponent as ChecklistImage } from './checklist-item.svg'
import { ReactComponent as CheckmarkBorderOnlyImage } from './checkmark-border-only.svg'
import { ReactComponent as CheckmarkImage } from './checkmark.svg'
import './MeJobSeeker.scss'
import { ReactComponent as StepPendingImage } from './pending.svg'

export const MeJobSeeker: FC = () => {
  const { data: profile } = useTpJobSeekerProfileQuery()
  const mutation = useTpJobSeekerProfileUpdateMutation()

  // const currentStep = determineCurrentStep(profile)

  // const openJobPreferencesModalSignalRef = useRef(new Subject<void>())

  // TODO: This function is added for Job Fair 2022 only. Please remove after 11.02.2022
  const handleJobFairToggleChange = () =>
    mutation.mutate({
      ...profile,
      isJobFair2022Participant: !profile.isJobFair2022Participant,
    })

  return (
    <LoggedIn>
      {profile?.state === 'profile-approved' && (
        <Notification className="account-not-active double-bs">
          <Icon
            className="account-not-active__icon"
            icon="search"
            size="large"
            space="right"
          />
          <Content size="small">
            <strong>Great, your profile is approved!</strong> You can now{' '}
            <a href="/app/browse">browse open job postings</a>!
          </Content>
        </Notification>
      )}
      <Columns className="is-6 is-variable">
        <Columns.Column mobile={{ size: 12 }} tablet={{ size: 'three-fifths' }}>
          <div className="is-hidden-tablet">
            <div style={{ textAlign: 'right', marginBottom: '1.5rem' }}>
              <CallToActionButton profile={profile} />
            </div>
            <OnboardingSteps />
          </div>
          <EditableNamePhotoLocation profile={profile} />
          {/* This Checkbox is added only for JobFair 2022. Please remove after 11.02.2022 */}
          <Checkbox.Form
            name="isJobFair2022Participant"
            checked={profile.isJobFair2022Participant}
            handleChange={handleJobFairToggleChange}
          >
            I will participate in the ReDI Job Fair on 11 February 2022
          </Checkbox.Form>
          <EditableOverview profile={profile} />
          <EditableSummary profile={profile} />
          <EditableProfessionalExperience profile={profile} />
          <EditableEducation profile={profile} />
        </Columns.Column>
        <Columns.Column mobile={{ size: 12 }} tablet={{ size: 'two-fifths' }}>
          <div className="is-hidden-mobile">
            <div style={{ textAlign: 'right', marginBottom: '1.5rem' }}>
              <CallToActionButton profile={profile} />
            </div>
            <OnboardingSteps />
          </div>
          {/* <EditableVisibility /> */}
          <EditableImportantDetails profile={profile} />
          <EditableLanguages profile={profile} />
          <EditableLinks profile={profile} />
          {/* {currentStep[0] >= 4 ? (
            <EditableJobPreferences
              profile={profile}
              triggerModalSignal={openJobPreferencesModalSignalRef.current}
            />
          ) : null} */}
        </Columns.Column>
      </Columns>
    </LoggedIn>
  )
}

const CallToActionButton: FC<{ profile: Partial<TpJobSeekerProfile> }> = ({
  profile,
}) => {
  const showSendProfileForReviewButton =
    profile.state === TpJobSeekerProfileState['drafting-profile'] ||
    profile.state === TpJobSeekerProfileState['submitted-for-review'];
  
  return (
    <>
      {showSendProfileForReviewButton && // TODO: review
          <SendProfileForReviewButton />}
      {/* {profile &&
      profile.state &&
      [
        TpJobSeekerProfileState['profile-approved-awaiting-job-preferences'],
      ].includes(profile.state as any) ? (
        <SendJobPreferencesForReviewButton />
      ) : null} */}
    </>
  )
}

const steps = [
  { number: 1, label: 'Complete your profile' },
  { number: 2, label: 'Send profile to ReDI' },
  { number: 3, label: 'Profile approval' },
  // { number: 4, label: 'Input your job preferences' },
  // { number: 5, label: 'Share your preferences with ReDI' },
  // { number: 6, label: 'Interview match' },
]

function determineCurrentStep (profile: Partial<TpJobSeekerProfile>):
  [currentStep: number, stepStatus: 'todo' | 'pending' | 'complete']
{
  if (profile.state === 'drafting-profile')
    return isProfileComplete(profile) ? [2, 'todo'] : [1, 'todo']
  if (profile.state === 'submitted-for-review')
    return [3, 'pending']
  if (profile.state === 'profile-approved')
    return [3, 'complete']
  // if (
  //   profile.state ===
  //   'job-preferences-shared-with-redi-awaiting-interview-match'
  // ) {
  //   return [6, 'pending']
  // }
  // if (profile.state === 'matched-for-interview') {
  //   return [6, 'complete']
  // }
  if (profile.state === 'job-preferences-shared-with-redi-awaiting-interview-match')
    return [3, 'complete']
  if (profile.state === 'matched-for-interview')
    return [3, 'complete']
}

export const OnboardingSteps: FC = () => {
  const { data: profile } = useTpJobSeekerProfileQuery()

  const [currentStep, stepStatus] = determineCurrentStep(profile)

  return (
    <div className="onboarding-steps">
      <div className="onboarding-steps--header">
        <Element
          renderAs="h4"
          textAlignment="centered"
          textTransform="uppercase"
          textSize={6}
          responsive={{ mobile: { textSize: { value: 7 } } }}
        >
          Complete the steps below!
        </Element>
      </div>
      {steps.map(({ number, label }, i) => (
        <div
          key={i}
          className={classnames('onboarding-steps--item', {
            'current-step': number === currentStep,
            'completed-step': number < currentStep,
          })}
        >
          {number < currentStep
            ? (<ChecklistActiveImage className="checklist-image" />)
            : (<ChecklistImage className="checklist-image" />)}
          <Element textSize="5">{label}</Element>
          {currentStep > number && (
            <CheckmarkImage className="checkmark-image" />)}
          {currentStep < number && ( 
            <CheckmarkBorderOnlyImage className="checkmark-image" />)}
          {currentStep === number && stepStatus === 'todo' && ( // TODO: apply switch?
            <CheckmarkBorderOnlyImage className="checkmark-image" />)}
          {currentStep === number && stepStatus === 'pending' && (
            <StepPendingImage className="checkmark-image" />)}
          {currentStep === number && stepStatus === 'complete' && (
            <CheckmarkImage className="checkmark-image" />)}
        </div>
      ))}
    </div>
  )
}

function isProfileComplete(profile: Partial<TpJobSeekerProfile>): boolean {
  const mostSectionsComplete = [
    EditableNamePhotoLocation.isSectionFilled,
    EditableOverview.isSectionFilled,
    EditableSummary.isSectionFilled,
    EditableImportantDetails.isSectionFilled,
    EditableLanguages.isSectionFilled,
  ]
    .every((checkerFn) => checkerFn(profile))
  const experienceOrEducationSectionComplete =
    EditableProfessionalExperience.isSectionFilled(profile) ||
    EditableEducation.isSectionFilled(profile)

  return mostSectionsComplete && experienceOrEducationSectionComplete
}

// function areJobPreferencesInputted (profile: Partial<TpJobSeekerProfile>): boolean {
//   return EditableJobPreferences.isSectionFilled(profile)
// }

function SendProfileForReviewButton() {
  const { data: profile } = useTpJobSeekerProfileQuery()
  const mutation = useTpJobSeekerProfileUpdateMutation()

  const enabled =
    profile?.state === 'drafting-profile' && isProfileComplete(profile)

  const onClick = useCallback(() => {
    if (!window.confirm('Would you like to submit your profile for review?'))
      return

    mutation.mutate({ ...profile, state: 'submitted-for-review' })
  }, [mutation, profile])

  if (enabled) {
    return <Button onClick={onClick}>Send profile to review</Button>
  } else {
    return (
      <Tooltip title="You need to complete your profile before you can send it for review">
        <span>
          <Button disabled style={{ pointerEvents: 'none' }}>
            Send profile to review
          </Button>
        </span>
      </Tooltip>
    )
  }
}

// const SendJobPreferencesForReviewButton: FC = () => { // TODO: Remove?
//   const { data: profile } = useTpJobSeekerProfileQuery()
//   const mutation = useTpjobseekerprofileUpdateMutation()

//   const enabled =
//     profile?.state === 'profile-approved' &&
//     EditableJobPreferences.isSectionFilled(profile)

//   const onClick = useCallback(() => {
//     if (!window.confirm('Are you ready to share your job preferences?')) return

//     mutation.mutate({
//       ...profile,
//     })
//   }, [mutation, profile])

//   if (enabled) {
//     return <Button onClick={onClick}>Share your job preferences</Button>
//   } else {
//     return (
//       <Tooltip title="You need to input your job preferences before you can share them with us and get matched for an interview">
//         <span>
//           <Button disabled style={{ pointerEvents: 'none' }}>
//             Share your job preferences
//           </Button>
//         </span>
//       </Tooltip>
//     )
//   }
// }
