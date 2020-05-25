import React from 'react'
import AccountOperation from '../../../components/templates/AccountOperation'
import Heading from '../../../components/atoms/Heading'
import { Columns, Content, Form } from 'react-bulma-components'
import Teaser from '../../../components/molecules/Teaser'
import FormInput from '../../../components/atoms/FormInput'
import Button from '../../../components/atoms/Button'

import {
  FormikValues,
  useFormik
} from 'formik'

import * as yup from 'yup'
import { Link } from 'react-router-dom'
import {
  showNotification
} from '../../../components/AppNotification'
import { requestResetPasswordEmail } from '../../../services/api/api'

interface FormValues {
  email: string
}

const initialValues: FormValues = {
  email: ''
}

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('That doesn’t look quite right... please provide a valid email.')
    .required('Please provide an email address.')
})

export const RequestResetPasswordEmail = (props: any) => {
  const onSubmit = async (values: FormikValues) => {
    try {
      // Cast to string is safe as this only called if validated
      await requestResetPasswordEmail(values.email as string)
      onServerRequestSuccess()
    } catch (err) {
      onServerRequestError()
    }
  }

  const onServerRequestSuccess = () => {
    showNotification(
      'All good! Please check your email to set a new password :)',
      {
        variant: 'success',
        autoHideDuration: 6000
      }
    )
  }

  const onServerRequestError = () => {
    showNotification(
      'Oh no, something went wrong :( Did you type your email address correctly?',
      { variant: 'error' }
    )
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit: onSubmit
  })

  return (
    <AccountOperation>
      <Columns vCentered>
        <Columns.Column
          size={6}
          responsive={{ mobile: { hide: { value: true } } }}
        >
          <Teaser.SignUp />
        </Columns.Column>
        <Columns.Column size={5} offset={1}>
          <Heading border="bottomLeft">Forgot your password?</Heading>
          <Content size="large" renderAs="p">
            We’ll help you reset it and get back on track. We will send a recovery link to:
          </Content>
          <form onSubmit={e => e.preventDefault()} noValidate>
            <FormInput
              name="email"
              type="email"
              placeholder="Email"
              {...formik}
            />
            <Form.Field className="submit-spacer">
              <Button
                fullWidth
                onClick={formik.submitForm}
                disabled={!(formik.dirty && formik.isValid)}
              >
                Reset Password
              </Button>
            </Form.Field>

            <Form.Field
              className="submit-link submit-link--post"
              textTransform="uppercase"
            >
              <Link to="/front/login">
                Back to log in
              </Link>
            </Form.Field>
          </form>
        </Columns.Column>
      </Columns>
    </AccountOperation>
  )
}
