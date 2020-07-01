import React, { useState } from 'react'
import { connect } from 'react-redux'
import _uniqueId from 'lodash/uniqueId'
import * as Yup from 'yup'
import moment from 'moment'
import { Button, Icon, FormSelect, FormDatePicker } from '../../atoms'
import { Module, Modal } from '../../molecules'
import { Content, Element } from 'react-bulma-components'
import { RedMentoringSession } from '../../../types/RedMentoringSession'
import { FormSubmitResult } from '../../../types/FormSubmitResult'
import { useFormik, FormikHelpers } from 'formik'
import { mentoringSessionDurationOptions } from '../../../config/config'
import { mentoringSessionsCreateStart } from '../../../redux/mentoringSessions/actions'
import './MSessions.scss'

const formMentoringSessionDurationOptions = mentoringSessionDurationOptions.map(sesstionDuration => ({ value: sesstionDuration, label: `${sesstionDuration} min` }))

interface AddSessionProps {
  onClickHandler: Function
}
const AddSession = ({ onClickHandler }: AddSessionProps) => (
  <Icon icon="plus" className="m-sessions__add" onClick={() => onClickHandler(true)} />
)

interface FormValues {
  date: Date
  minuteDuration?: number
}

const initialFormValues: FormValues = {
  date: new Date()
}

const validationSchema = Yup.object({
  date: Yup.date()
    .required()
    .label('Date'),
  minuteDuration: Yup.number()
    .required('Please select the duration of the session.')
    .oneOf(mentoringSessionDurationOptions, 'Please select a duration')
})

interface MSessions {
  sessions: RedMentoringSession[]
  menteeId: string
  editable?: boolean
  mentoringSessionsCreateStart: (mentoringSession: RedMentoringSession) => void
}

const MSessions = ({ sessions, menteeId, editable, mentoringSessionsCreateStart }: MSessions) => {
  const [showAddSession, setShowAddSession] = useState(false)
  const [submitResult, setSubmitResult] = useState<FormSubmitResult>('notSubmitted')

  const submitForm = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    setSubmitResult('submitting')
    try {
      const mentoringSession: RedMentoringSession = {
        date: values.date,
        minuteDuration: Number(values.minuteDuration),
        menteeId: menteeId
      }
      await mentoringSessionsCreateStart(mentoringSession)
      setSubmitResult('success')
      setShowAddSession(false)
    } catch (err) {
      setSubmitResult('error')
    } finally {
      actions.setSubmitting(false)
    }
  }

  const handleCancel = () => {
    setShowAddSession(false)
    formik.resetForm()
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialFormValues,
    validationSchema,
    onSubmit: submitForm
  })

  return (
    <Module
      title={`Sessions ${sessions.length ? `(${sessions.length})` : ''}`}
      className="m-sessions"
      buttons={editable && <AddSession onClickHandler={setShowAddSession} />}
    >
      {(sessions.length > 0)
        ? <ul className="m-sessions__list">
          {sessions.map(session =>
            <li className="m-sessions__list__item" key={session.date.toString()}>
              {moment(session.date).format('DD.MM.YYYY')} - <Element renderAs="span" textColor="grey">{session.minuteDuration} min</Element>
            </li>
          )}
        </ul>
        : <Content textColor="grey-dark" italic>
          {editable
            ? 'Log your first session with your mentee.'
            : 'Please remind your mentor to log your mentoring sessions.'}
        </Content>
      }

      {editable && <Modal
        show={showAddSession}
        stateFn={setShowAddSession}
        title="Log a new mentoring session"
      >
        {/* <Content>Please write a few words about why you feel uncertain about your mentorship and which issues you are experiencing? </Content> */}
        <form>
          {submitResult === 'error' && <>An error occurred, please try again.</>}

          <FormDatePicker
            label="When did the mentoring session take place?"
            name="date"
            placeholder="Add the correct date"
            {...formik}
          />

          <FormSelect
            label="How long was the session?"
            name="minuteDuration"
            placeholder="Add the duration of the session"
            items={formMentoringSessionDurationOptions}
            {...formik}
          />
        </form>

        <Modal.Buttons>
          <Button
            onClick={() => formik.handleSubmit()}
            disabled={!(formik.dirty && formik.isValid)}
          >Add Session</Button>

          <Button onClick={handleCancel} simple>Cancel</Button>
        </Modal.Buttons>
      </Modal>}
    </Module>
  )
}

const mapDispatchToProps = (dispatch: any) => ({
  mentoringSessionsCreateStart: (session: RedMentoringSession) => dispatch(mentoringSessionsCreateStart(session))
})

export default connect(null, mapDispatchToProps)(MSessions)
