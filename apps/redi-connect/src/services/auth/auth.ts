import { RedUser } from '@talent-connect/shared-types'
import { AccessToken } from '@talent-connect/shared-types'
import { RedProfile } from '@talent-connect/shared-types'

export const isLoggedIn = (): boolean => {
  const profile = window.localStorage.getItem('redProfile')
  const accessToken = window.localStorage.getItem('accessToken')
  try {
    return !!JSON.parse(profile) && !!JSON.parse(accessToken)
  } catch (err) {
    return false
  }
}

export function getRedUserFromLocalStorage (): RedUser {
  return JSON.parse(window.localStorage.getItem('redUser'))
}

export function saveRedUserToLocalStorage (redUser: RedUser): void {
  return window.localStorage.setItem('redUser', JSON.stringify(redUser))
}

export function getRedProfileFromLocalStorage (): RedProfile {
  return JSON.parse(window.localStorage.getItem('redProfile'))
}

export function saveRedProfileToLocalStorage (redProfile: RedProfile): void {
  window.localStorage.setItem('redProfile', JSON.stringify(redProfile))
}

export function getAccessTokenFromLocalStorage (): AccessToken {
  return JSON.parse(window.localStorage.getItem('accessToken'))
}

export function saveAccessTokenToLocalStorage (accessToken: AccessToken) {
  window.localStorage.setItem('accessToken', JSON.stringify(accessToken))
}

export function purgeAllSessionData (): void {
  window.localStorage.clear()
}
