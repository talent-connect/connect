import axios from 'axios'
import { API_URL } from '@talent-connect/shared-config'
import { AccessToken } from '@talent-connect/shared-types'
import { RedProfile } from '@talent-connect/shared-types'
import { RedUser } from '@talent-connect/shared-types'
import { RedMatch } from '@talent-connect/shared-types'
import {
  purgeAllSessionData,
  saveRedProfileToLocalStorage as localStorageSaveRedProfile,
  saveRedUserToLocalStorage,
  getRedProfileFromLocalStorage,
  getAccessTokenFromLocalStorage,
  saveAccessTokenToLocalStorage,
} from '../auth/auth'
import { history } from '../history/history'
import { http } from '../http/http'
import {
  UserType,
  RedProblemReportDto,
  RediLocation,
} from '@talent-connect/shared-types'

export const signUp = async (
  email: string,
  password: string,
  redProfile: Partial<RedProfile>
) => {
  email = email.toLowerCase()
  const rediLocation = process.env.NX_REDI_CONNECT_REDI_LOCATION as RediLocation
  redProfile.rediLocation = rediLocation
  const { data: user } = await http(`${API_URL}/redUsers`, {
    method: 'post',
    data: { email, password, rediLocation },
  })
  saveRedUserToLocalStorage(user as RedUser)
  const accessToken = await login(email, password)
  saveAccessTokenToLocalStorage(accessToken)
  const { data: profile } = await http(
    `${API_URL}/redUsers/${user.id}/redProfile`,
    {
      method: 'post',
      data: redProfile,
      headers: {
        Authorization: accessToken.id,
      },
    }
  )
  localStorageSaveRedProfile(profile as RedProfile)
}

export const login = async (
  email: string,
  password: string
): Promise<AccessToken> => {
  const { data } = await http(`${API_URL}/redUsers/login`, {
    method: 'post',
    data: { email: email.toLowerCase(), password },
    headers: { RedProduct: 'CON' },
  })
  return data
}

export const logout = () => {
  purgeAllSessionData()
  history.push('/front/home')
}

export async function requestResetPasswordEmail (email: string): Promise<any> {
  return axios(`${API_URL}/redUsers/requestResetPasswordEmail`, {
    method: 'post',
    data: { email: email.toLowerCase(), redproduct: 'CON' },
  })
}

export const setPassword = async (password: string) => {
  const userId = getAccessTokenFromLocalStorage().userId
  await http(`${API_URL}/redUsers/${userId}`, {
    method: 'patch',
    data: { password },
  })
}

export const fetchSaveRedProfile = async ({ userId, id: token }: AccessToken): Promise<RedProfile> => {
  const profileResp = await http(`${API_URL}/redUsers/${userId}/redProfile`, {
    headers: { Authorization: token, },
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
  redProfile: Partial<RedProfile>
): Promise<RedProfile> => {
  const saveProfileResp = await http(`${API_URL}/redProfiles/${redProfile.id}`, {
    data: redProfile,
    method: 'patch',
  })
  const savedProfile = saveProfileResp.data as RedProfile
  localStorageSaveRedProfile(savedProfile)
  return savedProfile
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
    languages?.length ? { inq: languages } : null
  const filterCategories =
    categories?.length ? { inq: categories } : null
  const filterLocations =
    locations?.length ? { inq: locations } : null

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

// TODO: status: 'applied' here should be matched against RedMatch['status']
export async function fetchApplicants (): Promise<RedProfile[]> {
  return (await http(
    `${API_URL}/redMatches?filter=` +
      JSON.stringify({
        where: {
          mentorId: getRedProfileFromLocalStorage().id,
          status: 'applied',
        },
      })))
    .data
}

export async function requestMentorship (
  applicationText: string,
  expectationText: string,
  mentorId: string
): Promise<RedMatch> {
  return (await http(`${API_URL}/redMatches/requestMentorship`, {
    method: 'post',
    data: { applicationText, expectationText, mentorId },
  }))
    .data
}

export async function reportProblem (problemReport: RedProblemReportDto): Promise<any> {
  const { data } = await http(`${API_URL}/redProblemReports`, {
    method: 'post',
    data: problemReport,
  })
  return data
}
