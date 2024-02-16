import { Box, Step, StepLabel, Stepper } from '@mui/material'
import { ConnectProfileStatus } from '@talent-connect/data-access'
import { Caption, Icon } from '@talent-connect/shared-atomic-design-components'
import classnames from 'clsx'
import { useState } from 'react'
import { Content, Notification } from 'react-bulma-components'
import './OnboardingSteps.scss'
import { STEPS } from './OnboardingStepsConstant'

const OnboardingSteps = ({
  currentStep,
  profile,
  isMentor,
  isCorporateMentor,
}) => {
  const [isStepperHidden, setIsStepperHidden] = useState(
    localStorage.getItem('isStepperHidden') || false
  )
  const isApprovedProfile =
    profile.profileStatus === ConnectProfileStatus.Approved

  const hideStepper = () => {
    setIsStepperHidden(true)
    localStorage.setItem('isStepperHidden', 'true')
    console.log('Stepper is hidden for good')
  }

  return (
    !isStepperHidden && (
      <div className="stepper-card">
        <div className="stepper-card--header">
          <Caption>
            Hi, {profile.firstName}! Let's complete these steps:
          </Caption>
          {isApprovedProfile && (
            <div className="icon__button-small" onClick={hideStepper}>
              <Icon icon="cancel" size="small" />
            </div>
          )}
        </div>

        <Box sx={{ width: '100%' }} className="stepper-card--steps">
          <Stepper activeStep={currentStep} alternativeLabel>
            {STEPS.map((step) => (
              <Step key={step.name}>
                <StepLabel>{step.name}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        <Notification
          className={classnames('stepper-card--message', {
            'bubble-first': currentStep === 0,
            'bubble-second': currentStep === 1,
            'bubble-third': currentStep === 2,
            'bubble-fourth': currentStep === 3,
          })}
        >
          {isMentor ? (
            <>
              {isCorporateMentor &&
              STEPS[currentStep].message.corporateMentor ? (
                <Content size="small">
                  {STEPS[currentStep].message.corporateMentor}
                </Content>
              ) : (
                <Content size="small">
                  {STEPS[currentStep].message.mentor}
                </Content>
              )}
            </>
          ) : (
            <Content size="small">{STEPS[currentStep].message.mentee}</Content>
          )}
        </Notification>
      </div>
    )
  )
}

export default OnboardingSteps
