import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useFormik } from 'formik'
import { Content } from 'react-bulma-components'
import { FormTextArea, Button } from '../atoms'
import { Modal } from '../molecules'
import { matchesMarkAsComplete } from '../../redux/matches/actions'
import { RedMatch } from '../../types/RedMatch'

interface CompleteMentorshipProps {
  match: RedMatch
  matchesMarkAsComplete: (
    redMatchId: string,
    mentorReplyMessageOnComplete: string
  ) => void
}

interface CompleteMentorshipFormValues {
  mentorReplyMessageOnComplete: string
}

const initialValues = {
  mentorReplyMessageOnComplete: ''
}

const CompleteMentorship = ({
  match,
  matchesMarkAsComplete
}: CompleteMentorshipProps) => {
  const [isModalActive, setModalActive] = useState(false)

  const submitForm = async (values: CompleteMentorshipFormValues) => {
    try {
      matchesMarkAsComplete(match.id, values.mentorReplyMessageOnComplete)
      setModalActive(false)
    } catch (error) {
      console.log('error ', error)
    }
  }

  const formik = useFormik({
    initialValues,
    onSubmit: submitForm
  })

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
                completed? Please make sure you have logged all your mentoring
                sessions on the platform.
              </p>
            </Content>
            <FormTextArea
              name="mentorReplyMessageOnComplete"
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
        </Modal.Foot>
      </Modal>
    </>
  )
}

const mapDispatchToProps = (dispatch: any) => ({
  matchesMarkAsComplete: (
    redMatchId: string,
    mentorReplyMessageOnComplete: string
  ) =>
    dispatch(matchesMarkAsComplete(redMatchId, mentorReplyMessageOnComplete))
})

export default connect(null, mapDispatchToProps)(CompleteMentorship)
