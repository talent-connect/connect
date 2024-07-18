import { graphqlClient } from '@talent-connect/data-access'
import { AccessToken, RedUser } from '@talent-connect/shared-types'
import { queryClient } from '../api/api'

export const isLoggedIn = (): boolean => {
  const accessToken: any = window.localStorage.getItem(
    'postSalesforceMigrationAccessToken'
  )
  try {
    const r1: any = JSON.parse(accessToken)
    return Boolean(r1)
  } catch (err) {
    return false
  }
}

export const getRedUserFromLocalStorage = (): RedUser =>
  JSON.parse(
    window.localStorage.getItem('postSalesforceMigrationRedUser') as string
  )

export const saveRedUserToLocalStorage = (redUser: RedUser) => {
  window.localStorage.setItem(
    'postSalesforceMigrationRedUser',
    JSON.stringify(redUser)
  )
}

export const getAccessTokenFromLocalStorage = (): AccessToken =>
  JSON.parse(
    window.localStorage.getItem('postSalesforceMigrationAccessToken') as string
  )

export const saveAccessTokenToLocalStorage = (accessToken: AccessToken) => {
  window.localStorage.setItem(
    'postSalesforceMigrationAccessToken',
    JSON.stringify(accessToken)
  )
}

export function setGraphQlClientAuthHeader(accessToken: AccessToken) {
  graphqlClient.setHeader('Authorization', `Bearer ${accessToken.jwtToken}`)
}

export const purgeAllSessionData = () => {
  queryClient.clear()
  window.localStorage.removeItem('postSalesforceMigrationAccessToken')
}
