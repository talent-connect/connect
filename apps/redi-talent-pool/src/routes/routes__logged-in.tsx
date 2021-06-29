import { lazy } from 'react'
import { RouteDefinition } from './index'

const Me = lazy(
  () =>
    import(
      /* webpackChunkName: "Me", webpackPreload: true  */ '../pages/app/me/Me'
    )
)

const CvList = lazy(
  () => import(/* webpackChunkName: "CvList", webpackPreload: true  */ '../pages/app/cv/CvList')
)

const routes: RouteDefinition[] = [
  {
    path: '/app/me',
    component: Me,
    exact: true,
  },
  {
    path: '/app/cv',
    component: CvList,
    exact: true,
  }
]

const routesRequiringLoggedIn = routes.map((route) =>
  Object.assign(route, { requiresLoggedIn: true })
)

export const routes__loggedIn = routesRequiringLoggedIn
