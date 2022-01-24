import {
  Button,
  TextInput,
  Heading,
} from '@talent-connect/shared-atomic-design-components'
import { useFormik } from 'formik'
import { FC, useState } from 'react'
import { Columns, Content, Element, Form } from 'react-bulma-components'
import { Link } from 'react-router-dom'
import * as yup from 'yup'
import TpTeaser from '../../../components/molecules/TpTeaser'
import { AccountOperation } from '../../../components/templates'
import { requestResetPasswordEmail } from '../../../services/api/api'

interface FormValues {
  email: string
}

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('That doesn’t look quite right... please provide a valid email.')
    .required('Please provide an email address.'),
})

export const RequestResetPasswordEmail: FC = () => {
  const [resetPasswordSuccess, setResetPasswordSuccess] = useState<string>('')
  const [resetPasswordError, setResetPasswordError] = useState<string>('')

  const formik = useFormik<FormValues>({
    initialValues: {
      email: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        // Cast to string is safe as this only called if validated
        await requestResetPasswordEmail(values.email as string)
        setResetPasswordSuccess('If you have an account,we have sent you the password reset link to your email address.')
      } catch (err) {
        setResetPasswordError('Oh no, something went wrong :( Did you type your email address correctly?')
      }
    },
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
