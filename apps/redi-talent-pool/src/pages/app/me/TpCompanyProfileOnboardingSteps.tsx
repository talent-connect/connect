import React from 'react'
import classnames from 'clsx'
import { Element } from 'react-bulma-components'

import { ReactComponent as ChecklistActiveImage } from './checklist-item-active.svg'
import { ReactComponent as ChecklistImage } from './checklist-item.svg'
import { ReactComponent as CheckmarkBorderOnlyImage } from './checkmark-border-only.svg'
import { ReactComponent as CheckmarkImage } from './checkmark.svg'
import { ReactComponent as StepPendingImage } from './pending.svg'

import { TpCompanyProfile } from '@talent-connect/shared-types'

const steps = [
  { number: 1, label: 'Complete your profile' },
  { number: 2, label: 'Post a job' },
  { number: 3, label: 'Send profile to ReDI' },
  { number: 4, label: 'Profile approval' },
]

function determineCurrentStep(
  profile: Partial<TpCompanyProfile>,
  isProfileComplete: boolean,
  hasJobListing: boolean
): [currentStep: number, stepStatus: 'todo' | 'pending' | 'complete'] {
  if (profile.state === 'drafting-profile') {
    if (!isProfileComplete) return [1, 'todo']
    if (!hasJobListing) return [2, 'todo']
    return [3, 'todo']
  }
  if (profile.state === 'submitted-for-review') {
    return [4, 'pending']
  }
  if (profile.state === 'profile-approved') {
    return [4, 'complete']
  }
}

export function OnboardingSteps({ profile, isProfileComplete, hasJobListing }) {
  const currentStep = determineCurrentStep(
    profile,
    isProfileComplete,
    hasJobListing
  )

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
