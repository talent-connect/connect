import { UserType } from '@talent-connect/data-access'
import {
  Button,
  Checkbox,
  FormTextArea,
  Modal,
} from '@talent-connect/shared-atomic-design-components'
import { FormSubmitResult } from '@talent-connect/shared-types'
import { FormikHelpers, useFormik } from 'formik'
import { useState } from 'react'
import { Content } from 'react-bulma-components'
import { useQueryClient } from 'react-query'
import { useHistory } from 'react-router-dom'
import * as Yup from 'yup'
import { useReportProblemMutation } from './ReportProblem.generated'
import './ReportProblem.scss'

export interface ReportProblemProps {
  redProfileId: string
  type: UserType
}

interface FormValues {
  problemDescription: string
  ifFromMentor_cancelMentorshipImmediately: boolean
}

const initialFormValues: FormValues = {
  problemDescription: '',
  ifFromMentor_cancelMentorshipImmediately: false,
}

const validationSchema = Yup.object({
  problemDescription: Yup.string()
    .required()
    .label('Problem description')
    .max(1000),
})

const ReportProblem = ({ redProfileId, type }: ReportProblemProps) => {
  const queryClient = useQueryClient()
  const reportProblemMutation = useReportProblemMutation()
  const [showProblemDialog, setShowProblemDialog] = useState(false)
  const [submitResult, setSubmitResult] =
    useState<FormSubmitResult>('notSubmitted')
  const history = useHistory()
  const isMentor = type === UserType.Mentor

  const submitForm = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    const { ifFromMentor_cancelMentorshipImmediately: isCancelImmediately } =
      values
    if (isCancelImmediately) {
      const userIsCertain = window.confirm(
        'Are you sure you want to cancel this mentorship?'
      )
      if (!userIsCertain) return actions.setSubmitting(false)
    }
    setSubmitResult('submitting')
    try {
      await reportProblemMutation.mutateAsync({
        input: {
          problemDescription: values.problemDescription,
          reporteeProfileId: redProfileId,
          ifFromMentor_cancelMentorshipImmediately:
            isMentor && isCancelImmediately,
        },
      })
      setSubmitResult('success')
      setShowProblemDialog(false)
      actions.resetForm()
      queryClient.invalidateQueries()
      if (isCancelImmediately) history.push('/app/me')
    } catch (err) {
      setSubmitResult('error')
    }
  }

  const handleCancel = () => {
    setShowProblemDialog(false)
    formik.resetForm()
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialFormValues,
    validationSchema,
    onSubmit: submitForm,
  })

  const { ifFromMentor_cancelMentorshipImmediately: isCancelImmediatly } =
    formik.values

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
            <FormTextArea
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

            {isCancelImmediatly && (
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
