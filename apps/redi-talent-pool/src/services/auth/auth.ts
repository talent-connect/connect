import { RedUser } from '@talent-connect/shared-types'
import { AccessToken } from '@talent-connect/shared-types'

export const isLoggedIn = (): boolean => {
  const profile: any = window.localStorage.getItem('redProfile')
  try {
    const r1: any = JSON.parse(profile)
    return Boolean(r1)
  } catch (err) {
    return false
  }
}

export const getRedUser = (): RedUser =>
  JSON.parse(window.localStorage.getItem('redUser') as string)

export const saveRedUser = (redUser: RedUser) => {
  window.localStorage.setItem('redUser', JSON.stringify(redUser))
}

export const getAccessToken = (): AccessToken =>
  JSON.parse(window.localStorage.getItem('accessToken') as string)

export const saveAccessToken = (accessToken: AccessToken) => {
  window.localStorage.setItem('accessToken', JSON.stringify(accessToken))
}

export const purgeAllSessionData = () => {
  window.localStorage.clear()
}
