import { useMediaQuery, useTheme } from '@mui/material'
import { ConnectProfileStatus } from '@talent-connect/data-access'
import { Icon } from '@talent-connect/shared-atomic-design-components'
import { useState } from 'react'
import { Element } from 'react-bulma-components'
import './OnboardingSteps.scss'
import { STEPS } from './OnboardingStepsConstant'
import HorizontalStepper from './stepper-card/HorizontalStepper'
import VerticalStepper from './stepper-card/VerticalStepper'

import { ReactComponent as StepDisabledImage } from '../../../../../../libs/shared-atomic-design-components/src/assets/images/step-disabled.svg'
import { ReactComponent as StepDoneImage } from '../../../../../../libs/shared-atomic-design-components/src/assets/images/step-done.svg'
import { ReactComponent as StepProgressImage } from '../../../../../../libs/shared-atomic-design-components/src/assets/images/step-progress.svg'

const getCustomStepIcon = ({ active, completed, currentStep }) => {
  if (active)
    return currentStep === 3 ? <StepDoneImage /> : <StepProgressImage />

  return completed ? <StepDoneImage /> : <StepDisabledImage />
}

const OnboardingSteps = ({
  currentStep,
  profile,
  isMentor,
  isCorporateMentor,
}) => {
  const [isStepperHidden, setIsStepperHidden] = useState(
    localStorage.getItem('isStepperHidden') || false
  )
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const isApprovedProfile =
    profile.profileStatus === ConnectProfileStatus.Approved

  const hideStepper = () => {
    setIsStepperHidden(true)
    localStorage.setItem('isStepperHidden', 'true')
  }

  const stepperProps = {
    currentStep,
    isMentor,
    isCorporateMentor,
    customStepIcon: ({ active, completed }) =>
      getCustomStepIcon({ active, completed, currentStep }),
    steps: STEPS,
  }

  return (
    !isStepperHidden && (
      <div className="stepper-card">
        <div className="stepper-card--header-wrapper">
          <div className="stepper-card--header">
            <Element
              renderAs="h3"
              textSize={isMobile ? '6' : '5'}
              textWeight="bold"
              textTransform="uppercase"
            >
              Hi, {profile.firstName}! Let's complete these steps:
            </Element>
          </div>

          {isApprovedProfile && (
            <div className="icon__button-small" onClick={hideStepper}>
              <Icon icon="cancel" size="small" />
            </div>
          )}
        </div>

        <div className="stepper-card--steps">
          {isMobile ? (
            <VerticalStepper {...stepperProps} />
          ) : (
            <HorizontalStepper {...stepperProps} />
          )}
        </div>
      </div>
    )
  )
}

export default OnboardingSteps
