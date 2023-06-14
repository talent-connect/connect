import {
  ConMentoringSession,
  MentoringSessionDuration,
  useCreateMentoringSessionMutation,
  useFindMatchQuery,
} from '@talent-connect/data-access'
import {
  Button,
  FormDatePicker,
  FormSelect,
  Icon,
  Modal,
  Module,
} from '@talent-connect/shared-atomic-design-components'
import { FormikHelpers, useFormik } from 'formik'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { Content, Element } from 'react-bulma-components'
import { useQueryClient } from 'react-query'
import { useParams } from 'react-router-dom'
import * as Yup from 'yup'
import { MentorshipRouteParams } from '../../../pages/app/mentorship/Mentorship'
import './MSessions.scss'

const formMentoringSessionDurationOptions = Object.values(
  MentoringSessionDuration
).map((sesstionDuration) => ({
  value: sesstionDuration,
  label: `${sesstionDuration.replace('MIN', '')} min`,
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
  minuteDuration: MentoringSessionDuration
}

const initialFormValues: FormValues = {
  date: new Date(),
  minuteDuration: MentoringSessionDuration.Min60,
}

const validationSchema = Yup.object({
  date: Yup.date().max(new Date()).required().label('Date'),
  minuteDuration: Yup.string()
    .required('Please select the duration of the session.')
    .oneOf(
      [...Object.values(MentoringSessionDuration)],
      'Please select a duration'
    ),
})

interface MSessions {
  sessions: Pick<ConMentoringSession, 'id' | 'date' | 'minuteDuration'>[]
  menteeId: string
  editable?: boolean
}

const MSessions = ({ sessions, menteeId, editable }: MSessions) => {
  const queryClient = useQueryClient()
  const { matchId } = useParams<MentorshipRouteParams>()
  const createSessionMutation = useCreateMentoringSessionMutation()

  const [showAddSession, setShowAddSession] = useState(false)

  const submitForm = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    await createSessionMutation.mutateAsync({
      input: {
        ...values,
        menteeId,
      },
    })
    // TODO: I don't like this dependency - this mutation has to know which queries
    // are affected by this write ,and has to invalidate them. Perhaps this is a rason to
    // switch to Apollo with a normalized cache that can figure out intelligently when
    // to invalidate queries?
    queryClient.invalidateQueries(useFindMatchQuery.getKey({ id: matchId }))
    setShowAddSession(false)
    // setTimeout(() => window.location.reload(), 2000)
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

  useEffect(() => {
    if (showAddSession) {
      formik.resetForm()
    }
  }, [showAddSession])

  return (
    <Module
      title={`Sessions ${sessions.length ? `(${sessions.length})` : ''}`}
      className="m-sessions"
      buttons={editable && <AddSession onClickHandler={setShowAddSession} />}
    >
      {sessions.length > 0 ? (
        <ul className="m-sessions__list">
          {sessions.map((session) => (
            <li className="m-sessions__list__item" key={session.id}>
              {moment(session.date).format('DD.MM.YYYY')} -{' '}
              <Element renderAs="span" textColor="grey">
                {session.minuteDuration.replace('MIN', '')} min
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
          styles={{ overflow: 'unset' }} // This is needed to be able to show the datepicker outside the modal
          show={showAddSession}
          stateFn={setShowAddSession}
          title="Log a new mentoring session"
        >
          {/** overflow: 'unset' is needed to be able to show the datepicker outside the modal */}
          <Modal.Body style={{ overflow: 'unset' }}>
            <form>
              {createSessionMutation.isError ? (
                <>An error occurred, please try again.</>
              ) : null}

              <FormDatePicker
                maxDate={new Date()}
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
              disabled={!formik.isValid}
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

export default MSessions
