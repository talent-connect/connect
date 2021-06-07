import {
  Button,
  Checkbox,
  FormInput,
  FormSelect,
  Heading,
} from '@talent-connect/shared-atomic-design-components'
import { courses, rediLocationNames } from '@talent-connect/shared-config'
import { RedProfile } from '@talent-connect/shared-types'
import { FormikHelpers as FormikActions, FormikValues, useFormik } from 'formik'
import omit from 'lodash/omit'
import React, { useState } from 'react'
import { Columns, Form, Notification } from 'react-bulma-components'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'
import TpTeaser from '../../../components/molecules/TpTeaser'
import AccountOperation from '../../../components/templates/AccountOperation'
import { signUp } from '../../../services/api/api'
import { history } from '../../../services/history/history'

// TODO: replace with proper dropdown
const coursesWithAlumniDeduped = courses.filter((c) => {
  if (!c.id.includes('alumni')) return true
  if (c.location !== 'berlin') return false
  else return true
})

const formCourses = coursesWithAlumniDeduped.map((course) => {
  const label =
    course.id === 'alumni'
      ? course.label
      : `(ReDI ${rediLocationNames[course.location]}) ${course.label}`
  return {
    value: course.id,
    label: label,
  }
})

export const validationSchema = Yup.object({
  firstName: Yup.string().required('Your first name is invalid').max(255),
  lastName: Yup.string().required('Your last name is invalid').max(255),
  contactEmail: Yup.string()
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
  currentlyEnrolledInCourse: Yup.string().when('state', {
    is: 'drafting-profile',
    then: Yup.string()
      .required()
      .oneOf(courses.map((level) => level.id))
      .label('Currently enrolled in course'),
  }),
})

type SignUpPageType = {
  type: 'jobseeker' | 'company'
}

export interface SignUpFormValues {
  // TODO: Make this into an enum/type in shared confif/types
  state: string
  contactEmail: string
  password: string
  passwordConfirm: string
  firstName: string
  lastName: string
  agreesWithCodeOfConduct: boolean
  jobseeker_currentlyEnrolledInCourse: string
}

export default function SignUp() {
  const { type } = useParams<SignUpPageType>()

  const initialValues: SignUpFormValues = {
    state: 'drafting-profile',
    contactEmail: '',
    password: '',
    passwordConfirm: '',
    firstName: '',
    lastName: '',
    agreesWithCodeOfConduct: false,
    jobseeker_currentlyEnrolledInCourse: '',
  }

  const [submitError, setSubmitError] = useState(null)
  const submitForm = async (
    values: FormikValues,
    actions: FormikActions<SignUpFormValues>
  ) => {
    setSubmitError(null)
    const profile = values as Partial<RedProfile>
    // TODO: this needs to be done in a smarter way, like iterating over the RedProfile definition or something
    const cleanProfile: Partial<RedProfile> = omit(profile, [
      'password',
      'passwordConfirm',
      'agreesWithCodeOfConduct',
      'gaveGdprConsent',
    ])
    try {
      await signUp(values.contactEmail, values.password, cleanProfile)
      actions.setSubmitting(false)
      history.push(`/front/signup-email-verification`)
    } catch (error) {
      actions.setSubmitting(false)
      if (
        error?.response?.data?.error?.details?.codes?.email.includes(
          'uniqueness'
        )
      ) {
        return setSubmitError('user-already-exists')
      }
      return setSubmitError('generic')
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
          <TpTeaser.SignUp />
        </Columns.Column>

        <Columns.Column size={5} offset={1}>
          <Heading border="bottomLeft">Sign-up</Heading>
          {submitError === 'user-already-exists' && (
            <Notification color="info" className="is-light">
              You already have an account. Please{' '}
              <Link to="/front/login">log in</Link>.
            </Notification>
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

            {type === 'jobseeker' && (
              <FormSelect
                label="Current ReDI Course"
                name="currentlyEnrolledInCourse"
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
                href="https://connect.berlin.redi-school.org/downloadeables/redi-connect-code-of-conduct.pdf"
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
              {submitError === 'generic' &&
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
