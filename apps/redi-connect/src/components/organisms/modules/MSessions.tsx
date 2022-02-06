import { useState } from 'react'
import { connect } from 'react-redux'
import _uniqueId from 'lodash/uniqueId'
import moment from 'moment'
import {
  Button,
  Icon,
  FormSelect,
  FormDatePicker,
} from '@talent-connect/shared-atomic-design-components'
import { Module, Modal } from '@talent-connect/shared-atomic-design-components'
import { Content, Element } from 'react-bulma-components'
import {
  RedMentoringSession,
  FormSubmitResult,
} from '@talent-connect/shared-types'
import { MENTORING_SESSION_DURATION_OPTIONS } from '@talent-connect/shared-config'
import { mentoringSessionsCreateStart } from '../../../redux/mentoringSessions/actions'
import './MSessions.scss'
import { componentForm } from './MSessions.form';

const formMentoringSessionDurationOptions = MENTORING_SESSION_DURATION_OPTIONS
  .map((sessionDuration) => ({
    value: sessionDuration,
    label: `${sessionDuration} min`,
  }))

interface AddSessionProps {
  onClickHandler: Function
}

function AddSession ({ onClickHandler }: AddSessionProps) {
  return (
    <Icon
      icon="plus"
      className="m-sessions__add"
      onClick={() => onClickHandler(true)}
    />
  );
}

interface MSessions {
  sessions: RedMentoringSession[]
  menteeId: string
  editable?: boolean
  mentoringSessionsCreateStart: (mentoringSession: RedMentoringSession) => void
}

function MSessions ({
  sessions,
  menteeId,
  editable,
  mentoringSessionsCreateStart,
}: MSessions) {
  const [showAddSession, setShowAddSession] = useState(false)
  const [submitResult, setSubmitResult] =
    useState<FormSubmitResult>('notSubmitted')

  const handleCancel = () => {
    setShowAddSession(false)
    formik.resetForm()
  }

  const formik = componentForm({
    menteeId,
    setShowAddSession,
    setSubmitResult,
    mentoringSessionsCreateStart,
  });

  return (
    <Module
      title={`Sessions ${sessions.length ? `(${sessions.length})` : ''}`}
      className="m-sessions"
      buttons={editable && <AddSession onClickHandler={setShowAddSession} />}
    >
      {sessions.length ? (
        <ul className="m-sessions__list">
          {sessions.map(({ date, minuteDuration }) => (
            <li
              className="m-sessions__list__item"
              key={date.toString()}
            >
              {moment(date).format('DD.MM.YYYY')} -{' '}
              <Element renderAs="span" textColor="grey">
                {minuteDuration} min
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

const mapDispatchToProps = (dispatch: Function) => ({
  mentoringSessionsCreateStart: (session: RedMentoringSession) =>
    dispatch(mentoringSessionsCreateStart(session)),
})

export default connect(null, mapDispatchToProps)(MSessions)
