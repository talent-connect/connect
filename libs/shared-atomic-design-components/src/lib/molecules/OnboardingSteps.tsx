import { Box, Step, StepLabel, Stepper, Typography } from '@mui/material'
import StepConnector, {
  stepConnectorClasses,
} from '@mui/material/StepConnector'
import { StepIconProps } from '@mui/material/StepIcon'
import { styled } from '@mui/material/styles'
import { ConnectProfileStatus } from '@talent-connect/data-access'
import { Caption, Icon } from '@talent-connect/shared-atomic-design-components'
import classnames from 'clsx'
import { useState } from 'react'
import { Content, Notification } from 'react-bulma-components'
import './OnboardingSteps.scss'
import { STEPS } from './OnboardingStepsConstant'

import { ReactComponent as StepDisabledImage } from '../../assets/images/step-disabled.svg'
import { ReactComponent as StepDoneImage } from '../../assets/images/step-done.svg'
import { ReactComponent as StepProgressImage } from '../../assets/images/step-progress.svg'

const QontoConnector = styled(StepConnector)(() => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 15,
    left: 'calc(-100% + 0px)',
    right: 'calc(100% - 10px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#84c5d2',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#84c5d2',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: '#dadada',
    borderTopWidth: 4,
  },
}))

const CustomStepIcon = (props: StepIconProps) => {
  const { active, completed } = props

  return (
    <>
      {active && <StepProgressImage />}
      {completed && !active && <StepDoneImage />}
      {!active && !completed && <StepDisabledImage />}
    </>
  )
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
        <div className="stepper-card--header-wrapper">
          <div className="stepper-card--header">
            <Caption>
              Hi, {profile.firstName}! Let's complete these steps:
            </Caption>
          </div>

          {isApprovedProfile && (
            <div className="icon__button-small" onClick={hideStepper}>
              <Icon icon="cancel" size="small" />
            </div>
          )}
        </div>

        <div className="stepper-card--steps">
          <Stepper
            activeStep={currentStep}
            alternativeLabel
            connector={<QontoConnector />}
          >
            {STEPS.map((step, index) => (
              <Step
                key={step.name}
                sx={{
                  '&:not(:first-child)': {
                    marginLeft: 3.5,
                  },
                  '& .MuiStepLabel-iconContainer.MuiStepLabel-alternativeLabel':
                    { zIndex: 1 },
                }}
              >
                <StepLabel
                  StepIconComponent={CustomStepIcon}
                  sx={{
                    alignItems: 'flex-start',
                    '& .MuiStepLabel-label': {
                      textAlign: 'left',
                      fontFamily: 'Avenir LT Std',
                    },
                    '& .MuiStepLabel-label.Mui-active': {
                      fontWeight: 700,
                    },
                    '& .MuiStepLabel-label.Mui-completed': {
                      fontWeight: 700,
                    },
                  }}
                >
                  <Typography
                    sx={{
                      color: '#a0a0a0',
                      fontSize: 12,
                      fontFamily: 'Avenir LT Std',
                    }}
                  >
                    {index === 3 ? 'Done!' : `Step ${index + 1}`}
                  </Typography>
                  {step.name}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </div>

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
