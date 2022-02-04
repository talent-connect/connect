import { FC, useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router'
import { Link } from 'react-router-dom'
import {
  Button,
  TextInput,
  Heading,
} from '@talent-connect/shared-atomic-design-components'
import { Columns, Content, Form } from 'react-bulma-components'
import AccountOperation from '../../../components/templates/AccountOperation'
import { saveAccessTokenToLocalStorage } from '../../../services/auth/auth'
import { componentForm } from './SetNewPassword.form';

interface RouteParams {
  accessToken: string
}

export const SetNewPassword: FC<RouteComponentProps<RouteParams>> = ({
  match: { params: { accessToken } }
}) => {
  const [formError, setFormError] = useState<string>('')
  const [errorMsg, setErrorMsg] = useState<string>('')

  useEffect(() => {
    (async () => {
      const accessTokenStr = decodeURIComponent(accessToken)
      try {
        const accessToken = JSON.parse(accessTokenStr)
        saveAccessTokenToLocalStorage(accessToken)
        console.log('savetoken')
      } catch (err) {
        console.log('savetoken errp')
        return setErrorMsg('Sorry, there seems to have been an error. Please try to reset your password again, or contact career@redi-school.org for assistance.')
      }
    })()
  }, [accessToken])

  const formik = componentForm({ setFormError });

  return (
    <AccountOperation>
      <Columns vCentered>
        <Columns.Column
          size={6}
          responsive={{ mobile: { hide: { value: true } } }}
        ></Columns.Column>
        <Columns.Column size={5} offset={1}>
          <Heading border="bottomLeft">Enter your new password</Heading>
          <Content size="large" renderAs="p">
            Please make sure that your new password has more than{' '}
            <strong>8 characters</strong>.
          </Content>

          {formError && { formError }}
          <form onSubmit={(e) => e.preventDefault()}>
            <TextInput
              name="password"
              type="password"
              placeholder="Password"
              {...formik}
            />

            <TextInput
              name="passwordConfirm"
              type="password"
              placeholder="Repeat password"
              {...formik}
            />

            {errorMsg && (
              <div>
                <p>{errorMsg}</p>
                <p>
                  You can also go here{' '}
                  <a href="/front/login">to log in if you have a user.</a>
                </p>
              </div>
            )}

            <Form.Field>
              <Button
                fullWidth
                onClick={formik.submitForm}
                disabled={!(formik.dirty && formik.isValid)}
              >
                Set your new password
              </Button>
            </Form.Field>

            <Form.Field
              className="submit-link submit-link--post"
              textTransform="uppercase"
            >
              <Link to="/front/login">Back to log in</Link>
            </Form.Field>
          </form>
        </Columns.Column>
      </Columns>
    </AccountOperation>
  )
}
export default SetNewPassword
