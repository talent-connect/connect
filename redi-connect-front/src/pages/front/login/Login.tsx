import React, { useState, useCallback } from 'react'
import AccountOperation from '../../../components/templates/AccountOperation'
import Teaser from '../../../components/molecules/Teaser'
import FormInput from '../../../components/atoms/FormInput'
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

import './Login.scss'
import { Columns, Form, Heading } from 'react-bulma-components'
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
        history.push('/app/dashboard')
      } catch (err) {
        actions.setSubmitting(false)
        setLoginError('You entered an incorrect email, password, or both.')
      }
    })(values, actions)
  }, [])

  const formik = useFormik({
    initialValues: initialValues,
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
          <Heading
            size={1}
            responsive={{ mobile: { textSize: { value: 2 } } } }
            weight="normal"
            renderAs="h1"
            className="title--border"
            spaced={true}
          >
            Sign-in
          </Heading>
          <Heading size={4} renderAs="p" subtitle>
            Enter your email and password below.
          </Heading>
          <form onSubmit={e => e.preventDefault()} className="form login__form">
            <FormInput
              name="username"
              type="email"
              value={formik.values.username}
              placeholder="Email"
              setFieldTouched={formik.setFieldTouched}
              handleChange={formik.handleChange}
              isSubmitting={formik.isSubmitting}
              hasError={!!formik.touched.username && !!formik.errors.username}
            />

            <FormInput
              name="password"
              type="password"
              value={formik.values.password}
              placeholder="Password"
              setFieldTouched={formik.setFieldTouched}
              handleChange={formik.handleChange}
              isSubmitting={formik.isSubmitting}
              hasError={!!formik.touched.password && !!formik.errors.password}
            />

            <Form.Field>
              {loginError && <Form.Help color="danger">{loginError}</Form.Help>}
            </Form.Field>

            <Form.Field
              className="login-form__reset-password"
              textTransform="uppercase"
            >
              <Link to="/front/reset-password/request-reset-password-email">
                Forgot your password?
              </Link>
            </Form.Field>

            <Form.Field className="submit-spacer">
              <Button
                fullWidth
                size="large"
                text="log in"
                onButtonPress={formik.submitForm}
                disabled={!(formik.dirty && formik.isValid)}
              />
            </Form.Field>
          </form>
        </Columns.Column>
      </Columns>
    </AccountOperation>
  )
}
