import { RouteDefinition } from "./index";
import { lazy } from "react";
import Home from "../pages/front/landing/Home";
import { RequestResetPasswordEmail } from "../pages/front/reset-password/RequestResetPasswordEmail";
import { SetNewPassword } from "../pages/front/reset-password/SetNewPassword";
const Login = lazy(() =>
  import(
    /* webpackChunkName: "Login", webpackPreload: true */ "../pages/front/login/Login"
  )
);
const SignUpLanding = lazy(() =>
  import(
    /* webpackChunkName: "SignUpLanding", webpackPreload: true */ "../pages/front/signup/SignUpLanding"
  )
);
const SignUpFormMentee = lazy(() =>
  import(
    /* webpackChunkName: "SignUpFormMentee", webpackPreload: true */ "../pages/front/signup/SignUpFormMentee"
  )
);
const SignUpFormMentor = lazy(() =>
  import(
    /* webpackChunkName: "SignUpFormMentor", webpackPreload: true */ "../pages/front/signup/SignUpFormMentor"
  )
);
const SignUpComplete = lazy(() =>
  import(
    /* webpackChunkName: "SignUpComplete", webpackPreload: true */ "../pages/front/signup/SignUpComplete"
  )
);
// const Login= lazy(() => import(/* webpackChunkName: "Login", webpackPreload: true */ '../pages/front/login/Login'));
const SignUpExisting = lazy(() =>
  import(
    /* webpackChunkName: "SignUpExisting", webpackPreload: true */ "../pages/front/signup-existing/SignUpExisting"
  )
);
const ResetPassword = lazy(() =>
  import(
    /* webpackChunkName: "ResetPassword", webpackPreload: true */ "../pages/front/signup-existing/ResetPassword"
  )
);

export const routes__loggedOut: RouteDefinition[] = [
  {
    path: "/front/home",
    component: Home,
    exact: true,
  },
  {
    path: "/front/login",
    component: Login,
    exact: true,
  },
  {
    path: "/front/signup/landing",
    component: SignUpLanding,
    exact: true,
  },
  {
    path: "/front/signup/mentor",
    component: SignUpFormMentor,
    exact: true,
  },
  {
    path: "/front/signup/mentee",
    component: SignUpFormMentee,
    exact: true,
  },
  {
    path: "/front/signup/complete/:type",
    component: SignUpComplete,
    exact: true,
  },
  {
    path: "/app/create-profile/existing/:accessToken",
    component: SignUpExisting,
    exact: true,
  },
  {
    path: "/app/create-profile/existing-reset-password",
    component: ResetPassword,
    exact: true,
  },
  {
    path: "/front/reset-password/request-reset-password-email",
    component: RequestResetPasswordEmail,
    exact: true,
  },
  {
    path: "/front/reset-password/set-new-password/:accessToken",
    component: SetNewPassword,
    exact: true,
  },
];
