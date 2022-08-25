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

const validationSchema = Yup.object({
  applicationText: Yup.string()
    .required(
      'Write at least 250 characters to introduce yourself to your mentee.'
    )
    .min(
      250,
      'Write at least 250 characters to introduce yourself to your mentee.'
    )
    .max(600, 'The introduction text can be up to 600 characters long.'),
  expectationText: Yup.string()
    .required('Write at least 250 characters about your expectations.')
    .min(250, 'Write at least 250 characters about your expectations.')
    .max(600, 'The expectations text can be up to 600 characters long.'),
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
    queryClient.invalidateQueries()
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
                <Caption>Motivation </Caption>
                <Content>
                  <p>
                    Write an application to the {mentor.fullName} in which you
                    describe why you think that the two of you are a great fit.
                  </p>
                </Content>
                <FormTextArea
                  name="applicationText"
                  className="oneandhalf-bs"
                  rows={4}
                  placeholder={`Dear ${mentor.firstName}...`}
                  minChar={250}
                  maxChar={600}
                  {...formik}
                />

                <Caption>Expectation </Caption>
                <Content>
                  <p>
                    Please also write a few words about your expectations on the
                    mentorship with this mentor.
                  </p>
                </Content>
                <FormTextArea
                  name="expectationText"
                  rows={4}
                  placeholder="My expectations for this mentorship…"
                  minChar={250}
                  maxChar={600}
                  {...formik}
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
