import { AccessToken, RedUser } from '@talent-connect/shared-types'
import { queryClient } from '../api/api'

export const isLoggedIn = (): boolean => {
  const accessToken = window.localStorage.getItem('accessToken')
  try {
    return !!JSON.parse(accessToken)
  } catch (err) {
    return false
  }
}

export const getRedUserFromLocalStorage = (): RedUser =>
  JSON.parse(window.localStorage.getItem('redUser'))

export const saveRedUserToLocalStorage = (redUser: RedUser) => {
  window.localStorage.setItem('redUser', JSON.stringify(redUser))
}

export const getAccessTokenFromLocalStorage = (): AccessToken =>
  JSON.parse(window.localStorage.getItem('accessToken'))

export const saveAccessTokenToLocalStorage = (accessToken: AccessToken) => {
  window.localStorage.setItem('accessToken', JSON.stringify(accessToken))
}

export const purgeAllSessionData = () => {
  queryClient.clear()
  window.localStorage.clear()
}
