import axios from 'axios'
import { API_URL } from '@talent-connect/shared-config'
import { AccessToken } from '@talent-connect/shared-types'
import { RedProfile } from '@talent-connect/shared-types'
import { RedUser } from '@talent-connect/shared-types'
import { RedMatch } from '@talent-connect/shared-types'
import { purgeAllSessionData, saveRedUser, getAccessToken } from '../auth/auth'
import { history } from '../history/history'
import { http } from '../http/http'
import { UserType } from '@talent-connect/shared-types'

export const signUp = async (
  email: string,
  password: string,
  redProfile: Partial<RedProfile>
) => {
  const userResponse = await http(`${API_URL}/redUsers`, {
    method: 'post',
    data: { email, password },
  })
  const user = userResponse.data as RedUser
  saveRedUser(user)
  const accessToken = await login(email, password)
}

export const login = async (
  email: string,
  password: string
): Promise<AccessToken> => {
  const loginResp = await http(`${API_URL}/redUsers/login`, {
    method: 'post',
    data: { email, password },
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
    data: { email },
  })
}

export const setPassword = async (password: string) => {
  const userId = getAccessToken().userId
  await http(`${API_URL}/redUsers/${userId}`, {
    method: 'patch',
    data: { password },
  })
}
