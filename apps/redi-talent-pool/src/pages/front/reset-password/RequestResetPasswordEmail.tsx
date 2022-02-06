import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Button,
  TextInput,
  Heading,
} from '@talent-connect/shared-atomic-design-components'
import { Columns, Content, Element, Form } from 'react-bulma-components'
import TpTeaser from '../../../components/molecules/TpTeaser'
import { AccountOperation } from '../../../components/templates'
import { componentForm } from './RequestResetPasswordEmail.form';

export function RequestResetPasswordEmail() {
  const [resetPasswordSuccess, setResetPasswordSuccess] = useState<string>('')
  const [resetPasswordError, setResetPasswordError] = useState<string>('')

  const formik = componentForm({
    setResetPasswordError,
    setResetPasswordSuccess
  })

  const heading = resetPasswordSuccess
    ? 'Password reset link sent!'
    : 'Forgot your password?'

  const text = resetPasswordSuccess
    ? 'If you have an account,we have sent you the  password reset link to your email address.'
    : 'We’ll help you reset it and get back on track. We will send a recovery link to:'

  return (
    <AccountOperation>
      <Columns vCentered>
        <Columns.Column
          size={6}
          responsive={{ mobile: { hide: { value: true } } }}
        >
          <TpTeaser.SignUp />
        </Columns.Column>
        <Columns.Column size={5} offset={1}>
          <Heading border="bottomLeft">{heading}</Heading>
          <Content size="large" renderAs="p">
            {text}
          </Content>

          {!resetPasswordSuccess && (
            <form onSubmit={(e) => e.preventDefault()}>
              <TextInput
                name="email"
                type="email"
                placeholder="Email"
                {...formik}
              />
              <Form.Field>
                <Form.Help
                  color="danger"
                  className={resetPasswordError ? 'help--show' : ''}
                >
                  {resetPasswordError && resetPasswordError}
                </Form.Help>
              </Form.Field>
              <Form.Field>
                <Button
                  fullWidth
                  onClick={formik.submitForm}
                  disabled={!(formik.dirty && formik.isValid)}
                >
                  Reset Password
                </Button>
              </Form.Field>
            </form>
          )}
          <Element
            className={`submit-link ${!resetPasswordSuccess && 'submit-link--post'}`}
            textTransform="uppercase"
          >
            <Link to="/front/login">Back to log in</Link>
          </Element>
        </Columns.Column>
      </Columns>
    </AccountOperation>
  )
}
