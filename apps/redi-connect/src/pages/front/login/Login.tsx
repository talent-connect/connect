import React, { useState, useCallback } from 'react'
import AccountOperation from '../../../components/templates/AccountOperation'
import Teaser from '../../../components/molecules/Teaser'
import * as Yup from 'yup'
import { Link, Redirect, useHistory } from 'react-router-dom'
import { FormikHelpers as FormikActions, FormikValues, useFormik } from 'formik'
import { login } from '../../../services/api/api'
import {
  saveAccessTokenToLocalStorage,
  purgeAllSessionData,
  setGraphQlClientAuthHeader,
  getAccessTokenFromLocalStorage,
} from '../../../services/auth/auth'
import { Columns, Form, Content, Notification } from 'react-bulma-components'
import { capitalize } from 'lodash'
import { RediLocation } from '@talent-connect/shared-types'
import { buildFrontendUrl } from '@talent-connect/shared-utils'
import { REDI_LOCATION_NAMES } from '@talent-connect/shared-config'
import {
  Button,
  FormInput,
  Heading,
} from '@talent-connect/shared-atomic-design-components'
import { useLoadMyProfileQuery } from '@talent-connect/data-access'
import { envRediLocation } from '../../../utils/env-redi-location'

interface LoginFormValues {
  username: string
  password: string
}

const initialValues: LoginFormValues = {
  username: '',
  password: '',
}

const validationSchema = Yup.object({
  username: Yup.string().email().required().label('Email').max(255),
  password: Yup.string().required().label('Password').max(255),
})

export default function Login() {
  const history = useHistory()
  const accessToken = getAccessTokenFromLocalStorage()
  const loopbackUserId = accessToken?.userId ?? ''
  const [stateLoopbackUserId, setStateLoopbackUserId] = useState(loopbackUserId)
  const myProfileQuery = useLoadMyProfileQuery(
    { loopbackUserId: stateLoopbackUserId },
    { enabled: Boolean(stateLoopbackUserId) }
  )

  const [loginError, setLoginError] = useState<string>('')

  const isWrongRediLocationError =
    myProfileQuery.isSuccess &&
    myProfileQuery.data.conProfile.rediLocation !== envRediLocation()

  if (isWrongRediLocationError) {
    purgeAllSessionData()
  }

  const submitForm = async () => {
    try {
      const accessToken = await login(
        formik.values.username,
        formik.values.password
      )
      setStateLoopbackUserId(accessToken.userId)
      formik.setSubmitting(false)
      history.push('/app/me')
    } catch (err) {
      formik.setSubmitting(false)
      setLoginError('You entered an incorrect email, password, or both.')
    }
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: submitForm,
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
          <Heading border="bottomLeft">Login</Heading>
          <Content size="large" renderAs="p">
            Enter your email and password below.
          </Content>
          <Content size="small" renderAs="p">
            Got a ReDI Talent Pool user account? You can use the same username
            and password here.
          </Content>

          {isWrongRediLocationError && (
            <Notification color="info" className="is-light">
              You've tried to log into ReDI Connect{' '}
              <strong>
                {
                  REDI_LOCATION_NAMES[
                    process.env.NX_REDI_CONNECT_REDI_LOCATION as RediLocation
                  ]
                }
              </strong>
              , but your account is linked to ReDI Connect{' '}
              <strong>
                {capitalize(myProfileQuery.data.conProfile.rediLocation)}
              </strong>
              . To access ReDI Connect{' '}
              <strong>{myProfileQuery.data.conProfile.rediLocation}</strong>, go{' '}
              <a
                href={buildFrontendUrl(
                  process.env.NODE_ENV,
                  myProfileQuery.data.conProfile.rediLocation
                )}
              >
                here
              </a>
              .
            </Notification>
          )}

          <form onSubmit={(e) => e.preventDefault()}>
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
              <Form.Help
                color="danger"
                className={loginError ? 'help--show' : ''}
              >
                {loginError && loginError}
              </Form.Help>
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
