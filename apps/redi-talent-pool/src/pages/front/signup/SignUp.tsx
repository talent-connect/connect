import React, { useState } from 'react'
import AccountOperation from '../../../components/templates/AccountOperation'
import { useParams } from 'react-router'

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

import { Columns, Form } from 'react-bulma-components'

import { signUp } from '../../../services/api/api'
import { Extends, RedProfile } from '@talent-connect/shared-types'
import { history } from '../../../services/history/history'

import { courses, rediLocationNames } from '@talent-connect/shared-config'
import TpTeaser from '../../../components/molecules/TpTeaser'

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
  mentee_currentlyEnrolledInCourse: Yup.string().when('userType', {
    is: 'public-sign-up-mentee-pending-review',
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

  const [submitError, setSubmitError] = useState(false)
  const submitForm = async (
    values: FormikValues,
    actions: FormikActions<SignUpFormValues>
  ) => {
    setSubmitError(false)
    const profile = values as Partial<RedProfile>
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
          <TpTeaser.SignUp />
        </Columns.Column>

        <Columns.Column size={5} offset={1}>
          <Heading border="bottomLeft">Sign-up</Heading>
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
                name="jobseeker_currentlyEnrolledInCourse"
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
