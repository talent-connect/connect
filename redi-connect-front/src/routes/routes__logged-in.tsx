import { Applications } from '../pages/app/applications/Applications';
import { Dashboard } from '../pages/app/dashboard/Dashboard';
import { Profile } from '../pages/app/profile/Profile';
import { RouteDefinition } from './index';
import { Me } from '../pages/app/me/Me';

const routes: Array<RouteDefinition> = [
  {
    path: '/app/dashboard',
    component: Dashboard,
    exact: true,
  },
  {
    path: '/app/profile/:profileId',
    component: Profile,
    exact: true,
  },
  {
    path: '/app/applications',
    component: Applications,
    exact: true,
    name: 'mentee-applicants',
  },
  {
    path: '/app/me',
    component: Me,
    exact: true
  }
];
const routesRequiringLoggedIn = routes.map(route =>
  Object.assign(route, { requiresLoggedIn: true })
);

export const routes__loggedIn = routesRequiringLoggedIn;
