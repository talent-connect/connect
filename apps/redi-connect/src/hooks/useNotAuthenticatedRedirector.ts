import { isLoggedIn } from '../services/auth/auth'
import { history } from '../services/history/history'

export const useNotAuthenticatedRedirector = () => {
  if (!isLoggedIn()) {
    // For some reason code execution reaches this if branch
    // even when .pathname is /front/login, which defeats the
    // purpose of using history.location.pathname. We therefore
    // only do a history.replace if the pathname starts with
    // /app, meaning access to the authenticated/"private"
    // part of the app.
    const pathnameIsInPrivateArea = history.location.pathname.startsWith('/app')
    if (pathnameIsInPrivateArea) {
      history.replace(
        `/front/login?goto=${encodeURIComponent(history.location.pathname)}`
      )
    }
    return { isRedirectingToLogin: true }
  }
  return { isRedirectingToLogin: false }
}
