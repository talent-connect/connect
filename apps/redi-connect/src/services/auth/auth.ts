import { graphqlClient } from '@talent-connect/data-access'
import { RedUser } from '@talent-connect/shared-types'
import { AccessToken } from '@talent-connect/shared-types'
import { RedProfile } from '@talent-connect/shared-types'

export const isLoggedIn = (): boolean => {
  const profile: any = window.localStorage.getItem('redProfile')
  const accessToken: any = window.localStorage.getItem('accessToken')
  try {
    const r1: any = JSON.parse(profile)
    const r2: any = JSON.parse(accessToken)
    return r1 && r2
  } catch (err) {
    return false
  }
}

// TODO: add | undefined here...
export const getAccessTokenFromLocalStorage = (): AccessToken =>
  JSON.parse(window.localStorage.getItem('accessToken') as string)

export const saveAccessTokenToLocalStorage = (accessToken: AccessToken) => {
  window.localStorage.setItem('accessToken', JSON.stringify(accessToken))
}

export function setGraphQlClientAuthHeader(accessToken: AccessToken) {
  graphqlClient.setHeader('Authorization', `Bearer ${accessToken.jwtToken}`)
}

export const purgeAllSessionData = () => {
  window.localStorage.clear()
}
