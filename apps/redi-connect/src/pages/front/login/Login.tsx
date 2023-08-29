import {
  fetcher,
  LoadMyProfileDocument,
  LoadMyProfileQuery,
  LoadMyProfileQueryVariables,
  MyTpDataDocument,
  MyTpDataQuery,
  MyTpDataQueryVariables,
  RediLocation,
  useConProfileSignUpMutation,
  UserType,
} from '@talent-connect/data-access'
import {
  Button,
  FormInput,
  Heading,
} from '@talent-connect/shared-atomic-design-components'
import { REDI_LOCATION_NAMES } from '@talent-connect/shared-config'
import { buildFrontendUrl, decodeJwt } from '@talent-connect/shared-utils'
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
  const conProfileSignUpMutation = useConProfileSignUpMutation()

  const [loginError, setLoginError] = useState<string>('')
  const [isWrongRediLocationError, setIsWrongRediLocationError] =
    useState<boolean>(false)

  const [conProfile, setConProfile] = useState<
    LoadMyProfileQuery['conProfile'] | null
  >(null)
  const [tpProfileLocation, setTpProfileLocation] =
    useState<RediLocation | null>(null)

  const submitForm = async () => {
    try {
      await login(formik.values.username, formik.values.password)

      // Note: we have to "build" the con profile data fetcher here because it
      // relies on the access token, which is not available until after the user
      // has logged in.
      const fetchMyConProfileOrFail = buildMyConProfileDataFetcher()
      try {
        const conProfile = await fetchMyConProfileOrFail()
        const isWrongRediLocationError =
          conProfile.conProfile.rediLocation !== envRediLocation()

        if (isWrongRediLocationError) {
          purgeAllSessionData()
          setIsWrongRediLocationError(true)
          setConProfile(conProfile.conProfile)
          return
        }

        return history.push('/app/me')
      } catch (err) {
        // If the user does not have a con profile, we will try to create one
        // for them using the data from the TP.
        try {
          const tpUserData = await myTpDataFetcher()
          const tpJobseekerDirectoryEntry =
            tpUserData.tpCurrentUserDataGet?.tpJobseekerDirectoryEntry
          const userHasATpJobseekerProfile = Boolean(tpJobseekerDirectoryEntry)

          if (userHasATpJobseekerProfile) {
            const isWrongRediLocationError =
              tpJobseekerDirectoryEntry.rediLocation !== envRediLocation()

            if (isWrongRediLocationError) {
              purgeAllSessionData()
              setIsWrongRediLocationError(true)
              setTpProfileLocation(
                tpJobseekerDirectoryEntry.rediLocation as RediLocation
              )
              return
            }

            await conProfileSignUpMutation.mutateAsync({
              input: {
                email: tpJobseekerDirectoryEntry.email,
                firstName: tpJobseekerDirectoryEntry.firstName,
                lastName: tpJobseekerDirectoryEntry.lastName,
                userType: UserType.Mentee,
                rediLocation:
                  tpJobseekerDirectoryEntry.rediLocation as RediLocation,
              },
            })
            return history.push(
              `/front/signup-email-verification-success/mentee`
            )
          } else {
            throw err
          }
        } catch (err) {
          try {
            const accessToken = getAccessTokenFromLocalStorage()
            const { email, firstName, lastName, userType, rediLocation } =
              decodeJwt(accessToken.jwtToken) as { [key: string]: string }
            await conProfileSignUpMutation.mutateAsync({
              input: {
                email: email,
                firstName: firstName,
                lastName: lastName,
                userType: userType as UserType,
                rediLocation: rediLocation as RediLocation,
              },
            })
            return history.push(
              `/front/signup-complete/${userType.toLowerCase()}`
            )
          } catch (err) {
            // The user has no TP profile, so we assume that they have just signed up via the CON
            // login form, and that they have a RedUser in Loobpack/MongoDB, and that the JWT token
            // in localStorage contains the data from RedUser which contains the data from the CON
            // sign-up page. We now want to use this to create a CON profile for them.

            // If we reach this place, it means that the user does not have a TP
            // profile nor do the have data in their JWT token from the CON sign-up,
            // OR, something went wrong on the server. In that case, show them an error message.
            formik.setSubmitting(false)
            setLoginError(
              'Something unexpected happened, please try again or contact the ReDI Career Support Team at career@redi-school.org'
            )
          }
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
            Got a ReDI Talent Pool user account? You can use the same username
            and password here.
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
                {capitalize(conProfile?.rediLocation || tpProfileLocation)}
              </strong>
              . To access ReDI Connect{' '}
              <strong>
                {capitalize(conProfile?.rediLocation || tpProfileLocation)}
              </strong>
              , go{' '}
              <a
                href={buildFrontendUrl(
                  process.env.NODE_ENV,
                  conProfile?.rediLocation || tpProfileLocation
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
