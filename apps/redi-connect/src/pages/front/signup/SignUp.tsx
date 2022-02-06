import { FC, useState } from 'react'
import AccountOperation from '../../../components/templates/AccountOperation'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'

import {
  Button,
  Checkbox,
  TextInput,
  FormSelect,
  Heading,
} from '@talent-connect/shared-atomic-design-components'

import Teaser from '../../../components/molecules/Teaser'

import { Columns, Content, Form } from 'react-bulma-components'

import { UserRole } from '@talent-connect/shared-types'
import { courses } from '../../../config/config'
import { componentForm, SignUpUserType } from './SignUp.form';

const formCourses = courses.map(({ id, label }) => ({ value: id, label }))

type SignUpPageType = {
  type: UserRole
}

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

const SignUp() {
  const { type } = useParams<SignUpPageType>() as SignUpPageType

  // we may consider removing the backend types from frontend
  const userType: SignUpUserType =  type === 'mentee'
      ? 'public-sign-up-mentee-pending-review'
      : 'public-sign-up-mentor-pending-review'

  const [submitError, setSubmitError] = useState(false)

  const formik = componentForm({
    setSubmitError,
    userType
  });

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

export default SignUp