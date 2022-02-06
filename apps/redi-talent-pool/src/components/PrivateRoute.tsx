import { Route, RouteProps } from 'react-router-dom'
import { useNotAuthenticatedRedirector } from '../hooks/useNotAuthenticatedRedirector'

export function PrivateRoute (props: RouteProps) {
  const { isRedirectingToLogin } = useNotAuthenticatedRedirector()

  // If the hook determined user not authenticated it'll take care of redirect to
  // login page, meaning we should render nothing
  if (isRedirectingToLogin) return null

  return <Route {...props} />
}

export default PrivateRoute
