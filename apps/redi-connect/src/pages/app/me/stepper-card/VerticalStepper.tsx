import {
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material'
import StepConnector, {
  stepConnectorClasses,
} from '@mui/material/StepConnector'
import { styled } from '@mui/material/styles'
import { Content, Notification } from 'react-bulma-components'
import './VerticalStepper.scss'

const CustomStepConnector = styled(StepConnector)(() => ({
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.lineVertical}`]: {
      borderColor: '#84c5d2',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.lineVertical}`]: {
      borderColor: '#84c5d2',
    },
  },
  [`& .${stepConnectorClasses.lineVertical}`]: {
    borderColor: '#dadada',
    borderLeftWidth: 4,
    marginLeft: 2,
    minHeight: 32,
    marginTop: '-7px',
  },
}))

const VerticalStepper = ({
  currentStep,
  isMentor,
  isCorporateMentor,
  isCyberspaceMentee,
  customStepIcon,
  steps,
}) => {
  return (
    <Stepper
      activeStep={currentStep}
      connector={<CustomStepConnector />}
      orientation="vertical"
    >
      {steps.map((step, index) => (
        <Step key={step.name} className="vertical--step">
          <StepLabel
            StepIconComponent={customStepIcon}
            sx={{
              padding: 0,
            }}
            className="vertical--label"
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
          <StepContent
            sx={{
              borderLeft: '4px solid #84c5d2',
              marginLeft: '14px',
              paddingRight: 0,
              marginTop: '-7px',
              '&.MuiStepContent-last': {
                borderLeft: 'none',
              },
            }}
          >
            <Notification className="vertical--message">
              {isMentor ? (
                <>
                  {isCorporateMentor &&
                  steps[currentStep].message.corporateMentor ? (
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
          </StepContent>
        </Step>
      ))}
    </Stepper>
  )
}

export default VerticalStepper
