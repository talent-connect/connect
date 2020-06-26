import React, { useState } from 'react'
import { Button, FormTextArea, Checkbox } from '../atoms'
import { Modal } from '../molecules'
import { useFormik, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import { RedProblemReportDto } from '../../types/RedProblemReportDto'
import { FormSubmitResult } from '../../types/FormSubmitResult'
import { profilesFetchOneStart } from '../../redux/profiles/actions'
import { getRedProfile } from '../../services/auth/auth'
import { reportProblem } from '../../services/api/api'
import { UserType } from '../../types/UserType'
import { Content } from 'react-bulma-components'
import { connect } from 'react-redux'
import './ReportProblem.scss'

export interface ReportProblemProps {
  redProfileId: string
  profilesFetchOneStart: Function
  type: UserType
}

interface FormValues {
  problemDescription: string
  ifFromMentor_cancelMentorshipImmediately: boolean
}

const initialFormValues: FormValues = {
  problemDescription: '',
  ifFromMentor_cancelMentorshipImmediately: false
}

const validationSchema = Yup.object({
  problemDescription: Yup.string()
    .required()
    .label('Problem description')
    .max(1000)
})

const ReportProblem = ({ redProfileId, type, profilesFetchOneStart }: ReportProblemProps) => {
  const [showProblemDialog, setShowProblemDialog] = useState(false)
  const [submitResult, setSubmitResult] = useState<FormSubmitResult>(
    'notSubmitted'
  )
  const { userType } = getRedProfile()
  const submitForm = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    if (values.ifFromMentor_cancelMentorshipImmediately) {
      const userIsCertain = window.confirm(
        'Are you sure you want to cancel this mentorship?'
      )
      if (!userIsCertain) return actions.setSubmitting(false)
    }
    setSubmitResult('submitting')
    try {
      const report: RedProblemReportDto = {
        problemDescription: values.problemDescription,
        reportType:
          type === 'mentee'
            ? 'mentor-report-about-mentee'
            : 'mentee-report-about-mentor',
        reporteeId: redProfileId
      }
      if (type === 'mentor') {
        report.ifFromMentor_cancelMentorshipImmediately =
          values.ifFromMentor_cancelMentorshipImmediately
      }
      await reportProblem(report)
      setSubmitResult('success')
      setShowProblemDialog(false)
      // TODO: can this be decoupled? Here the component "knows" that it's inside a <Profile>
      // and triggers a refresh of that <Profile>
      profilesFetchOneStart(redProfileId)
    } catch (err) {
      setSubmitResult('error')
    } finally {
      actions.setSubmitting(false)
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
    onSubmit: submitForm
  })

  const { ifFromMentor_cancelMentorshipImmediately } = formik.values

  return (
    <>
      <Content className="problem">
        If you feel uncertain about your mentorship, let us know  <a onClick={() => setShowProblemDialog(true)}>here</a>.
      </Content>

      <Modal
        show={showProblemDialog}
        stateFn={setShowProblemDialog}
        title="What are your concerns?"
      >
        <Content>Please write a few words about why you feel uncertain about your mentorship and which issues you are experiencing? </Content>
        <form>
          {submitResult === 'error' && <>An error occurred, please try again.</>}
          <FormTextArea
            name="problemDescription"
            rows={4}
            placeholder="I have concerns about…"
            {...formik}
          />
          {userType === 'mentor' && (
            <Checkbox.Form
              name="ifFromMentor_cancelMentorshipImmediately"
              checked={formik.values.ifFromMentor_cancelMentorshipImmediately}
              {...formik}
            >
              Immediately cancel mentorship with this mentee
            </Checkbox.Form>
          )}

          {ifFromMentor_cancelMentorshipImmediately &&
            <Content textColor="primary">Not ReDI? We regret you want to cancel this mentorship.
              Someone from our Career Department will be in touch with
              both you and your mentee
            </Content>
          }
        </form>

        <Modal.Buttons>
          <Button
            onClick={() => formik.handleSubmit()}
            disabled={!(formik.dirty && formik.isValid)}
          >Submit</Button>

          <Button onClick={handleCancel} simple>Cancel</Button>
        </Modal.Buttons>
      </Modal>
    </>
  )
}

const mapDispatchToProps = (dispatch: any) => ({
  profilesFetchOneStart: (profileId: string) => dispatch(profilesFetchOneStart(profileId))
})

export default connect(null, mapDispatchToProps)(ReportProblem)
