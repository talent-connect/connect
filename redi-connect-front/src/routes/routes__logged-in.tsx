import { lazy } from 'react'
import { RouteDefinition } from './index'

const Applications = lazy(() =>
  import(
    /* webpackChunkName: "Applications", webpackPreload: true  */ '../pages/app/applications/Applications'
  )
)
const Mentorship = lazy(() =>
  import(
    /* webpackChunkName: "Applications", webpackPreload: true  */ '../pages/app/mentorship/Mentorship'
  )
)
const Dashboard = lazy(() =>
  import(
    /* webpackChunkName: "Dashboard", webpackPreload: true  */ '../pages/app/dashboard/Dashboard'
  )
)
const Profile = lazy(() =>
  import(
    /* webpackChunkName: "Profile", webpackPreload: true  */ '../pages/app/profile/Profile'
  )
)
const Me = lazy(() =>
  import(
    /* webpackChunkName: "Me", webpackPreload: true  */ '../pages/app/me/Me'
  )
)

const routes: RouteDefinition[] = [
  {
    path: '/app/dashboard',
    component: Dashboard,
    exact: true
  },
  {
    path: '/app/dashboard/profile/:profileId',
    component: Profile,
    exact: true
  },
  {
    path: '/app/profile/:profileId',
    component: Profile,
    exact: true
  },
  {
    path: '/app/applications',
    component: Applications,
    exact: true,
    name: 'mentee-applicants'
  },
  {
    path: '/app/applications/profile/:profileId',
    component: Profile,
    exact: true
  },
  {
    path: '/app/mentorship',
    component: Mentorship,
    exact: true
  },
  {
    path: '/app/me',
    component: Me,
    exact: true
  }
]
const routesRequiringLoggedIn = routes.map(route =>
  Object.assign(route, { requiresLoggedIn: true })
)

export const routes__loggedIn = routesRequiringLoggedIn
