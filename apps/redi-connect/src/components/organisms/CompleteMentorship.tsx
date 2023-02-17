import {
  Button,
  FormTextArea,
  Modal,
} from '@talent-connect/shared-atomic-design-components'
import { useFormik } from 'formik'
import { useState } from 'react'
import { Content } from 'react-bulma-components'
import { useQueryClient } from 'react-query'
import { useHistory } from 'react-router-dom'
import { useCompleteMentorshipMutation } from './CompleteMentorship.generated'

interface CompleteMentorshipProps {
  mentorshipMatchId: string
}

interface CompleteMentorshipFormValues {
  mentorMessageOnComplete: string
}

const initialValues = {
  mentorMessageOnComplete: '',
}

const CompleteMentorship = ({ mentorshipMatchId }: CompleteMentorshipProps) => {
  const queryClient = useQueryClient()
  const history = useHistory()
  const completeMentorshipMutation = useCompleteMentorshipMutation()
  const [isModalActive, setModalActive] = useState(false)

  const submitForm = async (values: CompleteMentorshipFormValues) => {
    try {
      await completeMentorshipMutation.mutateAsync({
        input: {
          mentorshipMatchId,
          mentorMessageOnComplete: values.mentorMessageOnComplete,
        },
      })
      setModalActive(false)
      history.replace('/app/applications')
    } catch (error) {
      console.log('error ', error)
    }
  }

  const formik = useFormik({
    initialValues,
    onSubmit: submitForm,
  })

  const handleCancel = () => {
    setModalActive(false)
    formik.resetForm()
  }

  return (
    <>
      <Button onClick={() => setModalActive(true)}>Complete Mentorship</Button>
      <Modal
        show={isModalActive}
        stateFn={setModalActive}
        title="Complete Mentorship"
      >
        <Modal.Body>
          <form>
            <Content>
              <p>
                Are you sure you want to mark this mentorship match as
                completed?
              </p>
              <p>
                Please make sure you have logged all your mentoring sessions on
                the platform.
              </p>
            </Content>
            <FormTextArea
              name="mentorMessageOnComplete"
              rows={4}
              placeholder={
                'Is there anything you would like us to know about the mentorship match?'
              }
              formik={formik}
            />
          </form>
        </Modal.Body>

        <Modal.Foot>
          <Button onClick={() => formik.handleSubmit()}>
            Complete mentorship
          </Button>
          <Button onClick={handleCancel} simple>
            Cancel
          </Button>
        </Modal.Foot>
      </Modal>
    </>
  )
}

export default CompleteMentorship
