import React, { useState } from 'react'
import AccountOperation from '../../../components/templates/AccountOperation'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

import * as Yup from 'yup'

import { FormikValues, FormikHelpers as FormikActions, useFormik } from 'formik'
import omit from 'lodash/omit'
import {
  Button,
  Checkbox,
  FormInput,
  FormSelect,
  Heading,
} from '@talent-connect/shared-atomic-design-components'

import Teaser from '../../../components/molecules/Teaser'

import { Columns, Content, Form } from 'react-bulma-components'

import { signUpLoopback } from '../../../services/api/api'
import { RedProfile } from '@talent-connect/shared-types'
import { history } from '../../../services/history/history'
import { courses } from '../../../config/config'
import { Extends } from '@talent-connect/typescript-utilities'
import {
  RediLocation,
  useConProfileSignUpMutation,
  UserType,
} from '@talent-connect/data-access'
import { envRediLocation } from '../../../utils/env-redi-location'

const formCourses = courses.map((course) => ({
  value: course.id,
  label: course.label,
}))

export const validationSchema = Yup.object({
  firstName: Yup.string().required('Your first name is invalid').max(255),
  lastName: Yup.string().required('Your last name is invalid').max(255),
  email: Yup.string()
    .email('Your email is invalid')
    .required('You need to give an email address')
    .label('Email')
    .max(255),
  password: Yup.string()
    .min(8, 'The password has to consist of at least eight characters')
    .required('You need to set a password')
    .label('Password'),
  passwordConfirm: Yup.string()
    .required('Confirm your password')
    .oneOf([Yup.ref('password')], 'Passwords does not match'),
  agreesWithCodeOfConduct: Yup.boolean().required().oneOf([true]),
  gaveGdprConsent: Yup.boolean().required().oneOf([true]),
  mentee_currentlyEnrolledInCourse: Yup.string().when('userType', {
    is: 'public-sign-up-mentee-pending-review',
    then: Yup.string()
      .required()
      .oneOf(courses.map((level) => level.id))
      .label('Currently enrolled in course'),
  }),
})

type SignUpPageType = {
  type: 'mentor' | 'mentee'
}

export interface SignUpFormValues {
  userType: UserType
  gaveGdprConsent: boolean
  email: string
  password: string
  passwordConfirm: string
  firstName: string
  lastName: string
  agreesWithCodeOfConduct: boolean
  mentee_currentlyEnrolledInCourse: string
}

export default function SignUp() {
  const signUpMutation = useConProfileSignUpMutation()
  const { type } = useParams<SignUpPageType>()

  const initialValues: SignUpFormValues = {
    userType: type.toUpperCase() as UserType,
    gaveGdprConsent: false,
    email: '',
    password: '',
    passwordConfirm: '',
    firstName: '',
    lastName: '',
    agreesWithCodeOfConduct: false,
    mentee_currentlyEnrolledInCourse: '',
  }

  const [loopbackSubmitError, setLoopbackSubmitError] = useState(false)
  const submitForm = async (
    values: FormikValues,
    actions: FormikActions<SignUpFormValues>
  ) => {
    setLoopbackSubmitError(false)
    try {
      await signUpLoopback(values.email, values.password)
      await signUpMutation.mutateAsync({
        input: {
          email: values.email,
          firstName: values.firstName,
          lastName: values.lastName,
          userType: type.toUpperCase() as UserType,
          rediLocation: envRediLocation() as RediLocation,
        },
      })
      actions.setSubmitting(false)
      history.push(`/front/signup-complete/${type}`)
    } catch (error) {
      actions.setSubmitting(false)
      setLoopbackSubmitError(Boolean(error))
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

            {type === 'mentee' && (
              <FormSelect
                label="Current ReDI Course"
                name="mentee_currentlyEnrolledInCourse"
                placeholder="Choose your ReDI Course"
                items={formCourses}
                {...formik}
              />
            )}

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
            <Form.Help
              color="danger"
              className={
                loopbackSubmitError || signUpMutation.isError
                  ? 'help--show'
                  : ''
              }
            >
              {(loopbackSubmitError || signUpMutation.isError) &&
                'An error occurred, please try again.'}
            </Form.Help>
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
