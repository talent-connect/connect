import { API_URL } from '@talent-connect/shared-config'
import {
  AccessToken,
  RedUser,
  TpCompanyProfile,
  TpJobSeekerCv,
  TpJobListing,
  TpJobSeekerProfile,
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

export const signUpJobSeeker = async (
  email: string,
  password: string,
  tpJobSeekerProfile: Partial<TpJobSeekerProfile>
) => {
  email = email.toLowerCase()
  const userResponse = await http(`${API_URL}/redUsers`, {
    method: 'post',
    data: { email, password },
  })
  const user = userResponse.data as RedUser
  saveRedUserToLocalStorage(user)
  const accessToken = await login(email, password)
  saveAccessTokenToLocalStorage(accessToken)
  const createProfileResponse = await http(
    `${API_URL}/redUsers/${user.id}/tpJobSeekerProfile`,
    {
      method: 'post',
      data: tpJobSeekerProfile,
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
  email = email.toLowerCase()
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
  email = email.toLowerCase()
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

export interface TpJobSeekerProfileFilters {
  name: string
  skills: string[]
  desiredPositions: string[]
}

export async function fetchAllTpJobSeekerProfiles({
  name,
  skills: topSkills,
  desiredPositions,
}: TpJobSeekerProfileFilters): Promise<Partial<TpJobSeekerProfile>[]> {
  const filterTopSkills =
    topSkills?.length ? { inq: topSkills } : null
  const filterDesiredPositions =
    desiredPositions?.length ? { inq: desiredPositions } : null

  return http(
    `${API_URL}/tpJobSeekerProfiles?filter=${JSON.stringify({
      where: {
        // loopbackComputedDoNotSetElsewhere__forAdminSearch__fullName: {
        //   like: 'Carlotta3',
        //   options: 'i',
        // },
        and: [
          ...String(name)
            .split(' ')
            .map((word) => ({
              loopbackComputedDoNotSetElsewhere__forAdminSearch__fullName: {
                like: word,
                options: 'i',
              },
            })),
          { topSkills: filterTopSkills },
          { desiredPositions: filterDesiredPositions },
        ],
      },
      order: 'createdAt DESC',
      limit: 0,
    })}`
  ).then(({ data }) =>
    data.filter((p) =>
        p.isProfileVisibleToCompanies &&
        [
          'profile-approved-awaiting-job-preferences',
          'job-preferences-shared-with-redi-awaiting-interview-match',
        ].includes(p.state)
    )
  )
}

export async function fetchCurrentUserTpJobSeekerProfile(): Promise<
  Partial<TpJobSeekerProfile>
> {
  const { userId } = getAccessTokenFromLocalStorage()
  const resp = await http(`${API_URL}/redUsers/${userId}/tpJobSeekerProfile`)
  return resp.data
}

export async function updateCurrentUserTpJobSeekerProfile(
  profile: Partial<TpJobSeekerProfile>
): Promise<Partial<TpJobSeekerProfile>> {
  const { userId } = getAccessTokenFromLocalStorage()
  const resp = await http(`${API_URL}/redUsers/${userId}/tpJobSeekerProfile`, {
    method: 'put',
    data: profile,
  })
  return resp.data
}

export async function fetchAllCurrentUserTpJobSeekerCv(): Promise<Partial<TpJobSeekerCv>[]> {
  const { userId } = getAccessTokenFromLocalStorage()
  return (await http(`${API_URL}/redUsers/${userId}/tpJobSeekerCv`)).data
}

export async function fetchCurrentUserTpJobSeekerCvById(
  id: string
): Promise<Partial<TpJobSeekerCv>> {
  const { userId } = getAccessTokenFromLocalStorage()
  return (await http(`${API_URL}/redUsers/${userId}/tpJobSeekerCv/${id}`)).data
}

export function createCurrentUserTpJobSeekerCv() {
  return async function (
    data: Partial<TpJobSeekerCv>
  ): Promise<Partial<TpJobSeekerCv>> {
    const { userId } = getAccessTokenFromLocalStorage()
    const resp = await http(`${API_URL}/redUsers/${userId}/tpJobSeekerCv`, {
      method: 'post',
      data,
    })
    return resp.data
  }
}

export function updateCurrentUserTpJobSeekerCv(id: string) {
  return async function (
    data: Partial<TpJobSeekerCv>
  ): Promise<Partial<TpJobSeekerCv>> {
    const { userId } = getAccessTokenFromLocalStorage()
    const resp = await http(
      `${API_URL}/redUsers/${userId}/tpJobSeekerCv/${id}`,
      { method: 'put', data }
    )
    return resp.data
  }
}

export function deleteCurrentUserTpJobSeekerCv(id: string) {
  return async function () {
    const { userId } = getAccessTokenFromLocalStorage()
    const resp = await http(
      `${API_URL}/redUsers/${userId}/tpJobSeekerCv/${id}`,
      { method: 'delete' }
    )
    return resp.data
  }
}

export async function fetchCurrentUserTpCompanyProfile(): Promise<
  Partial<TpCompanyProfile>
> {
  const { userId } = getAccessTokenFromLocalStorage()
  const resp = await http(`${API_URL}/redUsers/${userId}/tpCompanyProfile`)
  return resp.data
}

export async function updateCurrentUserTpCompanyProfile(
  profile: Partial<TpCompanyProfile>
): Promise<Partial<TpCompanyProfile>> {
  const { userId } = getAccessTokenFromLocalStorage()
  const resp = await http(`${API_URL}/redUsers/${userId}/tpCompanyProfile`, {
    method: 'put',
    data: profile,
  })
  return resp.data
}

export interface TpJobListingFilters {
  idealTechnicalSkills: string[]
  employmentType: string[]
}

export async function fetchAllTpJobListingsUsingFilters({
  idealTechnicalSkills,
  employmentType,
}: TpJobListingFilters): Promise<Partial<TpJobSeekerProfile>[]> {
  const filterIdealTechnicalSkills =
    idealTechnicalSkills?.length ? { inq: idealTechnicalSkills } : null
  const filterDesiredEmploymentTypeOptions =
    employmentType?.length ? { inq: employmentType } : null

  return http(
    `${API_URL}/tpJobListings?filter=${JSON.stringify({
      where: {
        // loopbackComputedDoNotSetElsewhere__forAdminSearch__fullName: {
        //   like: 'Carlotta3',
        //   options: 'i',
        // },
        and: [
          {
            idealTechnicalSkills: filterIdealTechnicalSkills,
            employmentType: filterDesiredEmploymentTypeOptions,
          },
        ],
      },
      order: 'createdAt DESC',
      limit: 0,
    })}`
  ).then((resp) => resp.data.filter((listing) => !listing.dummy))
}

export async function fetchAllTpJobListings(): Promise<TpJobListing[]> {
  const userId = getAccessTokenFromLocalStorage().userId
  const resp = await http(`${API_URL}/redUsers/${userId}/tpJobListings`)

  // TODO: remove the `.filter()`. It
  // was inserted temporarily for the "dummy" job listings we created for HR Summit
  // 2021. Once the event is over, they can be removed from database completely.
  // Reason for filter here is so companies don't see these dummy job listings.
  return resp.data.filter((listing) => !listing.dummy)
}

export async function fetchOneTpJobListingOfCurrentUser(
  id: string
): Promise<TpJobListing> {
  const userId = getAccessTokenFromLocalStorage().userId
  const resp = await http(`${API_URL}/redUsers/${userId}/tpJobListings/${id}`)
  return resp.data
}

export async function fetchOneTpJobListing(id: string): Promise<TpJobListing> {
  const resp = await http(`${API_URL}/tpJobListings/${id}`)
  return resp.data
}

export async function createCurrentUserTpJobListing(
  jobListing: Partial<TpJobListing>
): Promise<Partial<TpJobListing>> {
  const userId = getAccessTokenFromLocalStorage().userId
  const resp = await http(`${API_URL}/redUsers/${userId}/tpJobListings`, {
    method: 'post',
    data: jobListing,
  })
  return resp.data
}

export async function updateCurrentUserTpJobListing(
  jobListing: Partial<TpJobListing>
): Promise<Partial<TpJobListing>> {
  const userId = getAccessTokenFromLocalStorage().userId
  const resp = await http(
    `${API_URL}/redUsers/${userId}/tpJobListings/${jobListing.id}`,
    {
      method: 'put',
      data: jobListing,
    }
  )
  return resp.data
}

export async function deleteCurrentUserTpJobListing(
  jobListingId: string
): Promise<Partial<TpJobListing>> {
  const userId = getAccessTokenFromLocalStorage().userId
  const resp = await http(
    `${API_URL}/redUsers/${userId}/tpJobListings/${jobListingId}`,
    {
      method: 'delete',
    }
  )
  return resp.data
}

export async function fetchAllTpJobFair2021InterviewMatches_tpJobListings(): Promise<TpJobListing[]> {
  const { data: interviewMatches } = await http(`${API_URL}/tpJobfair2021InterviewMatches`)
  const jobListings: TpJobListing[] = interviewMatches.map((match) => match.jobListing)
  return jobListings
}

export async function fetchAllTpJobFair2021InterviewMatches_tpJobSeekerProfiles(): Promise<TpJobSeekerProfile[]> {
  const { data: interviewMatches } = await http(`${API_URL}/tpJobfair2021InterviewMatches`)
  const jobseekerProfiles: TpJobSeekerProfile[] = interviewMatches.map((match) => match.interviewee)
  return jobseekerProfiles
}

export async function fetchTpJobSeekerProfileById(id: string): Promise<Partial<TpJobSeekerProfile>> {
  return (await http(`${API_URL}/tpJobSeekerProfiles/${id}`)).data
}
