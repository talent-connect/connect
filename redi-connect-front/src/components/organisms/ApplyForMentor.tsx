import {
  Paper
} from '@material-ui/core'
import { Caption, FormTextArea, FormCheckbox, Button, Heading } from '../atoms'
import { Content, Columns, Form, Modal, Box } from 'react-bulma-components'
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
    .required()
    .min(250)
    .max(600)
    .label('Application message'),
  expectationText: Yup.string()
    .required()
    .min(250)
    .max(600)
    .label('Motivation message'),
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
      profilesFetchOneStart(mentor.id)
    } catch (error) {
      setSubmitResult('error')
    } finally {
      actions.setSubmitting(false)
    }
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema,
    onSubmit: submitForm
  })

  return <>
    <Button onClick={() => setShow(true)}>apply for this mentor</Button>
    <Modal show={show} onClose={() => setShow(false)} closeOnEsc closeOnBlur>
      <Modal.Content>
        <Box>
          <Heading className="box__heading" size="small">Application to {mentor.firstName} {mentor.lastName}</Heading>
          {/* <ApplyForMentor mentor={profile} /> */}

          <form>
            {submitResult === 'success' && (
              <Paper>Your application was successfully submitted.</Paper>
            )}
            {submitResult !== 'success' && (
              <>
                <Caption>Motivation </Caption>
                <Content>
                  <p>Write an application to the Steve Williams in which you describe why you think he would be a good mentor for you.</p>
                </Content>
                <FormTextArea
                  name="applicationText"
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

                <Columns>
                  <Columns.Column>
                    <FormCheckbox
                      name="dataSharingAccepted"
                      checked={formik.values.dataSharingAccepted}
                      {...formik}
                    >
                I understand that my profile data will be shared with this mentor
                    </FormCheckbox></Columns.Column>
                  <Columns.Column textAlignment="right">
                    <Button
                      onClick={() => formik.handleSubmit()}
                      disabled={!(formik.dirty && formik.isValid)}
                    >Apply</Button>
                  </Columns.Column>
                </Columns>
              </>
            )}
          </form>

        </Box>
      </Modal.Content>
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
