import { Step, StepLabel, Stepper, Typography } from '@mui/material'
import StepConnector, {
  stepConnectorClasses,
} from '@mui/material/StepConnector'
import { styled } from '@mui/material/styles'
import classnames from 'clsx'
import { Content, Notification } from 'react-bulma-components'
import { CurrentStepType } from '../OnboardingSteps'
import './HorizontalStepper.scss'

const CustomStepConnector = styled(StepConnector)(() => ({
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

type Step = {
  name: string
  message: {
    [key: string]: JSX.Element
  }
}

export type CustomStepIconFunction = (props: {
  active: boolean
  completed: boolean
  currentStep: number
}) => JSX.Element

interface HorizontalStepperProps {
  currentStep: CurrentStepType
  isMentor: boolean
  isCorporateMentor: boolean
  isCyberspaceMentee: boolean
  customStepIcon: CustomStepIconFunction
  steps: Step[]
}

const HorizontalStepper = ({
  currentStep,
  isMentor,
  isCorporateMentor,
  isCyberspaceMentee,
  customStepIcon,
  steps,
}: HorizontalStepperProps) => {
  return (
    <>
      <Stepper
        activeStep={currentStep}
        alternativeLabel
        connector={<CustomStepConnector />}
      >
        {steps.map((step, index) => (
          <Step key={step.name} className="horizontal--step">
            <StepLabel
              StepIconComponent={customStepIcon}
              sx={{
                alignItems: 'flex-start',
              }}
              className="horizontal--label"
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

      <Notification
        className={classnames('horizontal--message', {
          'bubble-first': currentStep === 0,
          'bubble-second': currentStep === 1,
          'bubble-third': currentStep === 2,
          'bubble-fourth': currentStep === 3,
        })}
      >
        {isMentor ? (
          <>
            {isCorporateMentor && steps[currentStep].message.corporateMentor ? (
              <Content size="small" renderAs="p">
                {steps[currentStep].message.corporateMentor}
              </Content>
            ) : (
              <Content size="small" renderAs="p">
                {steps[currentStep].message.mentor}
              </Content>
            )}
          </>
        ) : (
          <>
            {isCyberspaceMentee ? (
              <Content size="small" renderAs="p">
                {steps[currentStep].message.menteeCyberspace}
              </Content>
            ) : (
              <Content size="small" renderAs="p">
                {steps[currentStep].message.mentee}
              </Content>
            )}
          </>
        )}
      </Notification>
    </>
  )
}

export default HorizontalStepper
