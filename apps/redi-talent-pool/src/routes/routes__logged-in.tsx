import { lazy } from 'react'
import { RouteDefinition } from './index'

const Me = lazy(
  () =>
    import(
      /* webpackChunkName: "Me", webpackPreload: true  */ '../pages/app/me/Me'
    )
)

const CvListPage = lazy(
  () =>
    import(
      /* webpackChunkName: "CvList", webpackPreload: true  */ '../pages/app/cv/CvListPage'
    )
)

const CvDetailPage = lazy(
  () =>
    import(
      /* webpackChunkName: "CvDetail", webpackPreload: true  */ '../pages/app/cv/CvDetailPage'
    )
)

const routes: RouteDefinition[] = [
  {
    path: '/app/me',
    component: Me,
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
]

const routesRequiringLoggedIn = routes.map((route) =>
  Object.assign(route, { requiresLoggedIn: true })
)

export const routes__loggedIn = routesRequiringLoggedIn
