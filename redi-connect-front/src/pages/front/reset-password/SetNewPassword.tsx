import React, { useState, useEffect } from 'react'
import AccountOperation from '../../../components/templates/AccountOperation'
import Teaser from '../../../components/molecules/Teaser'
import { Columns, Heading, Form } from 'react-bulma-components'
import Button from '../../../components/atoms/Button'

import FormInput from '../../../components/atoms/FormInput'
import { Link } from 'react-router-dom'

import * as Yup from 'yup'

import {
  FormikHelpers as FormikActions,
  FormikValues,
  useFormik
} from 'formik'
import { history } from '../../../services/history/history'
import {
  setPassword,
  fetchSaveRedProfile
} from '../../../services/api/api'
import { saveAccessToken } from '../../../services/auth/auth'
import { RouteComponentProps } from 'react-router'
import { showNotification } from '../../../components/AppNotification'

interface SetNewPasswordValues {
  password: string
  passwordConfirm: string
}

const initialValues: SetNewPasswordValues = {
  password: '',
  passwordConfirm: ''
}

const validationSchema = Yup.object({
  password: Yup.string()
    .min(8, 'Password must contain at least 8 characters')
    .required('Enter your password')
    .label('Password'),
  passwordConfirm: Yup.string()
    .required('Confirm your password')
    .oneOf([Yup.ref('password')], 'Password does not match')
})

interface RouteParams {
  accessToken: string
}

export const SetNewPassword = (props: RouteComponentProps<RouteParams>) => {
  const [formError, setFormError] = useState<string>('')
  const [errorMsg, setErrorMsg] = useState<string>('')

  useEffect(() => {
    const load = async () => {
      const accessTokenStr = decodeURIComponent(props.match.params.accessToken)
      let accessToken
      try {
        accessToken = JSON.parse(accessTokenStr)
        saveAccessToken(accessToken)
        console.log('savetoken')
      } catch (err) {
        console.log('savetoken errp')
        return setErrorMsg(
          'Sorry, there seems to have been an error. Please try to reset your password again, or contact career@redi-school.org for assistance.'
        )
      }
      try {
        await fetchSaveRedProfile(accessToken)
        console.log('saveprofile')
      } catch (err) {
        console.log('saveprofile error')

        return setErrorMsg(
          'Sorry, the link you used seems to have expired. Please contact career@redi-school.org to receive a new one.'
        )
      }
    }
    load()
  }, [props.match.params.accessToken])

  const submitForm = async (
    values: FormikValues,
    actions: FormikActions<SetNewPasswordValues>
  ) => {
    try {
      await setPassword(values.password)
      showNotification('Your new password is set and you\'re logged in :)', {
        variant: 'success',
        autoHideDuration: 8000
      })
      history.push('/app/dashboard')
    } catch (err) {
      setFormError('Invalid username or password')
    }
    actions.setSubmitting(false)
  }

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
                Enter your new password
          </Heading>
          <Heading size={4} renderAs="p" subtitle>
                Please make sure that your new password has more than 8 characters.
          </Heading>

          {formError && (
            { formError }
          )}
          <form onSubmit={e => e.preventDefault()}>
            <FormInput
              name="password"
              type="password"
              placeholder="Password"
              {...formik}
            />

            <FormInput
              name="passwordConfirm"
              type="password"
              placeholder="Repeat rassword"
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

            <Form.Field className="submit-spacer">
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
export default SetNewPassword
