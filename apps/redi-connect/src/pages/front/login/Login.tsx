import { FC, useState, useCallback } from 'react'
import AccountOperation from '../../../components/templates/AccountOperation'
import Teaser from '../../../components/molecules/Teaser'
import * as Yup from 'yup'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import { history } from '../../../services/history/history'
import { login, fetchSaveRedProfile } from '../../../services/api/api'
import {
  saveAccessTokenToLocalStorage,
  getRedProfileFromLocalStorage,
  purgeAllSessionData,
} from '../../../services/auth/auth'
import { Columns, Form, Content, Notification } from 'react-bulma-components'
import { capitalize } from 'lodash'
import { RediLocation } from '@talent-connect/shared-types'
import { buildFrontendUrl } from '../../../utils/build-frontend-url'
import { REDI_LOCATION_NAMES } from '@talent-connect/shared-config'
import {
  Button,
  TextInput,
  Heading,
} from '@talent-connect/shared-atomic-design-components'

interface LoginFormValues {
  username: string
  password: string
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
    .max(255),
})

function Login() {
  const [loginError, setLoginError] = useState<string>('')
  const [isWrongRediLocationError, setIsWrongRediLocationError] =
    useState<boolean>(false)

  const formik = useFormik<LoginFormValues>({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: useCallback(({ username, password }, actions) => {
      (async () => {
        try {
          const accessToken = await login(username, password)
          saveAccessTokenToLocalStorage(accessToken)
          const { rediLocation } = await fetchSaveRedProfile(accessToken)
          if (rediLocation !== (process.env.NX_REDI_CONNECT_REDI_LOCATION as RediLocation)) {
            setIsWrongRediLocationError(true)
            purgeAllSessionData()
            return
          }
          actions.setSubmitting(false)
          history.push('/app/me')
        } catch (err) {
          actions.setSubmitting(false)
          setLoginError('You entered an incorrect email, password, or both.')
        }
      })()
    }, []),
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
                  REDI_LOCATION_NAMES[process.env.NX_REDI_CONNECT_REDI_LOCATION as RediLocation]
                }
              </strong>
              , but your account is linked to ReDI Connect{' '}
              <strong>
                {capitalize(getRedProfileFromLocalStorage().rediLocation)}
              </strong>
              . To access ReDI Connect{' '}
              <strong>
                {capitalize(getRedProfileFromLocalStorage().rediLocation)}
              </strong>
              , go{' '}
              <a
                href={buildFrontendUrl(
                  process.env.NODE_ENV,
                  getRedProfileFromLocalStorage().rediLocation
                )}
              >
                here
              </a>
              .
            </Notification>
          )}

          <form onSubmit={(e) => e.preventDefault()}>
            <TextInput
              name="username"
              type="email"
              placeholder="Email"
              {...formik}
            />

            <TextInput
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

export default Login