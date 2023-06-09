import {
  LoadMyProfileDocument,
  LoadMyProfileQuery,
  LoadMyProfileQueryVariables,
  MyTpDataDocument,
  MyTpDataQuery,
  MyTpDataQueryVariables,
  RediLocation,
  UserType,
  fetcher,
  useConProfileSignUpMutation,
  useLoadMyProfileQuery,
} from '@talent-connect/data-access'
import {
  Button,
  FormInput,
  Heading,
} from '@talent-connect/shared-atomic-design-components'
import { REDI_LOCATION_NAMES } from '@talent-connect/shared-config'
import { buildFrontendUrl } from '@talent-connect/shared-utils'
import { useFormik } from 'formik'
import { capitalize } from 'lodash'
import { useState } from 'react'
import { Columns, Content, Form, Notification } from 'react-bulma-components'
import { Link, useHistory } from 'react-router-dom'
import * as Yup from 'yup'
import Teaser from '../../../components/molecules/Teaser'
import AccountOperation from '../../../components/templates/AccountOperation'
import { login } from '../../../services/api/api'
import {
  getAccessTokenFromLocalStorage,
  purgeAllSessionData,
} from '../../../services/auth/auth'
import { envRediLocation } from '../../../utils/env-redi-location'

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
  const history = useHistory()
  const accessToken = getAccessTokenFromLocalStorage()
  const loopbackUserId = accessToken?.userId ?? ''
  const [stateLoopbackUserId, setStateLoopbackUserId] = useState(loopbackUserId)
  const myProfileQuery = useLoadMyProfileQuery(
    { loopbackUserId: stateLoopbackUserId },
    { enabled: Boolean(stateLoopbackUserId) }
  )
  const conProfileSignUpMutation = useConProfileSignUpMutation()

  const [loginError, setLoginError] = useState<string>('')

  const isWrongRediLocationError =
    myProfileQuery.isSuccess &&
    myProfileQuery.data.conProfile.rediLocation !== envRediLocation()

  if (isWrongRediLocationError) {
    purgeAllSessionData()
  }

  const submitForm = async () => {
    try {
      const accessToken = await login(
        formik.values.username,
        formik.values.password
      )
      setStateLoopbackUserId(accessToken.userId)

      // Note: we have to "build" the con profile data fetcher here because it
      // relies on the access token, which is not available until after the user
      // has logged in.
      const fetchMyConProfileOrFail = buildMyConProfileDataFetcher()
      try {
        await fetchMyConProfileOrFail()
        return history.push('/app/me')
      } catch (err) {
        // If the user does not have a con profile, we will try to create one
        // for them using the data from the TP.
        // If the user does not have a TP profile, we will show them an error.
        const tpUserData = await myTpDataFetcher()
        const tpJobseekerDirectoryEntry =
          tpUserData.tpCurrentUserDataGet?.tpJobseekerDirectoryEntry
        const userHasATpJobseekerProfile = Boolean(tpJobseekerDirectoryEntry)

        if (userHasATpJobseekerProfile) {
          await conProfileSignUpMutation.mutateAsync({
            input: {
              email: tpJobseekerDirectoryEntry.email,
              firstName: tpJobseekerDirectoryEntry.firstName,
              lastName: tpJobseekerDirectoryEntry.lastName,
              userType: UserType.Mentee,
              rediLocation: envRediLocation() as RediLocation,
              mentee_currentlyEnrolledInCourse:
                tpJobseekerDirectoryEntry.currentlyEnrolledInCourse,
            },
          })
          return history.push(`/front/signup-complete/mentee`)
        } else {
          throw err
        }
      }
    } catch (err) {
      formik.setSubmitting(false)
      setLoginError('You entered an incorrect email, password, or both.')
    }
  }

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
          <Teaser.SignUp />
        </Columns.Column>

        <Columns.Column size={5} offset={1}>
          <Heading border="bottomLeft">Login</Heading>
          <Content size="large" renderAs="p">
            Enter your email and password below.
          </Content>
          <Content size="small" renderAs="p">
            {/* Commented and replaced with different text until the cross-platform log-in feature is implemented. */}
            {/* Got a ReDI Talent Pool user account? You can use the same username
            and password here. */}
            Got a ReDI Talent Pool user account? To log in with the same
            username and password get in contact with @Kate in ReDI Slack or
            write an e-mail
            <a href="mailto:kateryna@redi-school.org"> here</a>.
          </Content>

          {isWrongRediLocationError && (
            <Notification color="info" className="is-light">
              You've tried to log into ReDI Connect{' '}
              <strong>
                {
                  REDI_LOCATION_NAMES[
                    process.env.NX_REDI_CONNECT_REDI_LOCATION as RediLocation
                  ]
                }
              </strong>
              , but your account is linked to ReDI Connect{' '}
              <strong>
                {capitalize(myProfileQuery.data.conProfile.rediLocation)}
              </strong>
              . To access ReDI Connect{' '}
              <strong>{myProfileQuery.data.conProfile.rediLocation}</strong>, go{' '}
              <a
                href={buildFrontendUrl(
                  process.env.NODE_ENV,
                  myProfileQuery.data.conProfile.rediLocation
                )}
              >
                here
              </a>
              .
            </Notification>
          )}

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
