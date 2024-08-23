import { lazy } from 'react'
import Faqs from '../pages/front/Faqs'
import Home from '../pages/front/landing/Home'
import Mentee from '../pages/front/landing/Mentee'
import Mentor from '../pages/front/landing/Mentor'
import { RequestResetPasswordEmail } from '../pages/front/reset-password/RequestResetPasswordEmail'
import { SetNewPassword } from '../pages/front/reset-password/SetNewPassword'
import { RouteDefinition } from './index'
const Login = lazy(
  () =>
    import(
      /* webpackChunkName: "Login", webpackPreload: true */ '../pages/front/login/Login'
    )
)
const LoginError = lazy(
  () =>
    import(
      /* webpackChunkName: "LoginError", webpackPreload: true */ '../pages/front/login/LoginError'
    )
)
const SignUpLanding = lazy(
  () =>
    import(
      /* webpackChunkName: "SignUpLanding", webpackPreload: true */ '../pages/front/signup/SignUpLanding'
    )
)
const SignUp = lazy(
  () =>
    import(
      /* webpackChunkName: "SignUp", webpackPreload: true */ '../pages/front/signup/SignUp'
    )
)
const SignUpEmailVerification = lazy(
  () =>
    import(
      /* webpackChunkName: "SignUpEmailVerification", webpackPreload: true */ '../pages/front/signup/SignUpEmailVerification'
    )
)
const SignUpEmailVerificationSuccess = lazy(
  () =>
    import(
      /* webpackChunkName: "SignUpEmailVerificationSuccess", webpackPreload: true */ '../pages/front/signup/SignUpEmailVerificationSuccess'
    )
)
const SignUpComplete = lazy(
  () =>
    import(
      /* webpackChunkName: "SignUpComplete", webpackPreload: true */ '../pages/front/signup/SignUpComplete'
    )
)

export const routes__loggedOut: RouteDefinition[] = [
  {
    path: '/faq',
    component: Faqs,
    exact: true,
  },
  {
    path: '/front/home',
    component: Home,
    exact: true,
  },
  {
    path: '/front/landing/mentor',
    component: Mentor,
    exact: true,
  },
  {
    path: '/front/landing/mentee',
    component: Mentee,
    exact: true,
  },
  {
    path: '/front/login',
    component: Login,
    exact: true,
  },
  {
    path: '/front/login-result',
    component: LoginError,
    exact: true,
  },
  {
    path: '/front/signup-landing',
    component: SignUpLanding,
    exact: true,
  },
  {
    path: '/front/signup-email-verification',
    component: SignUpEmailVerification,
    exact: true,
  },
  {
    path: '/front/signup-email-verification-success',
    component: SignUpEmailVerificationSuccess,
    exact: true,
  },
  {
    path: '/front/signup-complete/:userType',
    component: SignUpComplete,
    exact: true,
  },
  {
    path: '/front/signup/:type',
    component: SignUp,
    exact: true,
  },
  {
    path: '/front/reset-password/request-reset-password-email',
    component: RequestResetPasswordEmail,
    exact: true,
  },
  {
    path: '/front/reset-password/set-new-password/:accessToken',
    component: SetNewPassword,
    exact: true,
  },
]
