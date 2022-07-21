import {
  Button,
  FormTextArea,
  Modal,
} from '@talent-connect/shared-atomic-design-components'
import { useFormik } from 'formik'
import { useState } from 'react'
import { Content } from 'react-bulma-components'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import * as Yup from 'yup'
import {
  ConfirmMentorshipMatchPropFragment,
  useAcceptMentorshipMutation,
} from './ConfirmMentorship.generated'

interface ConfirmMentorshipProps {
  match: ConfirmMentorshipMatchPropFragment
  menteeName?: string
  hasReachedMenteeLimit: boolean
}

interface ConfirmMentorshipFormValues {
  mentorReplyMessageOnAccept: string
}

const initialValues = {
  mentorReplyMessageOnAccept: '',
}

const validationSchema = Yup.object({
  mentorReplyMessageOnAccept: Yup.string()
    .required(
      'Write at least 250 characters to introduce yourself to your mentee.'
    )
    .min(
      250,
      'Write at least 250 characters to introduce yourself to your mentee.'
    )
    .max(600, 'The introduction text can be up to 600 characters long.'),
})

// TODO: This throws a TS error: { dispatch, matchId }: ConnectButtonProps
// What to replace with instead of below hack?
const ConfirmMentorship = ({
  match,
  hasReachedMenteeLimit,
}: ConfirmMentorshipProps) => {
  const acceptMentorshipMutation = useAcceptMentorshipMutation()
  const [isModalActive, setModalActive] = useState(false)
  const history = useHistory()
  const { mentee = { firstName: null } } = match

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

  const submitForm = async (values: ConfirmMentorshipFormValues) => {
    try {
      await acceptMentorshipMutation.mutateAsync({
        input: {
          mentorReplyMessageOnAccept: values.mentorReplyMessageOnAccept,
          mentorshipMatchId: match.id,
        },
      })
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
            <FormTextArea
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

export default ConfirmMentorship
