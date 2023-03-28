import {
  Button,
  Caption,
  Checkbox,
  FormTextArea,
  Modal,
} from '@talent-connect/shared-atomic-design-components'
import { Content, Form } from 'react-bulma-components'

import { useFormik } from 'formik'
import { useState } from 'react'
import { useQueryClient } from 'react-query'
import * as Yup from 'yup'
import {
  ApplyForMentorMentorPropFragment,
  useApplyForMentorshipMutation,
} from './ApplyForMentor.generated'

interface ConnectionRequestFormValues {
  applicationText: string
  expectationText: string
  dataSharingAccepted: boolean
}

const initialValues = {
  applicationText: '',
  expectationText: '',
  dataSharingAccepted: false,
}

const MIN_CHARS_COUNT = 250
const MAX_CHARS_COUNT = 600

const validationSchema = Yup.object({
  applicationText: Yup.string()
    .required()
    .min(MIN_CHARS_COUNT)
    .max(MAX_CHARS_COUNT),
  expectationText: Yup.string()
    .required()
    .min(MIN_CHARS_COUNT)
    .max(MAX_CHARS_COUNT),
  dataSharingAccepted: Yup.boolean()
    .required()
    .oneOf([true], 'Sharing profile data with your mentor is required'),
})

interface Props {
  mentor: ApplyForMentorMentorPropFragment
}

const ApplyForMentor = ({ mentor }: Props) => {
  const queryClient = useQueryClient()
  const applyForMentorshipMutation = useApplyForMentorshipMutation()

  const [show, setShow] = useState(false)
  const submitForm = async (values: ConnectionRequestFormValues) => {
    await applyForMentorshipMutation.mutateAsync({
      input: {
        applicationText: values.applicationText,
        expectationText: values.expectationText,
        mentorId: mentor.id,
      },
    })
    setTimeout(() => {
      queryClient.invalidateQueries()
    }, 100)
    setShow(false)
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema,
    onSubmit: submitForm,
  })

  const handleCancel = () => {
    setShow(false)
    formik.resetForm()
  }

  return (
    <>
      <Button onClick={() => setShow(true)}>Apply for this mentor</Button>
      <Modal
        show={show}
        stateFn={setShow}
        title={`Application to ${mentor.fullName}`}
      >
        <Modal.Body>
          <form>
            {applyForMentorshipMutation.isSuccess && (
              <>Your application was successfully submitted.</>
            )}
            {!applyForMentorshipMutation.isSuccess && (
              <>
                <Content>
                  <p>
                    Want to apply to {mentor.fullName}? Great! Next step is to
                    write about your Motivation and Expectation below.
                  </p>
                </Content>
                <Caption>Motivation </Caption>
                <Content size="small">
                  <p>
                    Describe why you think the two of you are a great fit
                    (250-600 characters).
                  </p>
                </Content>
                <FormTextArea
                  name="applicationText"
                  className="oneandhalf-bs"
                  rows={4}
                  placeholder={`Dear ${mentor.firstName}...`}
                  minChar={MIN_CHARS_COUNT}
                  maxLength={MAX_CHARS_COUNT}
                  formik={formik}
                />

                <Caption>Expectation </Caption>
                <Content size="small">
                  <p>
                    Write a few words about your expectations of the mentorship
                    with {mentor.firstName}.
                  </p>
                </Content>
                <FormTextArea
                  name="expectationText"
                  rows={4}
                  placeholder="My expectations for this mentorship…"
                  minChar={MIN_CHARS_COUNT}
                  maxLength={MAX_CHARS_COUNT}
                  formik={formik}
                />

                <Form.Help
                  color="danger"
                  className={
                    applyForMentorshipMutation.isError ? 'help--show' : ''
                  }
                >
                  {applyForMentorshipMutation.isError &&
                    'An error occurred, please try again.'}
                </Form.Help>

                <Checkbox.Form
                  name="dataSharingAccepted"
                  checked={formik.values.dataSharingAccepted}
                  {...formik}
                >
                  I understand that my profile data will be shared with this
                  mentor
                </Checkbox.Form>
              </>
            )}
          </form>
        </Modal.Body>

        <Modal.Foot>
          <Button
            onClick={() => formik.handleSubmit()}
            disabled={!(formik.dirty && formik.isValid)}
          >
            Send application
          </Button>

          <Button onClick={handleCancel} simple>
            Cancel
          </Button>
        </Modal.Foot>
      </Modal>
    </>
  )
}

export default ApplyForMentor
