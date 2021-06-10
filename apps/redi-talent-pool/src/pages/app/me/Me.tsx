import { Button } from '@talent-connect/shared-atomic-design-components'
import classnames from 'classnames'
import React from 'react'
import { Columns, Element } from 'react-bulma-components'
import { EditableEducation } from '../../../components/organisms/EditableEducation'
import { EditableImportantDetails } from '../../../components/organisms/EditableImportantDetails'
import { EditableLanguages } from '../../../components/organisms/EditableLanguages'
import { EditableLinks } from '../../../components/organisms/EditableLinks'
import { EditableOverview } from '../../../components/organisms/EditableOverview'
import { EditableProfessionalExperience } from '../../../components/organisms/EditableProfessionalExperience'
import { EditableSummary } from '../../../components/organisms/EditableSummary'
import { LoggedIn } from '../../../components/templates'
import { useTpjobseekerprofileQuery } from '../../../react-query/use-tpjobseekerprofile-query'
import { ReactComponent as ChecklistActiveImage } from './checklist-item-active.svg'
import { ReactComponent as ChecklistImage } from './checklist-item.svg'
import { ReactComponent as CheckmarkBorderOnlyImage } from './checkmark-border-only.svg'
import { ReactComponent as CheckmarkImage } from './checkmark.svg'
import './Me.scss'

const steps = [
  { number: 1, label: 'Complete your profile' },
  { number: 2, label: 'Send profile to ReDI' },
  { number: 3, label: 'Profile approval' },
  { number: 4, label: 'Interview match' },
]

function Me() {
  const { data: profile } = useTpjobseekerprofileQuery()

  const currentStep = 3

  return (
    <LoggedIn>
      <Columns breakpoint="mobile" className="is-6 is-variable">
        <Columns.Column size="three-fifths">
          <EditableOverview />
          <EditableSummary />
          <EditableProfessionalExperience />
          <EditableEducation />
        </Columns.Column>
        <Columns.Column size="two-fifths">
          <div style={{ textAlign: 'right', marginBottom: '1.5rem' }}>
            <Button disabled>Send profile to review</Button>
          </div>
          <OnboardingSteps />
          <EditableImportantDetails />
          <EditableLanguages />
          <EditableLinks />
        </Columns.Column>
      </Columns>
    </LoggedIn>
  )
}

function OnboardingSteps() {
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

export default Me
