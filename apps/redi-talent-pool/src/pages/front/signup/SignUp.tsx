import {
  FirstPointOfTpContactOption,
  TpCompanyProfileSignUpOperationType,
  useListAllTpCompanyNamesQuery,
} from '@talent-connect/data-access'
import {
  Button,
  Checkbox,
  FormInput,
  FormSelect,
  Heading,
} from '@talent-connect/shared-atomic-design-components'
import { REDI_LOCATION_NAMES } from '@talent-connect/shared-config'
import { TpCompanyProfile } from '@talent-connect/shared-types'
import { toPascalCaseAndTrim } from '@talent-connect/shared-utils'
import { howDidHearAboutRediOptions } from '@talent-connect/talent-pool/config'
import { objectEntries } from '@talent-connect/typescript-utilities'
import { FormikHelpers as FormikActions, useFormik } from 'formik'
import { useMemo, useState } from 'react'
import { Columns, Content, Form, Notification } from 'react-bulma-components'
import { Link, useParams } from 'react-router-dom'
import * as Yup from 'yup'
import TpTeaser from '../../../components/molecules/TpTeaser'
import AccountOperation from '../../../components/templates/AccountOperation'
import { signUpLoopback } from '../../../services/api/api'
import { history } from '../../../services/history/history'

const formRediLocations = objectEntries(REDI_LOCATION_NAMES).map(
  ([id, label]) => ({
    value: id,
    label,
  })
)

const howDidHearAboutRediOptionsEntries = Object.entries(
  howDidHearAboutRediOptions
).map(([value, label]) => ({ value, label }))

function buildValidationSchema(signupType: SignUpPageType['type']) {
  const baseSchema = {
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
    gaveGdprConsent: Yup.boolean().required().oneOf([true]),
  }

  if (signupType === 'jobseeker') {
    return Yup.object({
      ...baseSchema,
      rediLocation: Yup.string()
        .required()
        .oneOf(formRediLocations.map((loc) => loc.value))
        .label('Current ReDI Location'),
      agreesWithCodeOfConduct: Yup.boolean().required().oneOf([true]),
    })
  }

  if (signupType === 'company') {
    return Yup.object({
      ...baseSchema,
      companyIdOrName: Yup.string()
        .required('Your company name is required')
        .max(255),
      howDidHearAboutRediKey: Yup.string().required('This field is required'),
      howDidHearAboutRediOtherText: Yup.string().when(
        'howDidHearAboutRediKey',
        {
          is: (howDidHearAboutRediKey) =>
            howDidHearAboutRediKey === FirstPointOfTpContactOption.Other,
          then: Yup.string().required('This field is required'),
        }
      ),
    })
  }
}

type SignUpPageType = {
  type: 'jobseeker' | 'company'
}

