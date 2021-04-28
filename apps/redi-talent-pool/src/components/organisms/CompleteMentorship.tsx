import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useFormik } from 'formik'
import { Content } from 'react-bulma-components'
import {
  FormTextArea,
  Button,
} from '@talent-connect/shared-atomic-design-components'
import { Modal } from '@talent-connect/shared-atomic-design-components'
import { matchesMarkAsComplete } from '../../redux/matches/actions'
import { RedMatch } from '@talent-connect/shared-types'

interface CompleteMentorshipProps {
  match: RedMatch
  matchesMarkAsComplete: (
    redMatchId: string,
    mentorMessageOnComplete: string
  ) => void
}

interface CompleteMentorshipFormValues {
  mentorMessageOnComplete: string
}

const initialValues = {
  mentorMessageOnComplete: '',
}

const CompleteMentorship = ({
  match,
  matchesMarkAsComplete,
}: CompleteMentorshipProps) => {
  const [isModalActive, setModalActive] = useState(false)

  const submitForm = async (values: CompleteMentorshipFormValues) => {
    try {
      matchesMarkAsComplete(match.id, values.mentorMessageOnComplete)
      setModalActive(false)
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
              {...formik}
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

const mapDispatchToProps = (dispatch: any) => ({
  matchesMarkAsComplete: (
    redMatchId: string,
    mentorMessageOnComplete: string
  ) => dispatch(matchesMarkAsComplete(redMatchId, mentorMessageOnComplete)),
})

export default connect(null, mapDispatchToProps)(CompleteMentorship)
