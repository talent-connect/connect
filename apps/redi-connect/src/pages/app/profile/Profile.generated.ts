// THIS FILE IS GENERATED, DO NOT EDIT!
import * as Types from '@talent-connect/data-access';

import { useQuery, UseQueryOptions } from 'react-query';
import { fetcher } from '@talent-connect/data-access';
export type ProfilePageQueryQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type ProfilePageQueryQuery = { __typename?: 'Query', conProfile: { __typename?: 'ConProfile', id: string, fullName: string, firstName: string, lastName: string, email: string, telephoneNumber?: string | null, linkedInProfileUrl?: string | null, githubProfileUrl?: string | null, slackUsername?: string | null, rediLocation: Types.RediLocation, personalDescription?: string | null, expectations?: string | null, categories: Array<Types.MentoringTopic>, age?: number | null, languages?: Array<Types.ConnectProfileLanguage> | null, mentee_highestEducationLevel?: Types.EducationLevel | null, mentor_occupation?: string | null, gender?: Types.Gender | null, mentee_occupationCategoryId?: Types.OccupationCategory | null } };


export const ProfilePageQueryDocument = `
    query ProfilePageQuery($id: ID!) {
  conProfile(id: $id) {
    id
    fullName
    firstName
    lastName
    email
    telephoneNumber
    linkedInProfileUrl
    githubProfileUrl
    slackUsername
    rediLocation
    personalDescription
    expectations
    categories
    age
    languages
    mentee_highestEducationLevel
    mentor_occupation
    gender
    mentee_occupationCategoryId
  }
}
    `;
export const useProfilePageQueryQuery = <
      TData = ProfilePageQueryQuery,
      TError = unknown
    >(
      variables: ProfilePageQueryQueryVariables,
      options?: UseQueryOptions<ProfilePageQueryQuery, TError, TData>
    ) =>
    useQuery<ProfilePageQueryQuery, TError, TData>(
      ['ProfilePageQuery', variables],
      fetcher<ProfilePageQueryQuery, ProfilePageQueryQueryVariables>(ProfilePageQueryDocument, variables),
      options
    );

useProfilePageQueryQuery.getKey = (variables: ProfilePageQueryQueryVariables) => ['ProfilePageQuery', variables];
;
