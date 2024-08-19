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
  showNotification,
} from '@talent-connect/shared-atomic-design-components'
import { decodeJwt } from '@talent-connect/shared-utils'
import { useFormik } from 'formik'
import { useState } from 'react'
import { Columns, Content, Form } from 'react-bulma-components'
import { Link, useHistory } from 'react-router-dom'
import * as Yup from 'yup'
import Teaser from '../../../components/molecules/Teaser'
import AccountOperation from '../../../components/templates/AccountOperation'
import { login } from '../../../services/api/api'
import { getAccessTokenFromLocalStorage } from '../../../services/auth/auth'

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

export default function Login() {
  const history = useHistory()
  const conProfileSignUpMutation = useConProfileSignUpMutation()

  const [loginError, setLoginError] = useState<string>('')

  const submitForm = async () => {
    // LOG THE USER IN VIA LOOPBACK
    try {
      await login(formik.values.username, formik.values.password)
    } catch (err) {
      console.log(err)
      formik.setSubmitting(false)
      setLoginError('You entered an incorrect email, password, or both.')
      return
    }

    const jwtToken = decodeJwt(getAccessTokenFromLocalStorage().jwtToken)
    if (!jwtToken.emailVerified) {
      formik.setSubmitting(false)
      showNotification(
        'Please verify your email address first. Check your inbox.',
        { autoHideDuration: 8000 }
      )
      return
    }

    // GET THEIR CON PROFILE FROM SALESFORCE
    try {
      // Load "outside" of react-query to avoid having to build
      // a complex logic adhering to the rules-of-hooks.
      await fetcher<LoadMyProfileQuery, LoadMyProfileQueryVariables>(
        LoadMyProfileDocument,
        {
          loopbackUserId: getAccessTokenFromLocalStorage().userId,
        }
      )()

      // TODO: insert proper error handling here and elsewhere. We should cover cases where we
      // get values usch as myProfileResult.isError. Perhaps we-ure the error boundary logic
      // that Eric has been looking into.
      const urlParams = new URLSearchParams(window.location.search)
      const goto = urlParams.get('goto') ?? '/app/me'
      return history.push(goto)
    } catch (err) {
      console.log(err)
    }

    // IF NO CON PROFILE, TRY TO CREATE ONE FROM TP
    // If the user does not have a con profile, we will try to create one
    // for them using the data from the TP.
    try {
      const tpUserData = await myTpDataFetcher()
      const tpJobseekerDirectoryEntry =
        tpUserData.tpCurrentUserDataGet?.tpJobseekerDirectoryEntry
      const userHasATpJobseekerProfile = Boolean(tpJobseekerDirectoryEntry)

      if (userHasATpJobseekerProfile) {
        await conProfileSignUpMutation.mutateAsync({
          input: {
            email: tpJobseekerDirectoryEntry.email,
            userType: UserType.Mentee,
            rediLocation:
              tpJobseekerDirectoryEntry.rediLocation as RediLocation,
          },
        })
        return history.push('/front/signup-complete/mentee')
      }
    } catch (err) {
      console.log(err)
    }

    // IF NO CON PROFILE AND NO TP PROFILE, TRY TO CREATE ONE FROM JWT
    try {
      // The user has no TP profile, so we assume that they have just signed up via the CON
      // login form, and that they have a RedUser in Loobpack/MongoDB, and that the JWT token
      // in localStorage contains the data from RedUser which contains the data from the CON
      // sign-up page. We now want to use this to create a CON profile for them.
      const accessToken = getAccessTokenFromLocalStorage()
      const {
        email,
        userType,
        rediLocation,
        mentor_isPartnershipMentor,
        mentor_workPlace,
      } = decodeJwt(accessToken.jwtToken)

      await conProfileSignUpMutation.mutateAsync({
        input: {
          email,
          userType: userType as UserType,
          rediLocation: rediLocation as RediLocation,
          mentor_isPartnershipMentor: mentor_isPartnershipMentor as boolean,
          mentor_workPlace,
        },
      })
      return history.push(`/front/signup-complete/${userType.toLowerCase()}`)
    } catch (err) {
      // IF NO CON PROFILE AND NO TP PROFILE AND NO JWT, SHOW ERROR
      // If we reach this place, it means that the user does not have a TP
      // profile nor do the have data in their JWT token from the CON sign-up,
      // OR, something went wrong on the server. In that case, show them an error message.
      console.log(err)
      formik.setSubmitting(false)
      setLoginError(
        'Something unexpected happened, please try again or contact the ReDI Talent Success Team at career@redi-school.org'
      )
      return
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
                disabled={
                  !(formik.dirty && formik.isValid) || formik.isSubmitting
                }
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
