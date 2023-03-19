// THIS FILE IS GENERATED, DO NOT EDIT!
import * as Types from '@talent-connect/data-access';

import { useQuery, UseQueryOptions } from 'react-query';
import { fetcher } from '@talent-connect/data-access';
export type LoadVisibleJobseekerProfilesQueryVariables = Types.Exact<{
  filter: Types.FindAllVisibleTpJobseekerDirectoryEntriesFilter;
}>;


export type LoadVisibleJobseekerProfilesQuery = { __typename?: 'Query', tpJobseekerDirectoryEntriesVisible: Array<{ __typename?: 'TpJobseekerDirectoryEntry', id: string, fullName: string, firstName: string, lastName: string, aboutYourself?: string | null, email: string }> };


export const LoadVisibleJobseekerProfilesDocument = `
    query loadVisibleJobseekerProfiles($filter: FindAllVisibleTpJobseekerDirectoryEntriesFilter!) {
  tpJobseekerDirectoryEntriesVisible(filter: $filter) {
    id
    fullName
    firstName
    lastName
    aboutYourself
    email
  }
}
    `;
export const useLoadVisibleJobseekerProfilesQuery = <
      TData = LoadVisibleJobseekerProfilesQuery,
      TError = unknown
    >(
      variables: LoadVisibleJobseekerProfilesQueryVariables,
      options?: UseQueryOptions<LoadVisibleJobseekerProfilesQuery, TError, TData>
    ) =>
    useQuery<LoadVisibleJobseekerProfilesQuery, TError, TData>(
      ['loadVisibleJobseekerProfiles', variables],
      fetcher<LoadVisibleJobseekerProfilesQuery, LoadVisibleJobseekerProfilesQueryVariables>(LoadVisibleJobseekerProfilesDocument, variables),
      options
    );

useLoadVisibleJobseekerProfilesQuery.getKey = (variables: LoadVisibleJobseekerProfilesQueryVariables) => ['loadVisibleJobseekerProfiles', variables];
;
