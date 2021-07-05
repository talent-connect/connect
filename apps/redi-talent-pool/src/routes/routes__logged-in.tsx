import { lazy } from 'react'
import { RouteDefinition } from './index'

const Me = lazy(
  () =>
    import(
      /* webpackChunkName: "Me", webpackPreload: true  */ '../pages/app/me/Me'
    )
)
const Browse = lazy(
  () =>
    import(
      /* webpackChunkName: "Browse", webpackPreload: true  */ '../pages/app/browse/Browse'
    )
)
const JobListing = lazy(
  () =>
    import(
      /* webpackChunkName: "JobListing", webpackPreload: true  */ '../pages/app/job-listing/JobListing'
    )
)
const JobseekerProfile = lazy(
  () =>
    import(
      /* webpackChunkName: "Browse", webpackPreload: true  */ '../pages/app/jobseeker-profile/JobseekerProfile'
    )
)

const routes: RouteDefinition[] = [
  {
    path: '/app/me',
    component: Me,
    exact: true,
  },
  {
    path: '/app/browse',
    component: Browse,
    exact: true,
  },
  {
    path: '/app/job-listing/:tpJobListingId',
    component: JobListing,
    exact: true,
  },
  {
    path: '/app/jobseeker-profile/:tpJobseekerProfileId',
    component: JobseekerProfile,
    exact: true,
  },
]

const routesRequiringLoggedIn = routes.map((route) =>
  Object.assign(route, { requiresLoggedIn: true })
)

export const routes__loggedIn = routesRequiringLoggedIn
