import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { Content } from 'react-bulma-components'
import {
  FormTextArea,
  Button,
  FormSelect,
  FormInput,
} from '@talent-connect/shared-atomic-design-components'
import { Modal } from '@talent-connect/shared-atomic-design-components'
import { matchesAcceptMentorshipStart } from '../../redux/matches/actions'
import { RedMatch } from '@talent-connect/shared-types'
import { mentorDeclinesMentorshipReasonForDecliningOptions } from '@talent-connect/shared-config'

interface DeclineMentorshipButtonProps {
  match: RedMatch
  menteeName?: string
  hasReachedMenteeLimit: boolean
  matchesAcceptMentorshipStart: (
    redMatchId: string,
    mentorReplyMessageOnAccept: string
  ) => void
}

interface DeclineMentorshipFormValues {
  ifDeclinedByMentor_chosenReasonForDecline: string
  ifDeclinedByMentor_ifReasonIsOther_freeText: string
  ifDeclinedByMentor_optionalMessageToMentee: string
}

const initialValues: DeclineMentorshipFormValues = {
  ifDeclinedByMentor_chosenReasonForDecline: '',
  ifDeclinedByMentor_ifReasonIsOther_freeText: '',
  ifDeclinedByMentor_optionalMessageToMentee: '',
}

const validationSchema = Yup.object({
  mentorReasonForDecline: Yup.string().required('Please pick an option'),
})

// TODO: This throws a TS error: { dispatch, matchId }: ConnectButtonProps
// What to replace with instead of below hack?
const DeclineMentorshipButton = ({
  match,
  matchesAcceptMentorshipStart,
}: DeclineMentorshipButtonProps) => {
  const [isModalActive, setModalActive] = useState(false)
  const history = useHistory()

  //  Keeping this to make sure we address this as its not planned in the desing, yet
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

  const submitForm = async (values: DeclineMentorshipFormValues) => {
    try {
      matchesAcceptMentorshipStart(match.id, values.mentorReplyMessageOnAccept)
      setModalActive(false)
      history.push(`/app/mentorships/${match.id}`)
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
      <Button
        onClick={() => setModalActive(true)}
        disabled={hasReachedMenteeLimit}
      >
        Decline
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

const formDeclineOptions =
  mentorDeclinesMentorshipReasonForDecliningOptions.map((item) => ({
    value: item.id,
    label: item.label,
  }))

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapDispatchToProps = (dispatch: any) => ({
  matchesAcceptMentorshipStart: (
    redMatchId: string,
    mentorReplyMessageOnAccept: string
  ) =>
    dispatch(
      matchesAcceptMentorshipStart(redMatchId, mentorReplyMessageOnAccept)
    ),
})

export default connect(null, mapDispatchToProps)(DeclineMentorshipButton)
