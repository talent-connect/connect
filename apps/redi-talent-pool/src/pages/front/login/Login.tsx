import {
  Button,
  TextInput,
  Heading,
} from '@talent-connect/shared-atomic-design-components'
import { useFormik } from 'formik'
import { FC, useCallback, useState } from 'react'
import { Columns, Content, Form } from 'react-bulma-components'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'
import TpTeaser from '../../../components/molecules/TpTeaser'
import AccountOperation from '../../../components/templates/AccountOperation'
import { login } from '../../../services/api/api'
import { saveAccessTokenToLocalStorage } from '../../../services/auth/auth'
import { history } from '../../../services/history/history'

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

const Login: FC = () => {
  const [loginError, setLoginError] = useState<string>('')

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
          <TpTeaser.SignIn />
        </Columns.Column>

        <Columns.Column size={5} offset={1}>
          <Heading border="bottomLeft">Login</Heading>
          <Content size="large" renderAs="p">
            Enter your email and password below.
          </Content>

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