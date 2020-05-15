import React, { useState, useCallback } from 'react'
import AccountOperation from '../../../components/templates/AccountOperation'
import Teaser from '../../../components/molecules/Teaser'
import FormInput from '../../../components/atoms/FormInput'
import Heading from '../../../components/atoms/Heading'
import * as Yup from 'yup'
import { Link } from 'react-router-dom'
import {
  FormikHelpers as FormikActions,
  FormikValues,
  useFormik
} from 'formik'
import { history } from '../../../services/history/history'
import { login, fetchSaveRedProfile } from '../../../services/api/api'
import { saveAccessToken } from '../../../services/auth/auth'
import { Columns, Form, Content } from 'react-bulma-components'
import Button from '../../../components/atoms/Button'

interface LoginFormValues {
  username: string
  password: string
}

const initialValues: LoginFormValues = {
  username: '',
  password: ''
}

const validationSchema = Yup.object({
  username: Yup.string()
    .email()
    .required()
    .label('Email')
    .max(255),
  password: Yup.string()
    .required()
    .label('Password')
    .max(255)
})

export default function Login () {
  const [loginError, setLoginError] = useState<string>('')

  const submitForm = useCallback((values, actions) => {
    (async (values: FormikValues, actions: FormikActions<LoginFormValues>) => {
      const formValues = values as LoginFormValues
      try {
        const accessToken = await login(
          formValues.username,
          formValues.password
        )
        saveAccessToken(accessToken)
        await fetchSaveRedProfile(accessToken)
        actions.setSubmitting(false)
        history.push('/app/me')
      } catch (err) {
        actions.setSubmitting(false)
        setLoginError('You entered an incorrect email, password, or both.')
      }
    })(values, actions)
  }, [])

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: submitForm
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
          <Heading border="bottomLeft">Sign-in</Heading>
          <Content size="large" renderAs="p">
            Enter your email and password below.
          </Content>
          <form onSubmit={e => e.preventDefault()} className="form login__form">
            <FormInput
              name="username"
              type="email"
              placeholder="Email"
              {...formik}
            />

            <FormInput
              name="password"
              type="password"
              placeholder="Password"
              {...formik}
            />

            <Form.Field>
              <Form.Help color="danger" className={loginError ? 'help--show' : ''}>{loginError && loginError}</Form.Help>
            </Form.Field>

            <Form.Field
              className="submit-link submit-link--pre"
              textTransform="uppercase"
            >
              <Link to="/front/reset-password/request-reset-password-email">
                Forgot your password?
              </Link>
            </Form.Field>

            <Form.Field className="submit-spacer">
              <Button
                fullWidth
                onClick={formik.submitForm}
                disabled={!(formik.dirty && formik.isValid)}
              >
                Log in
              </Button>
            </Form.Field>
          </form>
        </Columns.Column>
      </Columns>
    </AccountOperation>
  )
}
