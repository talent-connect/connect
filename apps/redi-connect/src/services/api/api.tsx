import { API_URL } from '@talent-connect/shared-config'
import {
  AccessToken,
  RediLocation,
  RedMatch,
  RedProblemReportDto,
  RedProfile,
  UserType,
} from '@talent-connect/shared-types'
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

export interface RedProfileFilters {
  userType: UserType
  categories?: string[]
  languages?: string[]
  locations?: string[]
  nameQuery?: string
}

export const getProfiles = ({
  userType,
  categories,
  languages,
  locations,
  nameQuery,
}: RedProfileFilters): Promise<RedProfile[]> => {
  const filterLanguages =
    languages && languages.length !== 0 ? { inq: languages } : undefined
  const filterCategories =
    categories && categories.length !== 0 ? { inq: categories } : undefined
  const filterLocations =
    locations && locations.length !== 0 ? { inq: locations } : undefined

  return http(
    `${API_URL}/redProfiles?filter=${JSON.stringify({
      where: {
        // loopbackComputedDoNotSetElsewhere__forAdminSearch__fullName: {
        //   like: 'Carlotta3',
        //   options: 'i',
        // },
        and: [
          ...String(nameQuery)
            .split(' ')
            .map((word) => ({
              loopbackComputedDoNotSetElsewhere__forAdminSearch__fullName: {
                like: word,
                options: 'i',
              },
            })),
          { userType },
          { languages: filterLanguages },
          { categories: filterCategories },
          { rediLocation: filterLocations },
          { userActivated: true },
        ],
      },
      order: 'createdAt DESC',
      limit: 0,
    })}`
  ).then((resp) => resp.data)
}

export const getMentors = ({
  categories,
  languages,
  locations,
  nameQuery,
}: Partial<RedProfileFilters>) =>
  getProfiles({
    userType: 'mentor',
    categories,
    languages,
    locations,
    nameQuery,
  })

export const getMentees = () => getProfiles({ userType: 'mentee' })

export const getProfile = (profileId: string): Promise<RedProfile> =>
  http(`${API_URL}/redProfiles/${profileId}`).then((resp) => resp.data)

export const requestMentorship = (
  applicationText: string,
  expectationText: string,
  mentorId: string
): Promise<RedMatch> =>
  http(`${API_URL}/redMatches/requestMentorship`, {
    method: 'post',
    data: { applicationText, expectationText, mentorId },
  }).then((resp) => resp.data)

export const reportProblem = async (
  problemReport: RedProblemReportDto
): Promise<any> =>
  http(`${API_URL}/redProblemReports`, {
    method: 'post',
    data: problemReport,
  }).then((resp) => resp.data)
