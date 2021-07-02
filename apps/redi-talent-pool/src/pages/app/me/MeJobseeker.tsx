import { Tooltip } from '@material-ui/core'
import { Button, Icon } from '@talent-connect/shared-atomic-design-components'
import {
  TpJobseekerProfile,
  TpJobseekerProfileState,
} from '@talent-connect/shared-types'
import classnames from 'clsx'
import React, { useCallback, useRef } from 'react'
import { Columns, Element, Notification, Content } from 'react-bulma-components'
import { Subject } from 'rxjs'
import { EditableEducation } from '../../../components/organisms/jobseeker-profile-editables/EditableEducation'
import { EditableImportantDetails } from '../../../components/organisms/jobseeker-profile-editables/EditableImportantDetails'
import { EditableJobPreferences } from '../../../components/organisms/jobseeker-profile-editables/EditableJobPreferences'
import { EditableLanguages } from '../../../components/organisms/jobseeker-profile-editables/EditableLanguages'
import { EditableLinks } from '../../../components/organisms/jobseeker-profile-editables/EditableLinks'
import { EditableNamePhotoLocation } from '../../../components/organisms/jobseeker-profile-editables/EditableNamePhotoLocation'
import { EditableOverview } from '../../../components/organisms/jobseeker-profile-editables/EditableOverview'
import { EditableProfessionalExperience } from '../../../components/organisms/jobseeker-profile-editables/EditableProfessionalExperience'
import { EditableSummary } from '../../../components/organisms/jobseeker-profile-editables/EditableSummary'
import { LoggedIn } from '../../../components/templates'
import { useTpjobseekerprofileUpdateMutation } from '../../../react-query/use-tpjobseekerprofile-mutation'
import { useTpJobseekerProfileQuery } from '../../../react-query/use-tpjobseekerprofile-query'
import { ReactComponent as ChecklistActiveImage } from './checklist-item-active.svg'
import { ReactComponent as ChecklistImage } from './checklist-item.svg'
import { ReactComponent as CheckmarkBorderOnlyImage } from './checkmark-border-only.svg'
import { ReactComponent as CheckmarkImage } from './checkmark.svg'
import './MeJobseeker.scss'
import { ReactComponent as StepPendingImage } from './pending.svg'

export function MeJobseeker() {
  const { data: profile } = useTpJobseekerProfileQuery()
  const currentStep = determineCurrentStep(profile)

  const openJobPreferencesModalSignalRef = useRef(new Subject<void>())

  return (
    <LoggedIn>
      {profile?.state === 'profile-approved-awaiting-job-preferences' ? (
        <Notification className="account-not-active double-bs">
          <Icon
            className="account-not-active__icon"
            icon="search"
            size="large"
            space="right"
          />
          <Content size="small">
            <strong>Great, your profile is approved!</strong> Before we can
            match you for interviews with companies, we want to learn about your
            preferences. Therefore, find the job posting list in the{' '}
            <a onClick={() => openJobPreferencesModalSignalRef.current.next()}>
              job preferences section{' '}
            </a>
            and fill out your preferred companies/jobs.
          </Content>
        </Notification>
      ) : null}
      <Columns className="is-6 is-variable">
        <Columns.Column mobile={{ size: 12 }} tablet={{ size: 'three-fifths' }}>
          <div className="is-hidden-tablet">
            <div style={{ textAlign: 'right', marginBottom: '1.5rem' }}>
              <CallToActionButton profile={profile} />
            </div>
            <OnboardingSteps />
          </div>
          <EditableNamePhotoLocation />
          <EditableOverview />
          <EditableSummary />
          <EditableProfessionalExperience />
          <EditableEducation />
        </Columns.Column>
        <Columns.Column mobile={{ size: 12 }} tablet={{ size: 'two-fifths' }}>
          <div className="is-hidden-mobile">
            <div style={{ textAlign: 'right', marginBottom: '1.5rem' }}>
              <CallToActionButton profile={profile} />
            </div>
            <OnboardingSteps />
          </div>
          <EditableImportantDetails />
          <EditableLanguages />
          <EditableLinks />
          {currentStep[0] >= 4 ? (
            <EditableJobPreferences
              triggerModalSignal={openJobPreferencesModalSignalRef.current}
            />
          ) : null}
        </Columns.Column>
      </Columns>
    </LoggedIn>
  )
}

const CallToActionButton = ({
  profile,
}: {
  profile: Partial<TpJobseekerProfile>
}) => {
  return (
    <>
      {profile &&
      profile.state &&
      [
        TpJobseekerProfileState['drafting-profile'],
        TpJobseekerProfileState['submitted-for-review'],
      ].includes(profile.state as any) ? (
        <SendProfileForReviewButton />
      ) : null}
      {profile &&
      profile.state &&
      [
        TpJobseekerProfileState['profile-approved-awaiting-job-preferences'],
      ].includes(profile.state as any) ? (
        <SendJobPreferencesForReviewButton />
      ) : null}
    </>
  )
}

