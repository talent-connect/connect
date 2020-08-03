import { Caption, FormTextArea, Checkbox, Button } from '../atoms'
import { Modal } from '../molecules'
import { Content, Form } from 'react-bulma-components'
import { RedProfile } from '../../types/RedProfile'

import { FormikHelpers as FormikActions, useFormik } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup'
import { requestMentorship } from '../../services/api/api'
import { FormSubmitResult } from '../../types/FormSubmitResult'

import { RootState } from '../../redux/types'
import { connect } from 'react-redux'
import { profilesFetchOneStart } from '../../redux/profiles/actions'

interface ConnectionRequestFormValues {
  applicationText: string
  expectationText: string
  dataSharingAccepted: boolean
}

const initialValues = {
  applicationText: '',
  expectationText: '',
  dataSharingAccepted: false
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
    .oneOf([true], 'Sharing profile data with your mentor is required')
})

interface Props {
  mentor: RedProfile
  profilesFetchOneStart: Function
}

const ApplyForMentor = ({ mentor, profilesFetchOneStart }: Props) => {
  const [submitResult, setSubmitResult] = useState<FormSubmitResult>(
    'notSubmitted'
  )
  const [show, setShow] = useState(false)
  const submitForm = async (
    values: ConnectionRequestFormValues,
    actions: FormikActions<ConnectionRequestFormValues>
  ) => {
    setSubmitResult('submitting')
    try {
      await requestMentorship(values.applicationText, values.expectationText, mentor.id)
      setShow(false)
      profilesFetchOneStart(mentor.id)
    } catch (error) {
      setSubmitResult('error')
    }
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema,
    onSubmit: submitForm
  })

  const handleCancel = () => {
    setShow(false)
    formik.resetForm()
  }

  return <>
    <Button onClick={() => setShow(true)}>Apply for this mentor</Button>
    <Modal
      show={show}
      stateFn={setShow}
      title={`Application to ${mentor.firstName} ${mentor.lastName}`}
    >
      <Modal.Body>
        <form>
          {submitResult === 'success' &&
            <>Your application was successfully submitted.</>
          }
          {submitResult !== 'success' &&
            <>
              <Caption>Motivation </Caption>
              <Content>
                <p>Write an application to the {mentor.firstName} {mentor.lastName} in which you describe why you think that the two of you are a great fit.</p>
              </Content>
              <FormTextArea
                name="applicationText"
                className="oneandhalf-bs"
                rows={4}
                placeholder={`Dear ${mentor.firstName}...`}
                {...formik}
              />

              <Caption>Expectation </Caption>
              <Content>
                <p>Please also write a few words about your expectations on the mentorship with this mentor.</p>
              </Content>
              <FormTextArea
                name="expectationText"
                rows={4}
                placeholder="My expectations for this mentorship…"
                {...formik}
              />

              <Form.Help color="danger" className={submitResult === 'error' ? 'help--show' : ''}>
                {submitResult === 'error' && 'An error occurred, please try again.'}
              </Form.Help>

              <Checkbox.Form
                name="dataSharingAccepted"
                checked={formik.values.dataSharingAccepted}
                {...formik}
              >
                I understand that my profile data will be shared with this mentor
            </Checkbox.Form>
            </>
          }
        </form>
      </Modal.Body>

      <Modal.Foot>
        <Button
          onClick={() => formik.handleSubmit()}
          disabled={!(formik.dirty && formik.isValid)}
        >Send application</Button>

        <Button onClick={handleCancel} simple>Cancel</Button>
      </Modal.Foot>
    </Modal>
  </>
}

const mapStateToProps = (state: RootState) => ({
  mentor: state.profiles.oneProfile as RedProfile
})

const mapDispatchToProps = (dispatch: any) => ({
  profilesFetchOneStart: (profileId: string) => dispatch(profilesFetchOneStart(profileId))
})

export default connect(mapStateToProps, mapDispatchToProps)(ApplyForMentor)
