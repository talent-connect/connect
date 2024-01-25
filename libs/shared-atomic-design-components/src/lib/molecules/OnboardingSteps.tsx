import { Box, Paper, Step, StepLabel, Stepper } from '@mui/material'
import { Caption } from '@talent-connect/shared-atomic-design-components'
import { Notification } from 'react-bulma-components'
// import './OnboardingSteps.scss'

const OnboardingSteps = ({ steps, profile }) => {
  return (
    <Box sx={{ width: '100%' }}>
      <Paper elevation={1}>
        <Caption>Hi, {profile?.firstName}! Let's complete these steps:</Caption>
        <Stepper activeStep={1} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Notification className="account-not-active double-bs">
          <p>
            <b>Go ahead and fill out your profile below.</b> Make sure you
            complete all the required fields (everything but the optional ones).
            This helps potential mentees know you better and find the perfect
            match.
          </p>
        </Notification>
      </Paper>
    </Box>
  )
}

export default OnboardingSteps
