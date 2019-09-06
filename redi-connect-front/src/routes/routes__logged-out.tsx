import { SignUpFormMentee } from '../pages/front/signup/SignUpFormMentee';
import { SignUpFormMentor } from '../pages/front/signup/SignUpFormMentor';
import { RouteDefinition } from './index';
import { SignUpComplete } from '../pages/front/signup/SignUpComplete';
import { Login } from '../pages/front/login/Login';
import { SignUpExisting } from '../pages/front/signup-existing/SignUpExisting';
import { ResetPassword } from '../pages/front/signup-existing/ResetPassword';

export const routes__loggedOut: Array<RouteDefinition> = [
  {
    path: '/front/login',
    component: Login,
    exact: true,
  },
  {
    path: '/front/signup/mentor',
    component: SignUpFormMentor,
    exact: true,
  },
  {
    path: '/front/signup/mentee',
    component: SignUpFormMentee,
    exact: true,
  },
  {
    path: '/front/signup/complete/:type',
    component: SignUpComplete,
    exact: true,
  },
  {
    path: '/front/signup/existing/:accessToken',
    component: SignUpExisting,
    exact: true,
  },
  {
    path: '/front/signup/existing-reset-password',
    component: ResetPassword,
    exact: true,
  },
]