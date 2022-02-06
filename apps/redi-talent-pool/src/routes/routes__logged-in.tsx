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
const CvListPage = lazy(
  () =>
    import(
      /* webpackChunkName: "CvList", webpackPreload: true  */ '../pages/app/cv-builder/cv-list/CvListPage'
    )
)

const CvDetailPage = lazy(
  () =>
    import(
      /* webpackChunkName: "CvDetail", webpackPreload: true  */ '../pages/app/cv-builder/cv-detail/CvDetailPage'
    )
)
const JobListing = lazy(
  () =>
    import(
      /* webpackChunkName: "JobListing", webpackPreload: true  */ '../pages/app/job-listing/JobListing'
    )
)
const JobSeekerProfile = lazy(
  () =>
    import(
      /* webpackChunkName: "Browse", webpackPreload: true  */ '../pages/app/jobSeeker-profile/JobSeekerProfile'
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
    path: '/app/cv-builder',
    component: CvListPage,
    exact: true,
  },
  {
    path: '/app/cv-builder/:id',
    component: CvDetailPage,
  },
  {
    path: '/app/job-listing/:tpJobListingId',
    component: JobListing,
    exact: true,
  },
  {
    path: '/app/jobSeeker-profile/:tpJobSeekerProfileId',
    component: JobSeekerProfile,
    exact: true,
  },
]

const routesRequiringLoggedIn = routes.map((route) =>
  Object.assign(route, { requiresLoggedIn: true })
)

export const routes__loggedIn = routesRequiringLoggedIn
