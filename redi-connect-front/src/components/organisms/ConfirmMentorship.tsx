import React, { useState } from 'react'
import { connect } from 'react-redux'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { Content, Columns, Modal, Box } from 'react-bulma-components'
import { Caption, FormTextArea, Button, Heading } from '../atoms'
import { matchesAcceptMentorshipStart } from '../../redux/matches/actions'

interface ConfirmMentorshipProps {
  matchId: string
  menteeName?: string
  hasReachedMenteeLimit: boolean
  matchesAcceptMentorshipStart: (redMatchId: string, mentorReplyMessageOnAccept: string) => void
}

interface ConfirmMentorshipFormValues {
  mentorReplyMessageOnAccept: string
}

const initialValues = {
  mentorReplyMessageOnAccept: ''
}

const validationSchema = Yup.object({
  mentorReplyMessageOnAccept: Yup.string()
    .required()
    .min(250)
    .max(600)
    .label('Write a message to your new mentee')
})

// TODO: This throws a TS error: { dispatch, matchId }: ConnectButtonProps
// What to replace with instead of below hack?
const ConfirmMentorship = ({ matchId, menteeName, hasReachedMenteeLimit, matchesAcceptMentorshipStart }: ConfirmMentorshipProps) => {
  const [isModalActive, setModalActive] = useState(false)

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

  const submitForm = async (
    values: ConfirmMentorshipFormValues
  ) => {
    try {
      matchesAcceptMentorshipStart(matchId, values.mentorReplyMessageOnAccept)
      setModalActive(false)
    } catch (error) {
      console.log('error ', error)
    }
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema,
    onSubmit: submitForm
  })

  const isFormSubmittable = formik.dirty && formik.isValid

  return <>
    <Button onClick={() => setModalActive(true)} disabled={hasReachedMenteeLimit}>Accept</Button>
    <Modal show={isModalActive} onClose={() => setModalActive(false)} closeOnEsc closeOnBlur>
      <Modal.Content>
        <Box>
          <Heading className="box__heading" size="small">Accept Application</Heading>
          <form>
            <Caption>Start the conversation </Caption>
            <Content size="small">
              <p>Please write a few welcoming words to your future mentee and give an info about the next step for your first meeting:</p>
            </Content>
            <FormTextArea
              name="mentorReplyMessageOnAccept"
              className="double-block-space"
              rows={4}
              placeholder={`Dear ${menteeName && menteeName}...`}
              {...formik}
            />
          </form>
          <Columns>
            <Columns.Column textAlignment="right">
              <Button
                disabled={!isFormSubmittable}
                onClick={() => formik.handleSubmit()}
              >
                Accept mentorship request
              </Button>
            </Columns.Column>
          </Columns>
        </Box>
      </Modal.Content>
    </Modal>
  </>
}

const mapDispatchToProps = (dispatch: any) => ({
  matchesAcceptMentorshipStart: (redMatchId: string, mentorReplyMessageOnAccept: string) => dispatch(matchesAcceptMentorshipStart(redMatchId, mentorReplyMessageOnAccept))
})

export default connect(null, mapDispatchToProps)(ConfirmMentorship)
