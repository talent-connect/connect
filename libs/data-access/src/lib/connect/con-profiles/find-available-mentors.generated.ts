// THIS FILE IS GENERATED, DO NOT EDIT!
import * as Types from '@talent-connect/data-access';

import { useQuery, UseQueryOptions } from 'react-query';
import { fetcherForTp } from '@talent-connect/data-access';
export type FindAvailableMentorsQueryVariables = Types.Exact<{
  filter: Types.FindConProfilesArgsFilter;
}>;


export type FindAvailableMentorsQuery = { __typename?: 'Query', conProfilesAvailableMentors: Array<{ __typename?: 'ConProfile', id: string, userType: Types.UserType, firstName: string, lastName: string, categories: Array<Types.MentoringTopic>, languages?: Array<Types.Language> | null, fullName: string, rediLocation: Types.RediLocation, profileAvatarImageS3Key?: string | null, optOutOfMenteesFromOtherRediLocation: boolean }> };


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
    profileAvatarImageS3Key
    optOutOfMenteesFromOtherRediLocation
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
      fetcherForTp<FindAvailableMentorsQuery, FindAvailableMentorsQueryVariables>(FindAvailableMentorsDocument, variables),
      options
    );

useFindAvailableMentorsQuery.getKey = (variables: FindAvailableMentorsQueryVariables) => ['findAvailableMentors', variables];
;
;
