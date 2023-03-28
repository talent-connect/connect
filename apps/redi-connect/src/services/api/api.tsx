import { API_URL } from '@talent-connect/shared-config'
import { AccessToken } from '@talent-connect/shared-types'
import axios from 'axios'
import {
  getAccessTokenFromLocalStorage,
  purgeAllSessionData,
  saveAccessTokenToLocalStorage,
  setGraphQlClientAuthHeader,
} from '../auth/auth'
import { history } from '../history/history'
import { http } from '../http/http'

export const signUpLoopback = async (email: string, password: string) => {
  email = email.toLowerCase()
  const userResponse = await http(`${API_URL}/redUsers`, {
    method: 'post',
    data: {
      email,
      password,
    },
  })
  const accessToken = await login(email, password)
  saveAccessTokenToLocalStorage(accessToken)
}

export const login = async (
  email: string,
  password: string
): Promise<AccessToken> => {
  email = email.toLowerCase()
  const loginResp = await http(`${API_URL}/redUsers/login`, {
    method: 'post',
    data: { email, password },
    headers: {
      RedProduct: 'CON',
    },
  })
  const accessToken = loginResp.data as AccessToken
  saveAccessTokenToLocalStorage(accessToken)
  setGraphQlClientAuthHeader(accessToken)
  return accessToken
}

export const logout = () => {
  purgeAllSessionData()
  history.push('/front/home')
}

export const requestResetPasswordEmail = async (email: string) => {
  email = email.toLowerCase()
  await axios(`${API_URL}/redUsers/requestResetPasswordEmail`, {
    method: 'post',
    data: { email, redproduct: 'CON' },
  })
}

export const setPassword = async (password: string) => {
  const userId = getAccessTokenFromLocalStorage().userId
  await http(`${API_URL}/redUsers/${userId}`, {
    method: 'patch',
    data: { password },
  })
}