const steps = [
  { number: 1, label: 'Complete your profile' },
  { number: 2, label: 'Send profile to ReDI' },
  { number: 3, label: 'Profile approval' },
  { number: 4, label: 'Input your job preferences' },
  { number: 5, label: 'Share your preferences with ReDI' },
  { number: 6, label: 'Interview match' },
]

function determineCurrentStep(
  profile: Partial<TpJobseekerProfile>
): [currentStep: number, stepStatus: 'todo' | 'pending' | 'complete'] {
  if (profile.state === 'drafting-profile') {
    return isProfileComplete(profile) ? [2, 'todo'] : [1, 'todo']
  }
  if (profile.state === 'submitted-for-review') {
    return [3, 'pending']
  }
  if (profile.state === 'profile-approved-awaiting-job-preferences') {
    return areJobPreferencesInputted(profile) ? [5, 'todo'] : [4, 'todo']
  }
  if (
    profile.state ===
    'job-preferences-shared-with-redi-awaiting-interview-match'
  ) {
    return [6, 'pending']
  }
  if (profile.state === 'matched-for-interview') {
    return [6, 'complete']
  }
}

export function OnboardingSteps() {
  const { data: profile } = useTpJobseekerProfileQuery()

  const currentStep = determineCurrentStep(profile)

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
      {steps.map((step, index) => (
        <div
          key={index}
          className={classnames('onboarding-steps--item', {
            'current-step': step.number === currentStep[0],
            'completed-step': step.number < currentStep[0],
          })}
        >
          {step.number < currentStep[0] ? (
            <ChecklistActiveImage className="checklist-image" />
          ) : (
            <ChecklistImage className="checklist-image" />
          )}
          <Element textSize="5">{step.label}</Element>
          {currentStep[0] > step.number ? (
            <CheckmarkImage className="checkmark-image" />
          ) : null}
          {currentStep[0] < step.number ? (
            <CheckmarkBorderOnlyImage className="checkmark-image" />
          ) : null}
          {currentStep[0] === step.number && currentStep[1] === 'todo' ? (
            <CheckmarkBorderOnlyImage className="checkmark-image" />
          ) : null}
          {currentStep[0] === step.number && currentStep[1] === 'pending' ? (
            <StepPendingImage className="checkmark-image" />
          ) : null}
          {currentStep[0] === step.number && currentStep[1] === 'complete' ? (
            <CheckmarkImage className="checkmark-image" />
          ) : null}
        </div>
      ))}
    </div>
  )
}

function isProfileComplete(profile: Partial<TpJobseekerProfile>): boolean {
  const mostSectionsComplete = [
    EditableNamePhotoLocation.isSectionFilled,
    EditableOverview.isSectionFilled,
    EditableSummary.isSectionFilled,
    EditableImportantDetails.isSectionFilled,
    EditableLanguages.isSectionFilled,
  ]
    .map((checkerFn) => checkerFn(profile))
    .every((p) => p)
  const experienceOrEducationSectionComplete =
    EditableProfessionalExperience.isSectionFilled(profile) ||
    EditableEducation.isSectionFilled(profile)

  return mostSectionsComplete && experienceOrEducationSectionComplete
}

function areJobPreferencesInputted(
  profile: Partial<TpJobseekerProfile>
): boolean {
  return EditableJobPreferences.isSectionFilled(profile)
}

function SendProfileForReviewButton() {
  const { data: profile } = useTpJobseekerProfileQuery()
  const mutation = useTpjobseekerprofileUpdateMutation()

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

function SendJobPreferencesForReviewButton() {
  const { data: profile } = useTpJobseekerProfileQuery()
  const mutation = useTpjobseekerprofileUpdateMutation()

  const enabled =
    profile?.state === 'profile-approved-awaiting-job-preferences' &&
    EditableJobPreferences.isSectionFilled(profile)

  const onClick = useCallback(() => {
    if (!window.confirm('Are you ready to share your job preferences?')) return

    mutation.mutate({
      ...profile,
      state: 'job-preferences-shared-with-redi-awaiting-interview-match',
    })
  }, [mutation, profile])

  if (enabled) {
    return <Button onClick={onClick}>Share your job preferences</Button>
  } else {
    return (
      <Tooltip title="You need to input your job preferences before you can share them with us and get matched for an interview">
        <span>
          <Button disabled style={{ pointerEvents: 'none' }}>
            Share your job preferences
          </Button>
        </span>
      </Tooltip>
    )
  }
}
