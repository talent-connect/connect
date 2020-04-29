import axios from 'axios'
import { API_URL } from '../../config/config'
import { AccessToken } from '../../types/AccessToken'
import { RedProfile } from '../../types/RedProfile'
import { RedUser } from '../../types/RedUser'
import { RedMatch } from '../../types/RedMatch'
import {
  purgeAllSessionData,
  saveRedProfile as localStorageSaveRedProfile,
  saveRedUser,
  getRedProfile,
  getAccessToken
} from '../auth/auth'
import { history } from '../history/history'
import { http } from '../http/http'
import { UserType } from '../../types/UserType'
import { RedProblemReportDto } from '../../types/RedProblemReportDto'

export const signUp = async (
  email: string,
  password: string,
  redProfile: Partial<RedProfile>
) => {
  const userResponse = await http(`${API_URL}/redUsers`, {
    method: 'post',
    data: { email, password }
  })
  const user = userResponse.data as RedUser
  saveRedUser(user)
  const accessToken = await login(email, password)
  const profileResponse = await http(
    `${API_URL}/redUsers/${user.id}/redProfile`,
    {
      method: 'post',
      data: redProfile,
      headers: {
        Authorization: accessToken.id
      }
    }
  )
  const profile = profileResponse.data as RedProfile
  localStorageSaveRedProfile(profile)
}

export const login = async (
  email: string,
  password: string
): Promise<AccessToken> => {
  const loginResp = await http(`${API_URL}/redUsers/login`, {
    method: 'post',
    data: { email, password }
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
    data: { email }
  })
}

export const setPassword = async (password: string) => {
  const userId = getAccessToken().userId
  await http(`${API_URL}/redUsers/${userId}`, {
    method: 'patch',
    data: { password }
  })
}

export const fetchSaveRedProfile = async (
  accessToken: AccessToken
): Promise<RedProfile> => {
  const { userId, id: token } = accessToken
  const profileResp = await http(`${API_URL}/redUsers/${userId}/redProfile`, {
    headers: {
      Authorization: token
    }
  })
  try {
    const profile = profileResp.data as RedProfile
    localStorageSaveRedProfile(profile)
    return profile
  } catch (err) {
    console.log('trowing')
    throw new Error("I'm throwing an error")
  }
}

export const saveRedProfile = async (
  redProfile: RedProfile
): Promise<RedProfile> => {
  const id = redProfile.id
  const saveProfileResp = await http(`${API_URL}/redProfiles/${id}`, {
    data: redProfile,
    method: 'patch'
  })
  const savedProfile = saveProfileResp.data as RedProfile
  localStorageSaveRedProfile(savedProfile)
  return savedProfile
}

export const getProfiles = (userType: UserType): Promise<RedProfile[]> =>
  http(
    `${API_URL}/redProfiles?filter=${JSON.stringify({
      where: { userType },
      limit: 0
    })}`
  ).then(resp => resp.data)
export const getMentors = () => getProfiles('mentor')
export const getMentees = () => getProfiles('mentee')

export const getProfile = (profileId: string): Promise<RedProfile> =>
  http(`${API_URL}/redProfiles/${profileId}`).then(resp => resp.data)

// TODO: status: 'applied' here should be matched against RedMatch['status']
export const fetchApplicants = async (): Promise<RedProfile[]> =>
  http(
    `${API_URL}/redMatches?filter=` +
    JSON.stringify({
      where: { mentorId: getRedProfile().id, status: 'applied' }
    })
  ).then(resp => resp.data)

export const requestMentorship = (
  applicationText: string,
  mentorId: string
): Promise<RedMatch> =>
  http(`${API_URL}/redMatches/requestMentorship`, {
    method: 'post',
    data: { applicationText, mentorId }
  }).then(resp => resp.data)

export const reportProblem = async (
  problemReport: RedProblemReportDto
): Promise<any> =>
  http(`${API_URL}/redProblemReports`, {
    method: 'post',
    data: problemReport
  }).then(resp => resp.data)
