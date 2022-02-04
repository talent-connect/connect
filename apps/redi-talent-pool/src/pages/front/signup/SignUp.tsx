import { useMemo, useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
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
import { mapOptionsObject } from '@talent-connect/typescript-utilities';
import { jobSeekerComponentForm, companyComponentForm, SignUpPageType } from './SignUp.form';

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

type SignUpPageTypeParams = {
  type: SignUpPageType;
}


export default function SignUp() {
  const { type } = useParams<SignUpPageTypeParams>() as SignUpPageTypeParams;

  // const initialValues: SignUpFormValues = useMemo(() => ({
  //     contactEmail: '',
  //     password: '',
  //     passwordConfirm: '',
  //     firstName: '',
  //     lastName: '',
  //   }),
  //   []
  // )
  // if (type === 'jobSeeker') {
  //   initialValues.state = 'drafting-profile'
  //   initialValues.jobSeeker_currentlyEnrolledInCourse = ''
  //   initialValues.agreesWithCodeOfConduct = false
  // }
  // if (type === 'company') {
  //   initialValues.state = 'drafting-profile'
  //   initialValues.companyName = ''
  // }

  const [submitError, setSubmitError] = useState(null)

  if (type === 'jobSeeker') {

    const formik = jobSeekerComponentForm({
      setSubmitError,
      signUpType: type,
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
  
              <FormSelect
                label="Current ReDI Course"
                name="currentlyEnrolledInCourse"
                placeholder="Choose your ReDI Course"
                items={formCourses}
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
    
  if (type === 'company') {
      
      const formik = companyComponentForm({
        setSubmitError,
        signUpType: type,
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
                <TextInput
                  name="companyName"
                  placeholder="Your company name"
                  {...formik}
                />
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
}
