import React from 'react'
import classnames from 'classnames'
import { Block, Columns, Box, Element } from 'react-bulma-components'
import { ReactComponent as ChecklistImage } from './checklist-item.svg'
import { ReactComponent as ChecklistActiveImage } from './checklist-item-active.svg'
import { ReactComponent as CheckmarkImage } from './checkmark.svg'
import { ReactComponent as CheckmarkBorderOnlyImage } from './checkmark-border-only.svg'

import { LoggedIn } from '../../../components/templates'

import './Me.scss'
import { Heading } from '../../../../../../libs/shared-atomic-design-components/src'
import { EditableOverview } from '../../../components/organisms/EditableOverview'

const steps = [
  { number: 1, label: 'Complete your profile' },
  { number: 2, label: 'Send profile to ReDI' },
  { number: 3, label: 'Profile approval' },
  { number: 4, label: 'Interview match' },
]

function Me() {
  const currentStep = 3

  return (
    <LoggedIn>
      <Columns breakpoint="mobile">
        <Columns.Column size="three-fifths">
          <EditableOverview />
        </Columns.Column>
        <Columns.Column size="two-fifths">
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
                <Element textSize="5">Complete your profile</Element>
                {step.number < currentStep ? (
                  <CheckmarkImage className="checkmark-image" />
                ) : (
                  <CheckmarkBorderOnlyImage className="checkmark-image" />
                )}
              </div>
            ))}
          </div>
        </Columns.Column>
      </Columns>
    </LoggedIn>
  )
}

export default Me
