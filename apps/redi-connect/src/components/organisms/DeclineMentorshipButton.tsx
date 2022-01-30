import { FC, useState } from 'react'
import { connect } from 'react-redux'
import { Content } from 'react-bulma-components'
import {
  TextArea,
  Button,
  FormSelect,
  TextInput,
} from '@talent-connect/shared-atomic-design-components'
import { Modal } from '@talent-connect/shared-atomic-design-components'
import { matchesDeclineMentorshipStart } from '../../redux/matches/actions'
import { RedMatch } from '@talent-connect/shared-types'
import { MENTOR_DECLINES_MENTORSHIP_REASON_FOR_DECLINING } from '@talent-connect/shared-config'
import { mapOptionsObject } from '@talent-connect/typescript-utilities';
import { DeclineMentorshipFormValues, componentForm } from './DeclineMentorshipButton.form';

interface DeclineMentorshipButtonProps {
  match: RedMatch
  menteeName?: string
  matchesDeclineMentorshipStart: (options: DeclineMentorshipFormValues & { redMatchId: string }) => void
}

// TODO: This throws a TS error: { dispatch, matchId }: ConnectButtonProps
// What to replace with instead of below hack?
const DeclineMentorshipButton: FC<DeclineMentorshipButtonProps> = ({
  match: { id: redMatchId },
  matchesDeclineMentorshipStart,
}) => {
  const [isModalActive, setModalActive] = useState(false)

  const formik = componentForm({
    matchesDeclineMentorshipStart,
    redMatchId,
    setModalActive
  })

  const isFormSubmittable = formik.dirty && formik.isValid

  return (
    <>
      <Button onClick={() => setModalActive(true)} simple>
        Decline
      </Button>
      <Modal
        show={isModalActive}
        stateFn={setModalActive}
        title="Decline Application"
      >
        <Modal.Body>
          <form>
            <Content>
              <p>
                Please let the mentee know why you cannot accept their
                mentorship application at this time:
              </p>
            </Content>
            <FormSelect
              name="ifDeclinedByMentor_chosenReasonForDecline"
              label=""
              items={formDeclineOptions}
              {...formik}
            />
            {formik.values.ifDeclinedByMentor_chosenReasonForDecline === 'other' && (
              <TextInput
                name="ifDeclinedByMentor_ifReasonIsOther_freeText"
                label="You chose other. Please specify:"
                {...formik}
              />
            )}
            <TextArea
              name="ifDeclinedByMentor_optionalMessageToMentee"
              rows={4}
              label="Would you like to send the mentee a short message with your cancellation?"
              placeholder={`Hi there, thanks for sending me a mentorship application. Unfortunately I am declining since ...`}
              {...formik}
            />
          </form>
        </Modal.Body>

        <Modal.Foot>
          <Button
            disabled={!isFormSubmittable}
            onClick={() => formik.handleSubmit()}
          >
            Decline mentorship
          </Button>
        </Modal.Foot>
      </Modal>
    </>
  )
}

const formDeclineOptions = mapOptionsObject(MENTOR_DECLINES_MENTORSHIP_REASON_FOR_DECLINING)

const mapDispatchToProps = (dispatch: Function) => ({
  matchesDeclineMentorshipStart: (options: DeclineMentorshipFormValues & { redMatchId: string; }) =>
    dispatch(matchesDeclineMentorshipStart(options)),
})

export default connect(null, mapDispatchToProps)(DeclineMentorshipButton)
