import {
  Caption,
  TextArea,
  Checkbox,
  Button,
} from '@talent-connect/shared-atomic-design-components'
import { Modal } from '@talent-connect/shared-atomic-design-components'
import { Content, Form } from 'react-bulma-components'
import { FormSubmitResult, RedProfile } from '@talent-connect/shared-types'

import { useFormik } from 'formik'
import { FC, useState } from 'react'
import * as Yup from 'yup'
import { requestMentorship } from '../../services/api/api'

import { RootState } from '../../redux/types'
import { connect } from 'react-redux'
import { profilesFetchOneStart } from '../../redux/profiles/actions'

interface ConnectionRequestFormValues {
  applicationText: string
  expectationText: string
  dataSharingAccepted: boolean
}

const validationSchema = Yup.object({
  applicationText: Yup.string()
    .required('Write at least 250 characters to introduce yourself to your mentee.')
    .min(250, 'Write at least 250 characters to introduce yourself to your mentee.')
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
  mentor: RedProfile
  profilesFetchOneStart: (is: string) => void
}

const ApplyForMentor: FC<Props> = ({
  mentor: { id, lastName, firstName },
  profilesFetchOneStart
}) => {
  const [submitResult, setSubmitResult] = useState<FormSubmitResult>('notSubmitted')
  const [show, setShow] = useState(false)
  
  const formik = useFormik<ConnectionRequestFormValues>({
    initialValues: {
      applicationText: '',
      expectationText: '',
      dataSharingAccepted: false,
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async ({ applicationText, expectationText }) => {
      setSubmitResult('submitting')
      try {
        await requestMentorship(applicationText, expectationText, id)
        setShow(false)
        profilesFetchOneStart(id)
      } catch (error) {
        setSubmitResult('error')
      }
    },
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
        title={`Application to ${firstName} ${lastName}`}
      >
        <Modal.Body>
          <form>
            {submitResult === 'success' && (
              <>Your application was successfully submitted.</>
            )}
            {submitResult !== 'success' && (
              <>
                <Caption>Motivation </Caption>
                <Content>
                  <p>
                    Write an application to the {firstName}{' '}
                    {lastName} in which you describe why you think that
                    the two of you are a great fit.
                  </p>
                </Content>
                <TextArea
                  name="applicationText"
                  className="oneandhalf-bs"
                  rows={4}
                  placeholder={`Dear ${firstName}...`}
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
                <TextArea
                  name="expectationText"
                  rows={4}
                  placeholder="My expectations for this mentorship…"
                  minChar={250}
                  maxChar={600}
                  {...formik}
                />

                <Form.Help
                  color="danger"
                  className={submitResult === 'error' ? 'help--show' : ''}
                >
                  {submitResult === 'error' &&
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

const mapStateToProps = ({ profiles }: RootState) => ({ mentor: profiles.oneProfile })

const mapDispatchToProps = (dispatch: Function) => ({
  profilesFetchOneStart: (profileId: string) =>
    dispatch(profilesFetchOneStart(profileId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ApplyForMentor)
