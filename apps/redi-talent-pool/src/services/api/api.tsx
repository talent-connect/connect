import { API_URL } from '@talent-connect/shared-config'
import {
  AccessToken,
  RedUser,
  TpCompanyProfile,
  TpJobseekerProfile,
} from '@talent-connect/shared-types'
import axios from 'axios'
import { QueryClient } from 'react-query'
import {
  getAccessTokenFromLocalStorage,
  purgeAllSessionData,
  saveAccessTokenToLocalStorage,
  saveRedUserToLocalStorage,
} from '../auth/auth'
import { history } from '../history/history'
import { http } from '../http/http'

export const queryClient = new QueryClient()

export const signUpJobseeker = async (
  email: string,
  password: string,
  tpJobseekerProfile: Partial<TpJobseekerProfile>
) => {
  console.log('sign up')
  const userResponse = await http(`${API_URL}/redUsers`, {
    method: 'post',
    data: { email, password },
  })
  const user = userResponse.data as RedUser
  saveRedUserToLocalStorage(user)
  const accessToken = await login(email, password)
  saveAccessTokenToLocalStorage(accessToken)
  const createProfileResponse = await http(
    `${API_URL}/redUsers/${user.id}/tpJobseekerProfile`,
    {
      method: 'post',
      data: tpJobseekerProfile,
      headers: {
        Authorization: accessToken.id,
      },
    }
  )
}

export const signUpCompany = async (
  email: string,
  password: string,
  tpCompanyProfile: Partial<TpCompanyProfile>
) => {
  console.log('sign up')
  const userResponse = await http(`${API_URL}/redUsers`, {
    method: 'post',
    data: { email, password },
  })
  const user = userResponse.data as RedUser
  saveRedUserToLocalStorage(user)
  const accessToken = await login(email, password)
  saveAccessTokenToLocalStorage(accessToken)
  const createProfileResponse = await http(
    `${API_URL}/redUsers/${user.id}/tpCompanyProfile`,
    {
      method: 'post',
      data: tpCompanyProfile,
      headers: {
        Authorization: accessToken.id,
      },
    }
  )
}

export const login = async (
  email: string,
  password: string
): Promise<AccessToken> => {
  const loginResp = await http(`${API_URL}/redUsers/login`, {
    method: 'post',
    data: { email, password },
    headers: {
      RedProduct: 'TP',
    },
  })
  const accessToken = loginResp.data as AccessToken
  return accessToken
}

export const logout = () => {
  purgeAllSessionData()
  history.push('/front/home')
}

export const requestResetPasswordEmail = async (email: string) => {
  await axios(`${API_URL}/redUsers/requestResetPasswordEmail`, {
    method: 'post',
    data: { email, redproduct: 'TP' },
  })
}

export const setPassword = async (password: string) => {
  const userId = getAccessTokenFromLocalStorage().userId
  await http(`${API_URL}/redUsers/${userId}`, {
    method: 'patch',
    data: { password },
  })
}

export async function fetchCurrentUserTpJobseekerProfile(): Promise<
  Partial<TpJobseekerProfile>
> {
  const userId = getAccessTokenFromLocalStorage().userId
  const resp = await http(`${API_URL}/redUsers/${userId}/tpJobseekerProfile`)
  return resp.data
}

export async function updateCurrentUserTpJobseekerProfile(
  profile: Partial<TpJobseekerProfile>
): Promise<Partial<TpJobseekerProfile>> {
  const userId = getAccessTokenFromLocalStorage().userId
  const resp = await http(`${API_URL}/redUsers/${userId}/tpJobseekerProfile`, {
    method: 'put',
    data: profile,
  })
  return resp.data
}

export async function fetchCurrentUserTpCompanyProfile(): Promise<
  Partial<TpCompanyProfile>
> {
  const userId = getAccessTokenFromLocalStorage().userId
  const resp = await http(`${API_URL}/redUsers/${userId}/tpCompanyProfile`)
  return resp.data
}

export async function updateCurrentUserTpCompanyProfile(
  profile: Partial<TpCompanyProfile>
): Promise<Partial<TpCompanyProfile>> {
  const userId = getAccessTokenFromLocalStorage().userId
  const resp = await http(`${API_URL}/redUsers/${userId}/tpCompanyProfile`, {
    method: 'put',
    data: profile,
  })
  return resp.data
}
