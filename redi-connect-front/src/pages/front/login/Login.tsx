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
import { saveAccessToken, getRedProfile } from '../../../services/auth/auth'
import { Columns, Form, Content, Notification } from 'react-bulma-components'
import { capitalize } from 'lodash'
import Button from '../../../components/atoms/Button'
import { RediLocation } from '../../../types/RediLocation'
import { buildFrontendUrl } from '../../../utils/build-frontend-url'

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

function makeLocationString (location: string) {
  return `${location.charAt(0).toUpperCase()}${location.substr(1)}`
}

export default function Login () {
  const [loginError, setLoginError] = useState<string>('')
  const [isWrongRediLocationError, setIsWrongRediLocationError] = useState<boolean>(false)

  const submitForm = useCallback((values, actions) => {
    (async (values: FormikValues, actions: FormikActions<LoginFormValues>) => {
      const formValues = values as LoginFormValues
      try {
        const accessToken = await login(
          formValues.username,
          formValues.password
        )
        saveAccessToken(accessToken)
        const redProfile = await fetchSaveRedProfile(accessToken)
        if (redProfile.rediLocation !== (process.env.REACT_APP_REDI_LOCATION as RediLocation)) {
          return setIsWrongRediLocationError(true)
        }
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

          {isWrongRediLocationError && (
            <Notification color="info" className="is-light">
              You've tried to log into ReDI Connect <strong>{capitalize((process.env.REACT_APP_REDI_LOCATION as RediLocation))}</strong> your account is linked to ReDI Connect <strong>{capitalize(getRedProfile().rediLocation)}</strong>.
              To access ReDI Connect <strong>{capitalize(getRedProfile().rediLocation)}</strong>, go <a href={buildFrontendUrl(process.env.NODE_ENV, getRedProfile().rediLocation)}>here</a>.
            </Notification>
          )}

          <form onSubmit={e => e.preventDefault()}>
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
