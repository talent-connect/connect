import { Dispatch, SetStateAction } from 'react';
import { createComponentForm } from '@talent-connect/shared-utils';
import { MentoringSessionDurationOption, MENTORING_SESSION_DURATION_OPTIONS } from '@talent-connect/shared-config'
import { FormSubmitResult, RedMentoringSession } from '@talent-connect/shared-types';

interface ComponentFormProps {
  setShowAddSession: Dispatch<SetStateAction<boolean>>;
  menteeId: string;
  setSubmitResult: Dispatch<SetStateAction<FormSubmitResult>>;
  mentoringSessionsCreateStart: (mentoringSession: RedMentoringSession) => void;
}

export const componentForm = createComponentForm<ComponentFormProps>()
  .validation((yup) => ({
    date: yup.date()
      .required()
      .label('Date'),
    minuteDuration: yup.number()
      .required('Please select the duration of the session.')
      .oneOf([...MENTORING_SESSION_DURATION_OPTIONS], 'Please select a duration'),
  }))
  .initialValues(() => ({
    date: new Date(),
    minuteDuration: 0
  }))
  .formikConfig({
    enableReinitialize: true,
  })
  .onSubmit(async (
    { date, minuteDuration },
    { setSubmitting },
    { menteeId, setSubmitResult, setShowAddSession, mentoringSessionsCreateStart }
  ) => {
    setSubmitResult('submitting')
    try {
      await mentoringSessionsCreateStart({
        date,
        minuteDuration: minuteDuration as MentoringSessionDurationOption, // TODO: check
        menteeId,
      })
      setSubmitResult('success')
      setShowAddSession(false)
      setTimeout(() => window.location.reload(), 2000)
    } catch (err) {
      setSubmitResult('error')
    } finally {
      setSubmitting(false)
    }
  })
  