// THIS FILE IS GENERATED, DO NOT EDIT!
import * as Types from '@talent-connect/data-access'

import { fetcher } from '@talent-connect/data-access'
import { useQuery, UseQueryOptions } from 'react-query'
export type LoadVisibleJobseekerProfilesQueryVariables = Types.Exact<{
  filter: Types.FindAllVisibleTpJobseekerProfilesArgsFilter
}>

export type LoadVisibleJobseekerProfilesQuery = {
  __typename?: 'Query'
  tpJobseekerProfiles: Array<{
    __typename?: 'TpJobseekerProfile'
    id: string
    fullName: string
    firstName: string
    lastName: string
    aboutYourself?: string | null
    email: string
  }>
}

export const LoadVisibleJobseekerProfilesDocument = `
    query loadVisibleJobseekerProfiles($filter: FindAllVisibleTpJobseekerProfilesArgsFilter!) {
  tpJobseekerProfiles(filter: $filter) {
    id
    fullName
    firstName
    lastName
    aboutYourself
    email
  }
}
    `
export const useLoadVisibleJobseekerProfilesQuery = <
  TData = LoadVisibleJobseekerProfilesQuery,
  TError = unknown
>(
  variables: LoadVisibleJobseekerProfilesQueryVariables,
  options?: UseQueryOptions<LoadVisibleJobseekerProfilesQuery, TError, TData>
) =>
  useQuery<LoadVisibleJobseekerProfilesQuery, TError, TData>(
    ['loadVisibleJobseekerProfiles', variables],
    fetcher<
      LoadVisibleJobseekerProfilesQuery,
      LoadVisibleJobseekerProfilesQueryVariables
    >(LoadVisibleJobseekerProfilesDocument, variables),
    options
  )

useLoadVisibleJobseekerProfilesQuery.getKey = (
  variables: LoadVisibleJobseekerProfilesQueryVariables
) => ['loadVisibleJobseekerProfiles', variables]
