import { FC, useState } from 'react'
import { useHistory } from 'react-router'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import {
  Button,
  TextArea,
  Checkbox,
} from '@talent-connect/shared-atomic-design-components'
import { Modal } from '@talent-connect/shared-atomic-design-components'
import { reportProblem } from '../../services/api/api'
import { FormSubmitResult, UserType } from '@talent-connect/shared-types'
import { Content } from 'react-bulma-components'
import './ReportProblem.scss'

export interface ReportProblemProps {
  redProfileId: string
  type: UserType
}

interface FormValues {
  problemDescription: string
  ifFromMentor_cancelMentorshipImmediately: boolean
}

const validationSchema = Yup.object({
  problemDescription: Yup.string()
    .required()
    .label('Problem description')
    .max(1000),
})

const ReportProblem: FC<ReportProblemProps> = ({ redProfileId: reporteeId, type }) => {
  const [showProblemDialog, setShowProblemDialog] = useState(false)
  const [submitResult, setSubmitResult] = useState<FormSubmitResult>('notSubmitted')
  const history = useHistory()
  const isMentor = type === 'mentor'
  const reportType = isMentor ? 'mentee-report-about-mentor' : 'mentor-report-about-mentee'

  const handleCancel = () => {
    setShowProblemDialog(false)
    formik.resetForm()
  }

  const formik = useFormik<FormValues>({
    initialValues: {
      problemDescription: '',
      ifFromMentor_cancelMentorshipImmediately: false,
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async ({ ifFromMentor_cancelMentorshipImmediately: isCancelImmediately, problemDescription }, actions) => {
      if (isCancelImmediately) {
        const userIsCertain = window.confirm('Are you sure you want to cancel this mentorship?')
        if (!userIsCertain) return actions.setSubmitting(false)
      }
      setSubmitResult('submitting')
  
      try {
        await reportProblem({
          problemDescription,
          reportType,
          reporteeId,
          ifFromMentor_cancelMentorshipImmediately: isMentor && isCancelImmediately,
        })
        setSubmitResult('success')
        setShowProblemDialog(false)
        actions.resetForm()
        if (isCancelImmediately) history.push('/app/mentorships/')
      } catch (err) {
        setSubmitResult('error')
      }
    },
  })

  const { ifFromMentor_cancelMentorshipImmediately: isCancelImmediately } = formik.values

  return (
    <>
      <Content className="problem">
        If you feel uncertain about your mentorship, let us know{' '}
        <a onClick={() => setShowProblemDialog(true)}>here</a>.
      </Content>

      <Modal
        show={showProblemDialog}
        stateFn={setShowProblemDialog}
        title="What are your concerns?"
      >
        <Modal.Body>
          <Content>
            Please write a few words about why you feel uncertain about your
            mentorship and which issues you are experiencing?{' '}
          </Content>
          <form>
            {submitResult === 'error' && (
              <>An error occurred, please try again.</>
            )}
            <TextArea
              name="problemDescription"
              rows={4}
              placeholder="I have concerns about…"
              maxChar={1000}
              {...formik}
            />
            {isMentor && (
              <Checkbox.Form
                name="ifFromMentor_cancelMentorshipImmediately"
                checked={formik.values.ifFromMentor_cancelMentorshipImmediately}
                {...formik}
              >
                Immediately cancel mentorship with this mentee
              </Checkbox.Form>
            )}

            {isCancelImmediately && (
              <Content textColor="primary">
                Not ReDI? We regret you want to cancel this mentorship. Someone
                from our Career Department will be in touch with both you and
                your mentee
              </Content>
            )}
          </form>
        </Modal.Body>

        <Modal.Foot>
          <Button
            onClick={() => formik.handleSubmit()}
            disabled={!(formik.dirty && formik.isValid)}
          >
            Submit
          </Button>

          <Button onClick={handleCancel} simple>
            Cancel
          </Button>
        </Modal.Foot>
      </Modal>
    </>
  )
}

export default ReportProblem
