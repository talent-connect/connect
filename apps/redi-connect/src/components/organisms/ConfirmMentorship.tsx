import { useState } from 'react'
import { connect } from 'react-redux'
import { Content } from 'react-bulma-components'
import {
  TextArea,
  Button,
} from '@talent-connect/shared-atomic-design-components'
import { Modal } from '@talent-connect/shared-atomic-design-components'
import { matchesAcceptMentorshipStart } from '../../redux/matches/actions'
import { RedMatch } from '@talent-connect/shared-types'
import { componentForm } from './ConfirmMentorship.form';

interface ConfirmMentorshipProps {
  match: RedMatch
  menteeName?: string
  hasReachedMenteeLimit: boolean
  matchesAcceptMentorshipStart: (
    redMatchId: string,
    mentorReplyMessageOnAccept: string
  ) => void
}

// TODO: This throws a TS error: { dispatch, matchId }: ConnectButtonProps
// What to replace with instead of below hack?
const ConfirmMentorship = ({
  match,
  hasReachedMenteeLimit,
  matchesAcceptMentorshipStart,
}: ConfirmMentorshipProps) => {
  const [isModalActive, setModalActive] = useState(false)
  const { mentee = { firstName: null } } = match

  //  Keeping this to make sure we address this as its not planned in the design, yet
  //   <Tooltip> requires child <Button> to be wrapped in a div since it's disabled
  //   props.hasReachedMenteeLimit ? (
  //     <Tooltip
  //       placement="top"
  //       title="You're reached the number of mentees you've specified as able to take on"
  //     >
  //       <div onClick={e => e.stopPropagation()}>{children}</div>
  //     </Tooltip>
  //   ) : (
  //     <>{children}</>
  //   )

  const formik = componentForm({
    match,
    matchesAcceptMentorshipStart,
    setModalActive
  })

  const isFormSubmittable = formik.dirty && formik.isValid

  return (
    <>
      <Button
        onClick={() => setModalActive(true)}
        disabled={hasReachedMenteeLimit}
      >
        Accept
      </Button>
      <Modal
        show={isModalActive}
        stateFn={setModalActive}
        title="Accept Application"
      >
        <Modal.Body>
          <form>
            <Content>
              <p>
                Please write a few welcoming words to your future mentee and
                give some information on your first meeting. (write at least 250
                characters)
              </p>
            </Content>
            <TextArea
              name="mentorReplyMessageOnAccept"
              rows={4}
              placeholder={`Dear ${mentee.firstName}...`}
              minChar={250}
              maxChar={600}
              {...formik}
            />
          </form>
        </Modal.Body>

        <Modal.Foot>
          <Button
            disabled={!isFormSubmittable}
            onClick={() => formik.handleSubmit()}
          >
            Accept mentorship request
          </Button>
        </Modal.Foot>
      </Modal>
    </>
  )
}

const mapDispatchToProps = (dispatch: Function) => ({
  matchesAcceptMentorshipStart: (redMatchId: string, mentorReplyMessageOnAccept: string) =>
    dispatch(matchesAcceptMentorshipStart(redMatchId, mentorReplyMessageOnAccept)),
})

export default connect(null, mapDispatchToProps)(ConfirmMentorship)
