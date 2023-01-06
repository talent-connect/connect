import React, { useState } from 'react'
import AccountOperation from '../../../components/templates/AccountOperation'
import { useParams } from 'react-router'
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

import { signUp } from '../../../services/api/api'
import { Extends, RedProfile } from '@talent-connect/shared-types'
import { toPascalCaseAndTrim } from '@talent-connect/shared-utils'
import { history } from '../../../services/history/history'
import { courses } from '../../../config/config'

const formCourses = courses.map((course) => ({
  value: course.id,
  label: course.label,
}))

export const validationSchema = Yup.object({
  firstName: Yup.string()
    .transform(toPascalCaseAndTrim)
    .required('Your first name is required')
    .max(255),
  lastName: Yup.string()
    .transform(toPascalCaseAndTrim)
    .required('Your last name is required')
    .max(255),
  contactEmail: Yup.string()
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
  mentee_currentlyEnrolledInCourse: Yup.string().when('userType', {
    is: 'public-sign-up-mentee-pending-review',
    then: Yup.string()
      .required('Please select current ReDI course')
      .oneOf(courses.map((level) => level.id))
      .label('Currently enrolled in course'),
  }),
})

type SignUpPageType = {
  type: 'mentor' | 'mentee'
}

type SignUpUserType = Extends<
  RedProfile['userType'],
  | 'public-sign-up-mentee-pending-review'
  | 'public-sign-up-mentor-pending-review'
>

export interface SignUpFormValues {
  userType: SignUpUserType
  gaveGdprConsent: boolean
  contactEmail: string
  password: string
  passwordConfirm: string
  firstName: string
  lastName: string
  agreesWithCodeOfConduct: boolean
  mentee_currentlyEnrolledInCourse: string
}

export default function SignUp() {
  const { type } = useParams<SignUpPageType>()

  // we may consider removing the backend types from frontend
  const userType: SignUpUserType =
    type === 'mentee'
      ? 'public-sign-up-mentee-pending-review'
      : 'public-sign-up-mentor-pending-review'

  const initialValues: SignUpFormValues = {
    userType,
    gaveGdprConsent: false,
    contactEmail: '',
    password: '',
    passwordConfirm: '',
    firstName: '',
    lastName: '',
    agreesWithCodeOfConduct: false,
    mentee_currentlyEnrolledInCourse: '',
  }

  const [submitError, setSubmitError] = useState(false)
  const submitForm = async (
    values: FormikValues,
    actions: FormikActions<SignUpFormValues>
  ) => {
    setSubmitError(false)
    const transformedValues = validationSchema.cast(values)
    const profile = transformedValues as Partial<RedProfile>
    // const profile = values as Partial<RedProfile>
    // TODO: this needs to be done in a smarter way, like iterating over the RedProfile definition or something
    const cleanProfile: Partial<RedProfile> = omit(profile, [
      'password',
      'passwordConfirm',
      'agreesWithCodeOfConduct',
      'gaveGdprConsent',
    ])
    cleanProfile.userActivated = false
    cleanProfile.signupSource = 'public-sign-up'
    cleanProfile.menteeCountCapacity = 1
    try {
      await signUp(values.contactEmail, values.password, cleanProfile)
      actions.setSubmitting(false)
      history.push(`/front/signup-email-verification/${cleanProfile.userType}`)
    } catch (error) {
      actions.setSubmitting(false)
      setSubmitError(Boolean(error))
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
              name="contactEmail"
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
              className={submitError ? 'help--show' : ''}
            >
              {submitError && 'An error occurred, please try again.'}
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
