// THIS FILE IS GENERATED, DO NOT EDIT!
import * as Types from '@talent-connect/data-access';

import { useQuery, UseQueryOptions } from 'react-query';
import { fetcher } from '@talent-connect/data-access';
export type FindAvailableMentorsQueryVariables = Types.Exact<{
  filter: Types.FindConProfilesArgsFilter;
}>;


export type FindAvailableMentorsQuery = { __typename?: 'Query', conProfilesAvailableMentors: Array<{ __typename?: 'ConProfile', id: string, userType: Types.UserType, firstName: string, lastName: string, categories: Array<Types.MentoringTopic>, languages?: Array<Types.ConnectProfileLanguage> | null, fullName: string, rediLocation: Types.RediLocation }> };


export const FindAvailableMentorsDocument = `
    query findAvailableMentors($filter: FindConProfilesArgsFilter!) {
  conProfilesAvailableMentors(filter: $filter) {
    id
    userType
    firstName
    lastName
    categories
    languages
    fullName
    rediLocation
  }
}
    `;
export const useFindAvailableMentorsQuery = <
      TData = FindAvailableMentorsQuery,
      TError = unknown
    >(
      variables: FindAvailableMentorsQueryVariables,
      options?: UseQueryOptions<FindAvailableMentorsQuery, TError, TData>
    ) =>
    useQuery<FindAvailableMentorsQuery, TError, TData>(
      ['findAvailableMentors', variables],
      fetcher<FindAvailableMentorsQuery, FindAvailableMentorsQueryVariables>(FindAvailableMentorsDocument, variables),
      options
    );

useFindAvailableMentorsQuery.getKey = (variables: FindAvailableMentorsQueryVariables) => ['findAvailableMentors', variables];
;
