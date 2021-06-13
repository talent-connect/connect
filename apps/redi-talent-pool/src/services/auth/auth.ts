import { RedUser } from '@talent-connect/shared-types'
import { AccessToken } from '@talent-connect/shared-types'
import { queryClient } from '../api/api'

export const isLoggedIn = (): boolean => {
  const accessToken: any = window.localStorage.getItem('accessToken')
  try {
    const r1: any = JSON.parse(accessToken)
    return Boolean(r1)
  } catch (err) {
    return false
  }
}

export const getRedUserFromLocalStorage = (): RedUser =>
  JSON.parse(window.localStorage.getItem('redUser') as string)

export const saveRedUserToLocalStorage = (redUser: RedUser) => {
  window.localStorage.setItem('redUser', JSON.stringify(redUser))
}

export const getAccessTokenFromLocalStorage = (): AccessToken =>
  JSON.parse(window.localStorage.getItem('accessToken') as string)

export const saveAccessTokenToLocalStorage = (accessToken: AccessToken) => {
  window.localStorage.setItem('accessToken', JSON.stringify(accessToken))
}

export const purgeAllSessionData = () => {
  queryClient.clear()
  window.localStorage.clear()
}