export default function SignUp() {
  const { type } = useParams<SignUpPageType>()

  const initialValues: any = useMemo(
    () => ({
      email: '',
      password: '',
      passwordConfirm: '',
      firstName: '',
      lastName: '',
      isMicrosoftPartner: false,
    }),
    []
  )
  if (type === 'jobseeker') {
    initialValues.state = 'drafting-profile'
    initialValues.agreesWithCodeOfConduct = false
  }
  if (type === 'company') {
    initialValues.companyIdOrName = ''
    initialValues.state = 'drafting-profile'
    initialValues.isMicrosoftPartner = false
  }

  const {
    data: tpCompanyNames,
    isLoading: isTpCompanyNamesLoading,
    isSuccess: isTpCompanyNamesSuccess,
  } = useListAllTpCompanyNamesQuery({}, { enabled: type === 'company' })

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: buildValidationSchema(type as SignUpPageType['type']),
    onSubmit: submitForm,
  })

  const isExistingCompany = tpCompanyNames?.publicTpCompanyProfiles.some(
    (company) => company.id === formik.values.companyIdOrName
  )
  const isNewCompany = !isExistingCompany

  const [loopbackSubmitError, setLoopbackSubmitError] = useState(null)

  async function submitForm(values: any, actions: FormikActions<any>) {
    try {
      setLoopbackSubmitError(null)

      if (type === 'jobseeker') {
        const transformedValues: any =
          buildValidationSchema('jobseeker').cast(values)
        await signUpLoopback(values.email, values.password, {
          firstName: transformedValues.firstName,
          lastName: transformedValues.lastName,
          rediLocation: transformedValues.rediLocation,
          productSignupSource: 'TP',
          tpSignupType: 'jobseeker',
        })
        history.push(`/front/signup-email-verification`)
      }

      if (type === 'company') {
        const transformedValues = buildValidationSchema('company').cast(values)
        const profile = transformedValues as Partial<TpCompanyProfile>
        profile.isProfileVisibleToJobseekers = true

        await signUpLoopback(values.email, values.password, {
          companyIdOrName: values.companyIdOrName,
          firstName: values.firstName,
          lastName: values.lastName,
          operationType: isExistingCompany
            ? TpCompanyProfileSignUpOperationType.ExistingCompany
            : TpCompanyProfileSignUpOperationType.NewCompany,
          firstPointOfContact: values.howDidHearAboutRediKey,
          firstPointOfContactOther: values.howDidHearAboutRediOtherText,
          isMicrosoftPartner: values.isMicrosoftPartner,
          productSignupSource: 'TP',
          tpSignupType: 'company',
        })
        history.push(`/front/signup-email-verification`)
      }
      actions.setSubmitting(false)
    } catch (error) {
      actions.setSubmitting(false)
      if (
        error?.response?.data?.error?.details?.codes?.email.includes(
          'uniqueness'
        )
      ) {
        return setLoopbackSubmitError('user-already-exists')
      }
      return setLoopbackSubmitError('generic')
    }
  }

  return (
    <AccountOperation>
      <Columns>
        <Columns.Column
          size={6}
          responsive={{ mobile: { hide: { value: true } } }}
        >
          <TpTeaser.SignUp />
        </Columns.Column>

        <Columns.Column size={5} offset={1}>
          <Heading border="bottomLeft">Sign-up</Heading>
          {type === 'jobseeker' && (
            <Content size="small" renderAs="p">
              Got a ReDI Connect user account? You can log in with the same
              username and password <Link to="/front/login">here</Link>.
            </Content>
          )}
          {loopbackSubmitError === 'user-already-exists' && (
            <Notification color="info" className="is-light">
              You already have an account. Please{' '}
              <Link to="/front/login">log in</Link>.
            </Notification>
          )}
          <form onSubmit={(e) => e.preventDefault()} className="form">
            {type === 'company' ? (
              <FormSelect
                name="companyIdOrName"
                placeholder="Your company name"
                items={
                  isTpCompanyNamesSuccess
                    ? tpCompanyNames?.publicTpCompanyProfiles.map(
                        (company) => ({
                          label: company.companyName,
                          value: company.id,
                        })
                      )
                    : []
                }
                creatable
                isLoading={isTpCompanyNamesLoading}
                {...formik}
              />
            ) : null}

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

            {type === 'jobseeker' && (
              <FormSelect
                label="Current ReDI Location"
                name="rediLocation"
                placeholder="Choose your ReDI Location"
                items={formRediLocations}
                {...formik}
              />
            )}

            {type === 'jobseeker' ? (
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
            ) : null}

            {type === 'company' ? (
              <>
                <FormSelect
                  name="howDidHearAboutRediKey"
                  placeholder="How did you first hear about ReDI Talent Pool?"
                  items={howDidHearAboutRediOptionsEntries}
                  {...formik}
                />
                {formik.values.howDidHearAboutRediKey ===
                FirstPointOfTpContactOption.Other ? (
                  <FormInput
                    name="howDidHearAboutRediOtherText"
                    placeholder="Please tell us how you heard about ReDI Talent Pool"
                    {...formik}
                  />
                ) : null}
              </>
            ) : null}

            {type === 'company' && isNewCompany && (
              <Checkbox.Form
                name="isMicrosoftPartner"
                checked={formik.values.isMicrosoftPartner}
                {...formik}
              >
                I am a Microsoft Partner{' '}
              </Checkbox.Form>
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
              className={loopbackSubmitError ? 'help--show' : ''}
            >
              {loopbackSubmitError === 'generic' &&
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
