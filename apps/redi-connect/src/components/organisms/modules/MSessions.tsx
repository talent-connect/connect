import {
  Button,
  FormDatePicker,
  FormSelect,
  Icon,
  Modal,
  Module,
} from '@talent-connect/shared-atomic-design-components'
import {
  MentoringSessionDurationOption,
  MENTORING_SESSION_DURATION_OPTIONS,
} from '@talent-connect/shared-config'
import {
  FormSubmitResult,
  RedMentoringSession,
} from '@talent-connect/shared-types'
import { FormikHelpers, useFormik } from 'formik'
import moment from 'moment'
import { useState } from 'react'
import { Content, Element } from 'react-bulma-components'
import { connect } from 'react-redux'
import * as Yup from 'yup'
import { mentoringSessionsCreateStart } from '../../../redux/mentoringSessions/actions'
import './MSessions.scss'

const formMentoringSessionDurationOptions =
  MENTORING_SESSION_DURATION_OPTIONS.map((sesstionDuration) => ({
    value: sesstionDuration,
    label: `${sesstionDuration} min`,
  }))

interface AddSessionProps {
  onClickHandler: Function
}

const AddSession = ({ onClickHandler }: AddSessionProps) => (
  <Icon
    icon="plus"
    className="m-sessions__add"
    onClick={() => onClickHandler(true)}
  />
)

interface FormValues {
  date: Date
  minuteDuration?: MentoringSessionDurationOption
}

const initialFormValues: FormValues = {
  date: new Date(),
}

const validationSchema = Yup.object({
  date: Yup.date().required().label('Date'),
  minuteDuration: Yup.number()
    .required('Please select the duration of the session.')
    .oneOf([...MENTORING_SESSION_DURATION_OPTIONS], 'Please select a duration'),
})

interface MSessions {
  sessions: RedMentoringSession[]
  menteeId: string
  editable?: boolean
  mentoringSessionsCreateStart: (mentoringSession: RedMentoringSession) => void
}

const MSessions = ({
  sessions,
  menteeId,
  editable,
  mentoringSessionsCreateStart,
}: MSessions) => {
  const [showAddSession, setShowAddSession] = useState(false)
  const [submitResult, setSubmitResult] =
    useState<FormSubmitResult>('notSubmitted')

  const submitForm = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    setSubmitResult('submitting')
    try {
      const mentoringSession: RedMentoringSession = {
        date: values.date,
        minuteDuration: Number(
          values.minuteDuration
        ) as MentoringSessionDurationOption,
        menteeId: menteeId,
      }
      await mentoringSessionsCreateStart(mentoringSession)
      setSubmitResult('success')
      setShowAddSession(false)
      setTimeout(() => window.location.reload(), 2000)
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
    onSubmit: submitForm,
  })

  return (
    <Module
      title={`Sessions ${sessions.length ? `(${sessions.length})` : ''}`}
      className="m-sessions"
      buttons={editable && <AddSession onClickHandler={setShowAddSession} />}
    >
      {sessions.length > 0 ? (
        <ul className="m-sessions__list">
          {sessions.map((session) => (
            <li
              className="m-sessions__list__item"
              key={session.date.toString()}
            >
              {moment(session.date).format('DD.MM.YYYY')} -{' '}
              <Element renderAs="span" textColor="grey">
                {session.minuteDuration} min
              </Element>
            </li>
          ))}
        </ul>
      ) : (
        <Content textColor="grey-dark" italic>
          {editable
            ? 'Log your first session with your mentee.'
            : 'Please remind your mentor to log your mentoring sessions.'}
        </Content>
      )}

      {editable && (
        <Modal
          show={showAddSession}
          stateFn={setShowAddSession}
          title="Log a new mentoring session"
        >
          <Modal.Body>
            {/* <Content>Please write a few words about why you feel uncertain about your mentorship and which issues you are experiencing? </Content> */}
            <form>
              {submitResult === 'error' && (
                <>An error occurred, please try again.</>
              )}

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
          </Modal.Body>

          <Modal.Foot>
            <Button
              onClick={() => formik.handleSubmit()}
              disabled={!(formik.dirty && formik.isValid)}
            >
              Add Session
            </Button>

            <Button onClick={handleCancel} simple>
              Cancel
            </Button>
          </Modal.Foot>
        </Modal>
      )}
    </Module>
  )
}

const mapDispatchToProps = (dispatch: any) => ({
  mentoringSessionsCreateStart: (session: RedMentoringSession) =>
    dispatch(mentoringSessionsCreateStart(session)),
})

export default connect(null, mapDispatchToProps)(MSessions)
