import {
  fetcher,
  LoadMyProfileDocument,
  LoadMyProfileQuery,
  LoadMyProfileQueryVariables,
  MyTpDataDocument,
  MyTpDataQuery,
  MyTpDataQueryVariables,
} from '@talent-connect/data-access'
import {
  Button,
  FormInput,
  Heading,
} from '@talent-connect/shared-atomic-design-components'
import { FormikHelpers as FormikActions, FormikValues, useFormik } from 'formik'
import { useCallback, useState } from 'react'
import { Columns, Content, Form } from 'react-bulma-components'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'
import TpTeaser from '../../../components/molecules/TpTeaser'
import AccountOperation from '../../../components/templates/AccountOperation'
import { login } from '../../../services/api/api'
import {
  getAccessTokenFromLocalStorage,
  saveAccessTokenToLocalStorage,
} from '../../../services/auth/auth'
import { history } from '../../../services/history/history'
import { useSignUpJobseekerMutation } from '../signup/SignUp.generated'

interface LoginFormValues {
  username: string
  password: string
}

const initialValues: LoginFormValues = {
  username: '',
  password: '',
}

const validationSchema = Yup.object({
  username: Yup.string().email().required().label('Email').max(255),
  password: Yup.string().required().label('Password').max(255),
})

// This is copied directly from the file that contains the auto-codegenerated useMyTpDataQuery.
// We have a need to use the underlying data fetcher function directly. If we were to use the
// react queries directly, the logic inside of our component would be needlessly complex.
// Believe us. We tried. (Kate, Eric, 9 June 2023)
const myTpDataFetcher = fetcher<MyTpDataQuery, MyTpDataQueryVariables>(
  MyTpDataDocument
)
// Same for the useLoadMyProfileQuery that loads CON data:
const buildMyConProfileDataFetcher = () =>
  fetcher<LoadMyProfileQuery, LoadMyProfileQueryVariables>(
    LoadMyProfileDocument,
    { loopbackUserId: getAccessTokenFromLocalStorage()?.userId }
  )

export default function Login() {
  const [loginError, setLoginError] = useState<string>('')
  const tpJobseekerSignupMutation = useSignUpJobseekerMutation()

  const submitForm = useCallback(
    (values, actions) => {
      ;(async (
        values: FormikValues,
        actions: FormikActions<LoginFormValues>
      ) => {
        const formValues = values as LoginFormValues
        try {
          const accessToken = await login(
            formValues.username,
            formValues.password
          )
          saveAccessTokenToLocalStorage(accessToken)

          const tpUserData = await myTpDataFetcher()

          const userHasATpProfile =
            Boolean(
              tpUserData.tpCurrentUserDataGet.tpJobseekerDirectoryEntry
            ) || Boolean(tpUserData.tpCurrentUserDataGet.representedCompany)

          if (userHasATpProfile) {
            return history.push('/app/me')
          }

          // Note: we have to "build" the con profile data fetcher here because it
          // relies on the access token, which is not available until after the user
          // has logged in.
          const myConProfileDataFetcher = buildMyConProfileDataFetcher()
          const conUserData = await myConProfileDataFetcher()

          const userDoesNotHaveTpProfile = !userHasATpProfile
          const userHasConProfile = Boolean(conUserData.conProfile)

          if (userDoesNotHaveTpProfile && userHasConProfile) {
            await tpJobseekerSignupMutation.mutateAsync({
              input: {
                firstName: conUserData.conProfile.firstName,
                lastName: conUserData.conProfile.lastName,
                currentlyEnrolledInCourse:
                  conUserData.conProfile.mentee_currentlyEnrolledInCourse,
                rediLocation: conUserData.conProfile.rediLocation,
              },
            })
            return history.push('/app/me')
          }
        } catch (err) {
          actions.setSubmitting(false)
          setLoginError('You entered an incorrect email, password, or both.')
        }
      })(values, actions)
    },
    [tpJobseekerSignupMutation]
  )

  const formik = useFormik({
    initialValues,
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
          <TpTeaser.SignIn />
        </Columns.Column>

        <Columns.Column size={5} offset={1}>
          <Heading border="bottomLeft">Login</Heading>
          <Content size="large" renderAs="p">
            Enter your email and password below.
          </Content>
          <Content size="small" renderAs="p">
            {/* Commented and replaced with different text until the cross-platform log-in feature is implemented. */}
            {/* Got a ReDI Connect user account? You can use the same username and
            password here. */}
            Got a ReDI Connect user account? To log in with the same username
            and password get in contact with @Kate in ReDI Slack or write an
            e-mail
            <a href="mailto:kateryna@redi-school.org"> here</a>.
          </Content>

          <form onSubmit={(e) => e.preventDefault()}>
            <FormInput
              name="username"
              type="email"
              placeholder="Email"
              {...formik}
            />

            <FormInput
              name="password"
              type="password"
              placeholder="Password"
              {...formik}
            />

            <Form.Field>
              <Form.Help
                color="danger"
                className={loginError ? 'help--show' : ''}
              >
                {loginError && loginError}
              </Form.Help>
            </Form.Field>

            <Form.Field
              className="submit-link submit-link--pre"
              textTransform="uppercase"
            >
              <Link to="/front/reset-password/request-reset-password-email">
                Forgot your password?
              </Link>
            </Form.Field>

            <Form.Field className="submit-spacer">
              <Button
                fullWidth
                onClick={formik.submitForm}
                disabled={!(formik.dirty && formik.isValid)}
              >
                Log in
              </Button>
            </Form.Field>
          </form>
        </Columns.Column>
      </Columns>
    </AccountOperation>
  )
}
