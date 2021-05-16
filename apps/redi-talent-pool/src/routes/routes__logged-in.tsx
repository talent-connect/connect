import { lazy } from 'react'
import { RouteDefinition } from './index'

const CVWizardContainer = lazy(
  () =>
    import(
      /* webpackChunkName: "CVWizardContainer", webpackPreload: true  */ '../pages/app/cv-wizard/CVWizardContainer'
    )
)

const routes: RouteDefinition[] = [
  {
    path: '/app/cv-wizard',
    component: CVWizardContainer,
    exact: true,
  },
]

const routesRequiringLoggedIn = routes.map((route) =>
  Object.assign(route, { requiresLoggedIn: true })
)

export const routes__loggedIn = routesRequiringLoggedIn
