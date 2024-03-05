import { graphqlClient } from '@talent-connect/data-access'
import { AccessToken } from '@talent-connect/shared-types'

export const isLoggedIn = (): boolean => {
  const accessToken: any = window.localStorage.getItem(
    'postSalesforceMigrationAccessToken'
  )
  try {
    const r2: any = JSON.parse(accessToken)
    return Boolean(r2)
  } catch (err) {
    return false
  }
}

// TODO: add | undefined here...
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
  window.localStorage.removeItem('postSalesforceMigrationAccessToken')
}
