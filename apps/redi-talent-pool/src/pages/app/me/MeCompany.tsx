import { Button, Tooltip } from '@material-ui/core'
import classnames from 'clsx'
import React from 'react'
import { Columns, Element } from 'react-bulma-components'
import { EditableEducation } from '../../../components/organisms/EditableEducation'
import { EditableImportantDetails } from '../../../components/organisms/EditableImportantDetails'
import { EditableLanguages } from '../../../components/organisms/EditableLanguages'
import { EditableLinks } from '../../../components/organisms/EditableLinks'
import { EditableNamePhotoLocation } from '../../../components/organisms/EditableNamePhotoLocation'
import { EditableOverview } from '../../../components/organisms/EditableOverview'
import { EditableProfessionalExperience } from '../../../components/organisms/EditableProfessionalExperience'
import { EditableSummary } from '../../../components/organisms/EditableSummary'
import { LoggedIn } from '../../../components/templates'
import { useTpCompanyProfileQuery } from '../../../react-query/use-tpcompanyprofile-query'
import { useTpJobseekerProfileQuery } from '../../../react-query/use-tpjobseekerprofile-query'
import { ReactComponent as ChecklistActiveImage } from './checklist-item-active.svg'
import { ReactComponent as ChecklistImage } from './checklist-item.svg'
import { ReactComponent as CheckmarkBorderOnlyImage } from './checkmark-border-only.svg'
import { ReactComponent as CheckmarkImage } from './checkmark.svg'

export function MeCompany() {
  const { data: profile } = useTpCompanyProfileQuery()

  console.log(profile)

  return null

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
  const currentStep = 1

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
          {step.number < currentStep ? (
            <CheckmarkImage className="checkmark-image" />
          ) : (
            <CheckmarkBorderOnlyImage className="checkmark-image" />
          )}
        </div>
      ))}
    </div>
  )
}

function SendProfileForReviewButton() {
  const { data: profile } = useTpJobseekerProfileQuery()

  const disabled = true

  if (disabled) {
    return (
      <Tooltip title="You need to complete your profile before you can send it for review">
        <span>
          <Button disabled style={{ pointerEvents: 'none' }}>
            Send profile to review
          </Button>
        </span>
      </Tooltip>
    )
  } else {
    return <Button>Send profile to review</Button>
  }
}
