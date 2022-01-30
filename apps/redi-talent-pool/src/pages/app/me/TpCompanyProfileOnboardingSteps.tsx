import { FC } from 'react'
import classnames from 'clsx'
import { Element } from 'react-bulma-components'

import { ReactComponent as ChecklistActiveImage } from './checklist-item-active.svg'
import { ReactComponent as ChecklistImage } from './checklist-item.svg'
import { ReactComponent as CheckmarkBorderOnlyImage } from './checkmark-border-only.svg'
import { ReactComponent as CheckmarkImage } from './checkmark.svg'
import { ReactComponent as StepPendingImage } from './pending.svg'

import { TpCompanyProfile } from '@talent-connect/shared-types'

function determineCurrentStep(
  { state }: Partial<TpCompanyProfile>,
  isProfileComplete: boolean,
  hasJobListing: boolean
  ): [currentStep: number, stepStatus: 'todo' | 'pending' | 'complete'] {
    switch (state) {
      case 'drafting-profile':
        if (!isProfileComplete) return [1, 'todo']
        if (!hasJobListing) return [2, 'todo']
        return [3, 'todo']
        case 'submitted-for-review': return [4, 'pending']
        case 'profile-approved': return [4, 'complete']
      }
    }
    
const steps: { number: number; label: string; }[] = [
  { number: 1, label: 'Complete your profile' },
  { number: 2, label: 'Post a job' },
  { number: 3, label: 'Send profile to ReDI' },
  { number: 4, label: 'Profile approval' },
]
    
interface Props {
  profile: Partial<TpCompanyProfile>,
  isProfileComplete: boolean,
  hasJobListing: boolean
}
  
export const OnboardingSteps: FC<Props> = ({ profile, isProfileComplete, hasJobListing }) => {
  const [currentStep, stepStatus] = determineCurrentStep(
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
      {steps.map(({ number, label }, index) => (
        <div
          key={index}
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
            <CheckmarkImage className="checkmark-image" />
          )}
          {currentStep < number && (
            <CheckmarkBorderOnlyImage className="checkmark-image" />
          )}
          {currentStep === number && stepStatus === 'todo' && (
            <CheckmarkBorderOnlyImage className="checkmark-image" />
          )}
          {currentStep === number && stepStatus === 'pending' && (
            <StepPendingImage className="checkmark-image" />
          )}
          {currentStep === number && stepStatus === 'complete' && (
            <CheckmarkImage className="checkmark-image" />
          )}
        </div>
      ))}
    </div>
  )
}
