import { Tooltip } from '@material-ui/core'
import { Button } from '@talent-connect/shared-atomic-design-components'
import { TpJobseekerProfile } from '@talent-connect/shared-types'
import classnames from 'clsx'
import React, { useCallback } from 'react'
import { Columns, Element } from 'react-bulma-components'
import { useTpJobseekerProfileQuery } from '../../../react-query/use-tpjobseekerprofile-query'
import { ReactComponent as ChecklistActiveImage } from './checklist-item-active.svg'
import { ReactComponent as ChecklistImage } from './checklist-item.svg'
import { ReactComponent as CheckmarkBorderOnlyImage } from './checkmark-border-only.svg'
import { ReactComponent as CheckmarkImage } from './checkmark.svg'
import { ReactComponent as StepPendingImage } from './pending.svg'
import './MeJobseeker.scss'
import { useTpjobseekerprofileUpdateMutation } from '../../../react-query/use-tpjobseekerprofile-mutation'
import { LoggedIn } from '../../../components/templates'
import { EditableNamePhotoLocation } from '../../../components/organisms/jobseeker-profile-editables/EditableNamePhotoLocation'
import { EditableOverview } from '../../../components/organisms/jobseeker-profile-editables/EditableOverview'
import { EditableSummary } from '../../../components/organisms/jobseeker-profile-editables/EditableSummary'
import { EditableProfessionalExperience } from '../../../components/organisms/jobseeker-profile-editables/EditableProfessionalExperience'
import { EditableEducation } from '../../../components/organisms/jobseeker-profile-editables/EditableEducation'
import { EditableImportantDetails } from '../../../components/organisms/jobseeker-profile-editables/EditableImportantDetails'
import { EditableLanguages } from '../../../components/organisms/jobseeker-profile-editables/EditableLanguages'
import { EditableLinks } from '../../../components/organisms/jobseeker-profile-editables/EditableLinks'

export function MeJobseeker() {
  return (
    <LoggedIn>
      <Columns className="is-6 is-variable">
        <Columns.Column mobile={{ size: 12 }} tablet={{ size: 'three-fifths' }}>
          <div className="is-hidden-tablet">
            <div style={{ textAlign: 'right', marginBottom: '1.5rem' }}>
              <SendProfileForReviewButton />
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
              <SendProfileForReviewButton />
            </div>
            <OnboardingSteps />
          </div>
          <EditableImportantDetails />
          <EditableLanguages />
          <EditableLinks />
        </Columns.Column>
      </Columns>
    </LoggedIn>
  )
}

const steps = [
  { number: 1, label: 'Complete your profile' },
  { number: 2, label: 'Send profile to ReDI' },
  { number: 3, label: 'Profile approval' },
  { number: 4, label: 'Interview match' },
]

export function OnboardingSteps() {
  const { data: profile } = useTpJobseekerProfileQuery()

  let currentStep = 1
  if (isProfileComplete(profile)) {
    currentStep = 2
  }

  if (profile.state === 'submitted-for-review') {
    currentStep = 3
  }

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
      {steps.map((step) => (
        <div
          className={classnames('onboarding-steps--item', {
            'current-step': step.number === currentStep,
            'completed-step': step.number < currentStep,
          })}
        >
          {step.number < currentStep ? (
            <ChecklistActiveImage className="checklist-image" />
          ) : (
            <ChecklistImage className="checklist-image" />
          )}
          <Element textSize="5">{step.label}</Element>
          {step.number === 3 &&
          currentStep === 3 &&
          profile.state === 'submitted-for-review' ? (
            <StepPendingImage className="checkmark-image" />
          ) : step.number < currentStep ? (
            <CheckmarkImage className="checkmark-image" />
          ) : (
            <CheckmarkBorderOnlyImage className="checkmark-image" />
          )}
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
    EditableLinks.isSectionFilled,
  ]
    .map((checkerFn) => checkerFn(profile))
    .every((p) => p)
  const experienceOrEducationSectionComplete =
    EditableProfessionalExperience.isSectionFilled(profile) ||
    EditableEducation.isSectionFilled(profile)

  return mostSectionsComplete && experienceOrEducationSectionComplete
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
