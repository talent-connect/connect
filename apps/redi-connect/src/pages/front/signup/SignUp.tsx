import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import AccountOperation from '../../../components/templates/AccountOperation'

import * as Yup from 'yup'

import {
  Button,
  Checkbox,
  FormInput,
  Heading,
} from '@talent-connect/shared-atomic-design-components'
import { FormikHelpers as FormikActions, FormikValues, useFormik } from 'formik'

import Teaser from '../../../components/molecules/Teaser'

import { Columns, Content, Form, Notification } from 'react-bulma-components'

import {
  RediLocation,
  useConProfileSignUpMutation,
  UserType,
} from '@talent-connect/data-access'
import { toPascalCaseAndTrim } from '@talent-connect/shared-utils'
import { signUpLoopback } from '../../../services/api/api'
import { history } from '../../../services/history/history'
import { envRediLocation } from '../../../utils/env-redi-location'
import { SignUpPageType } from './signup-page.type'

export const validationSchema = Yup.object({
  firstName: Yup.string()
    .transform(toPascalCaseAndTrim)
    .required('Your first name is required')
    .max(255),
  lastName: Yup.string()
    .transform(toPascalCaseAndTrim)
    .required('Your last name is required')
    .max(255),
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Your email is required')
    .label('Email')
    .max(255),
  password: Yup.string()
    .min(8, 'Password must contain at least 8 characters')
    .required('Please set a password')
    .label('Password'),
  passwordConfirm: Yup.string()
    .required('Please confirm your password')
    .oneOf([Yup.ref('password')], 'Passwords do not match'),
  agreesWithCodeOfConduct: Yup.boolean().required().oneOf([true]),
  gaveGdprConsent: Yup.boolean().required().oneOf([true]),
})

export interface SignUpFormValues {
  userType: UserType
  gaveGdprConsent: boolean
  email: string
  password: string
  passwordConfirm: string
  firstName: string
  lastName: string
  agreesWithCodeOfConduct: boolean
}

export default function SignUp() {
  const signUpMutation = useConProfileSignUpMutation()
  const { type } = useParams() as unknown as { type: SignUpPageType }

  const initialValues: SignUpFormValues = {
    userType: type.toUpperCase() as UserType,
    gaveGdprConsent: false,
    email: '',
    password: '',
    passwordConfirm: '',
    firstName: '',
    lastName: '',
    agreesWithCodeOfConduct: false,
  }

  const [loopbackSubmitError, setLoopbackSubmitError] = useState<string | null>(
    null
  )
  const submitForm = async (
    values: FormikValues,
    actions: FormikActions<SignUpFormValues>
  ) => {
    setLoopbackSubmitError(null)
    try {
      await signUpLoopback(values.email, values.password, {
        firstName: values.firstName,
        lastName: values.lastName,
        userType: type.toUpperCase() as UserType,
        rediLocation: envRediLocation() as RediLocation,
      })
      actions.setSubmitting(false)
      history.push(`/front/signup-email-verification`)
    } catch (error) {
      actions.setSubmitting(false)
      if (
        error?.response?.data?.error?.details?.codes?.email.includes(
          'uniqueness'
        )
      ) {
        setLoopbackSubmitError('user-already-exists')
      } else {
        setLoopbackSubmitError('generic')
      }
    }
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
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
          <Teaser.SignIn />
        </Columns.Column>

        <Columns.Column size={5} offset={1}>
          <Heading border="bottomLeft">Sign-up</Heading>
          {type === 'mentee' && (
            <Content size="small" renderAs="p">
              Got a ReDI Talent Pool user account? You can log in with the same
              username and password <Link to="/front/login">here</Link>.
            </Content>
          )}
          {loopbackSubmitError === 'user-already-exists' ? (
            <Notification color="info" className="is-light">
              You already have an account. Please{' '}
              <Link to="/front/login">log in</Link>.
            </Notification>
          ) : null}

          <form onSubmit={(e) => e.preventDefault()} className="form">
            <FormInput
              name="firstName"
              placeholder="Your first name"
              {...formik}
            />

            <FormInput
              name="lastName"
              placeholder="Your last name"
              {...formik}
            />

            <FormInput
              name="email"
              type="email"
              placeholder="Your Email"
              {...formik}
            />

            <FormInput
              name="password"
              type="password"
              placeholder="Your password"
              {...formik}
            />

            <FormInput
              name="passwordConfirm"
              type="password"
              placeholder="Repeat your password"
              {...formik}
            />

            <Checkbox.Form
              name="agreesWithCodeOfConduct"
              checked={formik.values.agreesWithCodeOfConduct}
              className="submit-spacer"
              {...formik}
            >
              I agree to the{' '}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="/assets/downloadeables/redi-connect-code-of-conduct.pdf"
              >
                Code of Conduct
              </a>{' '}
              of ReDI School
            </Checkbox.Form>

            <Checkbox.Form
              name="gaveGdprConsent"
              checked={formik.values.gaveGdprConsent}
              {...formik}
            >
              I give permission to the ReDI School Terms stated in the{' '}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.redi-school.org/data-privacy-policy"
              >
                Data Protection
              </a>
            </Checkbox.Form>
            {loopbackSubmitError !== 'user-already-exists' &&
            (loopbackSubmitError || signUpMutation.isError) ? (
              <Form.Help color="danger" className="help--show">
                An error occurred, please try again.
                {signUpMutation.isError ? 'yes' : 'no'}
              </Form.Help>
            ) : null}

            <Form.Field>
              <Form.Control>
                <Button
                  fullWidth
                  onClick={() => formik.handleSubmit()}
                  disabled={!(formik.dirty && formik.isValid)}
                >
                  submit
                </Button>
              </Form.Control>
            </Form.Field>
          </form>
        </Columns.Column>
      </Columns>
    </AccountOperation>
  )
}
