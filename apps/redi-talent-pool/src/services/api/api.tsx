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
  isJobFair2022Participant: boolean
}

export async function fetchAllTpJobSeekerProfiles({
  name,
  skills: topSkills,
  desiredPositions,
  isJobFair2022Participant,
}: TpJobSeekerProfileFilters): Promise<Array<Partial<TpJobSeekerProfile>>> {
  const filterTopSkills =
    topSkills?.length ? { inq: topSkills } : null
  const filterDesiredPositions =
    desiredPositions?.length ? { inq: desiredPositions } : null
  const filterJobFair2022Participant = isJobFair2022Participant
    ? { isJobFair2022Participant: true }
    : null

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
          { ...filterJobFair2022Participant },
        ],
      },
      order: 'createdAt DESC',
      limit: 0,
    })}`
  ).then(({ data }) =>
    data.filter((p) => p.isProfileVisibleToCompanies && p.state === 'profile-approved')
  )
}

export async function fetchCurrentUserTpJobSeekerProfile(): Promise<
  Partial<TpJobSeekerProfile>
> {
  const { userId } = getAccessTokenFromLocalStorage()
  return (await http(`${API_URL}/redUsers/${userId}/tpJobSeekerProfile`)).data
}

export async function updateCurrentUserTpJobSeekerProfile(
  profile: Partial<TpJobSeekerProfile>
): Promise<Partial<TpJobSeekerProfile>> {
  const { userId } = getAccessTokenFromLocalStorage()
  return (await http(`${API_URL}/redUsers/${userId}/tpJobSeekerProfile`, {
    method: 'put',
    data: profile,
  })).data
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
    return (await http(`${API_URL}/redUsers/${userId}/tpJobSeekerCv`, {
      method: 'post',
      data,
    })).data
  }
}

export function updateCurrentUserTpJobSeekerCv(id: string) {
  return async function (
    data: Partial<TpJobSeekerCv>
  ): Promise<Partial<TpJobSeekerCv>> {
    const { userId } = getAccessTokenFromLocalStorage()
    return (await http(
      `${API_URL}/redUsers/${userId}/tpJobSeekerCv/${id}`,
      { method: 'put', data }
    )).data
  }
}

export function deleteCurrentUserTpJobSeekerCv(id: string) {
  return async function () {
    const { userId } = getAccessTokenFromLocalStorage()
    return (await http(
      `${API_URL}/redUsers/${userId}/tpJobSeekerCv/${id}`,
      { method: 'delete' }
    )).data
  }
}

export async function fetchCurrentUserTpCompanyProfile(): Promise<
  Partial<TpCompanyProfile>
> {
  const { userId } = getAccessTokenFromLocalStorage()
  return (await http(`${API_URL}/redUsers/${userId}/tpCompanyProfile`)).data
}

export async function updateCurrentUserTpCompanyProfile(
  profile: Partial<TpCompanyProfile>
): Promise<Partial<TpCompanyProfile>> {
  const { userId } = getAccessTokenFromLocalStorage()
  return (await http(`${API_URL}/redUsers/${userId}/tpCompanyProfile`, {
    method: 'put',
    data: profile,
  })).data
}

export interface TpJobListingFilters {
  idealTechnicalSkills: string[]
  employmentType: string[]
  isJobFair2022JobListing: boolean
}

export async function fetchAllTpJobListingsUsingFilters({
  idealTechnicalSkills,
  employmentType,
  isJobFair2022JobListing,
}: TpJobListingFilters): Promise<Array<Partial<TpJobSeekerProfile>>> {
  const filterIdealTechnicalSkills =
    idealTechnicalSkills?.length
      ? { inq: idealTechnicalSkills }
      : null

  const filterDesiredEmploymentTypeOptions =
    employmentType?.length ? { inq: employmentType } : null

  const filterJobFair2022JobListings = isJobFair2022JobListing
    ? { isJobFair2022JobListing: true }
    : null

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
            ...filterJobFair2022JobListings,
          },
        ],
      },
      order: 'createdAt DESC',
      limit: 0,
    })}`
  ).then((resp) => resp.data.filter((listing) => !listing.dummy))
}

export async function fetchAllTpJobListings(): Promise<TpJobListing[]> {
  const { userId } = getAccessTokenFromLocalStorage()
  const { data } = await http(`${API_URL}/redUsers/${userId}/tpJobListings`)

  // TODO: remove the `.filter()`. It
  // was inserted temporarily for the "dummy" job listings we created for HR Summit
  // 2021. Once the event is over, they can be removed from database completely.
  // Reason for filter here is so companies don't see these dummy job listings.
  return data.filter((listing) => !listing.dummy)
}

export async function fetchOneTpJobListingOfCurrentUser(
  id: string
): Promise<TpJobListing> {
  const { userId } = getAccessTokenFromLocalStorage()
  return (await http(`${API_URL}/redUsers/${userId}/tpJobListings/${id}`)).data
}

export async function fetchOneTpJobListing(id: string): Promise<TpJobListing> {
  return (await http(`${API_URL}/tpJobListings/${id}`)).data
}

export async function createCurrentUserTpJobListing(
  jobListing: Partial<TpJobListing>
): Promise<Partial<TpJobListing>> {
  const { userId } = getAccessTokenFromLocalStorage()
  return (await http(`${API_URL}/redUsers/${userId}/tpJobListings`, {
    method: 'post',
    data: jobListing,
  })).data
}

export async function updateCurrentUserTpJobListing(
  jobListing: Partial<TpJobListing>
): Promise<Partial<TpJobListing>> {
  const { userId } = getAccessTokenFromLocalStorage()
  return (await http(
    `${API_URL}/redUsers/${userId}/tpJobListings/${jobListing.id}`,
    {
      method: 'put',
      data: jobListing,
    }
  )).data
}

export async function deleteCurrentUserTpJobListing(
  jobListingId: string
): Promise<Partial<TpJobListing>> {
  const { userId } = getAccessTokenFromLocalStorage()
  return (await http(
    `${API_URL}/redUsers/${userId}/tpJobListings/${jobListingId}`,
    {
      method: 'delete',
    }
  )).data
}

export async function fetchAllTpJobFair2021InterviewMatches_tpJobListings(): Promise<TpJobListing[]> {
  const { data: interviewMatches } = await http(`${API_URL}/tpJobfair2021InterviewMatches`)
  return interviewMatches.map((match) => match.jobListing)
}

export async function fetchAllTpJobFair2021InterviewMatches_tpJobSeekerProfiles(): Promise<TpJobSeekerProfile[]> {
  const { data: interviewMatches } = await http(`${API_URL}/tpJobfair2021InterviewMatches`)
  return interviewMatches.map((match) => match.interviewee)
}

export async function fetchTpJobSeekerProfileById(id: string): Promise<Partial<TpJobSeekerProfile>> {
  return (await http(`${API_URL}/tpJobSeekerProfiles/${id}`)).data
}
