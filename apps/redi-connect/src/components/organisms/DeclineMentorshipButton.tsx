import { DeclineReason } from '@talent-connect/data-access'
import {
  Button,
  FormInput,
  FormSelect,
  FormTextArea,
  Modal,
} from '@talent-connect/shared-atomic-design-components'
import { MENTOR_DECLINES_MENTORSHIP_REASON_FOR_DECLINING } from '@talent-connect/shared-config'
import { useFormik } from 'formik'
import { useState } from 'react'
import { Content } from 'react-bulma-components'
import { useQueryClient } from 'react-query'
import * as Yup from 'yup'
import {
  DeclineMentorshipButtonMatchPropFragment,
  useDeclineMentorshipMutation,
} from './DeclineMentorshipButton.generated'

interface DeclineMentorshipButtonProps {
  match: DeclineMentorshipButtonMatchPropFragment
  menteeName?: string
}

interface DeclineMentorshipFormValues {
  ifDeclinedByMentor_chosenReasonForDecline?: DeclineReason
  ifDeclinedByMentor_ifReasonIsOther_freeText: string
  ifDeclinedByMentor_optionalMessageToMentee: string
}

const initialValues: DeclineMentorshipFormValues = {
  ifDeclinedByMentor_chosenReasonForDecline: null,
  ifDeclinedByMentor_ifReasonIsOther_freeText: '',
  ifDeclinedByMentor_optionalMessageToMentee: '',
}

const validationSchema = Yup.object({
  ifDeclinedByMentor_chosenReasonForDecline: Yup.string().required(
    'Please pick an option'
  ),
})

// TODO: This throws a TS error: { dispatch, matchId }: ConnectButtonProps
// What to replace with instead of below hack?
const DeclineMentorshipButton = ({ match }: DeclineMentorshipButtonProps) => {
  const queryClient = useQueryClient()
  const declineMentorshipMutation = useDeclineMentorshipMutation()
  const [isModalActive, setModalActive] = useState(false)

  const submitForm = async (values: DeclineMentorshipFormValues) => {
    try {
      await declineMentorshipMutation.mutateAsync({
        input: {
          mentorshipMatchId: match.id,
          ifDeclinedByMentor_chosenReasonForDecline:
            values.ifDeclinedByMentor_chosenReasonForDecline,
          ifDeclinedByMentor_ifReasonIsOther_freeText:
            values.ifDeclinedByMentor_ifReasonIsOther_freeText,
          ifDeclinedByMentor_optionalMessageToMentee:
            values.ifDeclinedByMentor_optionalMessageToMentee,
        },
      })
      setModalActive(false)

      setTimeout(() => {
        queryClient.invalidateQueries()
      })
    } catch (error) {
      console.log('error ', error)
    }
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: submitForm,
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
            {formik.values.ifDeclinedByMentor_chosenReasonForDecline ===
            'other' ? (
              <FormInput
                name="ifDeclinedByMentor_ifReasonIsOther_freeText"
                label="You chose other. Please specify:"
                {...formik}
              />
            ) : null}
            <FormTextArea
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

const formDeclineOptions = Object.entries(
  MENTOR_DECLINES_MENTORSHIP_REASON_FOR_DECLINING
).map(([value, label]) => ({ value, label }))

export default DeclineMentorshipButton
