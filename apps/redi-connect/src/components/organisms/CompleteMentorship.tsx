import { FC, useState } from 'react'
import { connect } from 'react-redux'
import { Content } from 'react-bulma-components'
import {
  TextArea,
  Button,
} from '@talent-connect/shared-atomic-design-components'
import { Modal } from '@talent-connect/shared-atomic-design-components'
import { matchesMarkAsComplete } from '../../redux/matches/actions'
import { RedMatch } from '@talent-connect/shared-types'
import { componentForm } from './CompleteMentorship.form';

interface CompleteMentorshipProps {
  match: RedMatch
  matchesMarkAsComplete: (redMatchId: string, mentorMessageOnComplete: string) => void
}

const CompleteMentorship: FC<CompleteMentorshipProps> = ({
  match: { id },
  matchesMarkAsComplete,
}) => {
  const [isModalActive, setModalActive] = useState(false)

  const formik = componentForm({
    id,
    matchesMarkAsComplete,
    setModalActive,
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
            <TextArea
              name="mentorMessageOnComplete"
              rows={4}
              placeholder={'Is there anything you would like us to know about the mentorship match?'}
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

const mapDispatchToProps = (dispatch: Function) => ({
  matchesMarkAsComplete: (redMatchId: string, mentorMessageOnComplete: string) =>
    dispatch(matchesMarkAsComplete(redMatchId, mentorMessageOnComplete)),
})

export default connect(null, mapDispatchToProps)(CompleteMentorship)
