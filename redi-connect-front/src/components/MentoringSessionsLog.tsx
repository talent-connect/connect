import React from 'react'
import { RedMentoringSession } from '../types/RedMentoringSession'
import { Stepper, Step, StepLabel } from '@material-ui/core'
import moment from 'moment'

interface Props {
  mentoringSessions: RedMentoringSession[]
}

export const MentoringSessionsLog = ({ mentoringSessions }: Props) => {
  if (!mentoringSessions || mentoringSessions.length === 0) { return <p>No mentoring sessions logged yet.</p> }
  return (
    <>
      <h3>Your mentoring sessions:</h3>
      <Stepper orientation="vertical">
        {mentoringSessions.map((mentoringSession, i) => (
          <Step key={mentoringSession.id} active={true}>
            <StepLabel>
              Session {i + 1} on the{' '}
              {moment(mentoringSession.date).format('Do of MMMM YYYY')} for{' '}
              {mentoringSession.minuteDuration} minutes
            </StepLabel>
            >
          </Step>
        ))}
      </Stepper>
    </>
  )
}
