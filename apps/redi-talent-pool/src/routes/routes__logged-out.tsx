import { RouteDefinition } from './index'
import { lazy } from 'react'
import Home from '../pages/front/landing/Home'
import { RequestResetPasswordEmail } from '../pages/front/reset-password/RequestResetPasswordEmail'
import { SetNewPassword } from '../pages/front/reset-password/SetNewPassword'
const Login = lazy(
  () =>
    import(
      /* webpackChunkName: "Login", webpackPreload: true */ '../pages/front/login/Login'
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
const SignUpComplete = lazy(
  () =>
    import(
      /* webpackChunkName: "SignUpComplete", webpackPreload: true */ '../pages/front/signup/SignUpComplete'
    )
)

export const routes__loggedOut: RouteDefinition[] = [
  {
    path: '/front/home',
    component: Home,
    exact: true,
  },
  {
    path: '/front/login',
    component: Login,
    exact: true,
  },
  {
    path: '/front/signup-email-verification',
    component: SignUpEmailVerification,
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
