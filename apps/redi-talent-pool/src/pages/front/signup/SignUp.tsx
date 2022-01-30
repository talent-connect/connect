import { useMemo, useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import omit from 'lodash/omit'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { Columns, Content, Form, Notification } from 'react-bulma-components'

import {
  Button,
  Checkbox,
  TextInput,
  FormSelect,
  Heading,
} from '@talent-connect/shared-atomic-design-components'
import { COURSES, REDI_LOCATION_NAMES } from '@talent-connect/shared-config'

import { howDidHearAboutRediOptions } from '@talent-connect/talent-pool/config'

import TpTeaser from '../../../components/molecules/TpTeaser'
import AccountOperation from '../../../components/templates/AccountOperation'
import { signUpCompany, signUpJobSeeker } from '../../../services/api/api'
import { history } from '../../../services/history/history'
import { mapOptionsObject } from '@talent-connect/typescript-utilities';

// TODO: replace with proper dropdown
const coursesWithAlumniDeduped = [
  ...COURSES.filter((c) => !c.id.includes('alumni')),
  {
    id: 'alumni',
    label: `I'm a ReDI School alumni (I took a course before)`,
    location: 'berlin',
  },
]

const formCourses = coursesWithAlumniDeduped.map(({ id, label, location }) => ({
    value: id,
    label: id === 'alumni'
      ? label
      : `(ReDI ${REDI_LOCATION_NAMES[location]}) ${label}`,
  }))

const howDidHearAboutRediOptionsEntries = mapOptionsObject(howDidHearAboutRediOptions)

function buildValidationSchema(signUpType: SignUpPageType['type']) {
  const baseSchema = {
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
    gaveGdprConsent: Yup.boolean()
      .required()
      .oneOf([true]),
  }

  if (signUpType === 'jobSeeker') {
    return Yup.object({
      ...baseSchema,
      currentlyEnrolledInCourse: Yup.string()
        .required()
        .oneOf(COURSES.map(({ id }) => id))
        .label('Currently enrolled in course'),
      agreesWithCodeOfConduct: Yup.boolean().required().oneOf([true]),
    })
  }

  if (signUpType === 'company') {
    return Yup.object({
      ...baseSchema,
      companyName: Yup.string()
        .required('Your company name is required')
        .max(255),
      howDidHearAboutRediKey: Yup.string().required('This field is required'),
      howDidHearAboutRediOtherText: Yup.string().when(
        'howDidHearAboutRediKey',
        {
          is: (howDidHearAboutRediKey) => howDidHearAboutRediKey === 'other',
          then: Yup.string().required('This field is required'),
        }
      ),
    })
  }
}

type SignUpPageType = {
  type: 'jobSeeker' | 'company'
}

export interface SignUpFormValues {
  // TODO: Make this into an enum/type in shared confif/types
  state?: string
  contactEmail: string
  password: string
  passwordConfirm: string
  companyName?: string
  firstName: string
  lastName: string
  agreesWithCodeOfConduct?: boolean
  jobSeeker_currentlyEnrolledInCourse?: string
}

export default function SignUp() {
  const { type } = useParams<SignUpPageType>() as SignUpPageType;

  const initialValues: SignUpFormValues = useMemo(() => ({
      contactEmail: '',
      password: '',
      passwordConfirm: '',
      firstName: '',
      lastName: '',
    }),
    []
  )
  if (type === 'jobSeeker') {
    initialValues.state = 'drafting-profile'
    initialValues.jobSeeker_currentlyEnrolledInCourse = ''
    initialValues.agreesWithCodeOfConduct = false
  }
  if (type === 'company') {
    initialValues.state = 'drafting-profile'
    initialValues.companyName = ''
  }

  const [submitError, setSubmitError] = useState(null)

  const formik = useFormik<SignUpFormValues>({
    initialValues,
    enableReinitialize: true,
    validationSchema: buildValidationSchema(type),
    onSubmit: async (profile, actions) => {
      setSubmitError(null)
  
      try {
        if (type === 'jobSeeker') {
          profile.isProfileVisibleToCompanies = true
  
          // TODO: this needs to be done in a smarter way, like iterating over the TpJobSeekerProfile definition or something
          const cleanProfile = omit(profile, [
            'password',
            'passwordConfirm',
            'agreesWithCodeOfConduct',
            'gaveGdprConsent',
          ])
  
          await signUpJobSeeker(
            profile.contactEmail,
            profile.password,
            cleanProfile
          )
        }
        if (type === 'company') {
  
          // TODO: this needs to be done in a smarter way, like iterating over the TpJobSeekerProfile definition or something
          const cleanProfile = omit(profile, [
            'password',
            'passwordConfirm',
            'agreesWithCodeOfConduct',
            'gaveGdprConsent',
          ])
  
          await signUpCompany(profile.contactEmail, profile.password, cleanProfile)
        }
        actions.setSubmitting(false)
        history.push(`/front/signup-email-verification`)
      } catch (error) {
        actions.setSubmitting(false)
        return error?.response?.data?.error?.details?.codes?.email.includes('uniqueness')
          ? setSubmitError('user-already-exists')
          : setSubmitError('generic')
      }
    },
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
          <Content size="small" renderAs="p">
            Got a ReDI Connect user account? You can log in with the same
            username and password <Link to="/front/login">here</Link>.
          </Content>
          {submitError === 'user-already-exists' && (
            <Notification color="info" className="is-light">
              You already have an account. Please{' '}
              <Link to="/front/login">log in</Link>.
            </Notification>
          )}
          <form onSubmit={(e) => e.preventDefault()} className="form">
            {type === 'company' && (
              <TextInput
                name="companyName"
                placeholder="Your company name"
                {...formik}
              />
            )}
            <TextInput
              name="firstName"
              placeholder="Your first name"
              {...formik}
            />
            <TextInput
              name="lastName"
              placeholder="Your last name"
              {...formik}
            />
            <TextInput
              name="contactEmail"
              type="email"
              placeholder="Your Email"
              {...formik}
            />
            <TextInput
              name="password"
              type="password"
              placeholder="Your password"
              {...formik}
            />
            <TextInput
              name="passwordConfirm"
              type="password"
              placeholder="Repeat your password"
              {...formik}
            />

            {type === 'jobSeeker' && (
              <FormSelect
                label="Current ReDI Course"
                name="currentlyEnrolledInCourse"
                placeholder="Choose your ReDI Course"
                items={formCourses}
                {...formik}
              />
            )}

            {type === 'jobSeeker' && (
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
            )}

            {type === 'company' && (
              <>
                <FormSelect
                  name="howDidHearAboutRediKey"
                  placeholder="How did you first hear about ReDI Talent Pool?"
                  items={howDidHearAboutRediOptionsEntries}
                  {...formik}
                />
                {formik.values.howDidHearAboutRediKey === 'other' && (
                  <TextInput
                    name="howDidHearAboutRediOtherText"
                    placeholder="Please tell us how you heard about ReDI Talent Pool"
                    {...formik}
                  />
                )}
              </>
            )}

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
