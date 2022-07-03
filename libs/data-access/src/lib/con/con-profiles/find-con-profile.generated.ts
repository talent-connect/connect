// THIS FILE IS GENERATED, DO NOT EDIT!
import * as Types from '@talent-connect/data-access';

import { useQuery, UseQueryOptions } from 'react-query';
import { fetcher } from '@talent-connect/data-access';
export type FindConProfileQueryVariables = Types.Exact<{
  conProfileId: Types.Scalars['ID'];
}>;


export type FindConProfileQuery = { __typename?: 'Query', conProfile: { __typename?: 'ConProfile', _contactId: string, id: string, firstName: string, lastName: string, languages?: Array<Types.ConnectProfileLanguage> | null, categories: Array<Types.MentoringTopic>, rediLocation: Types.RediLocation, profileAvatarImageS3Key?: string | null, email: string, telephoneNumber?: string | null, githubProfileUrl?: string | null, linkedInProfileUrl?: string | null, slackUsername?: string | null } };


export const FindConProfileDocument = `
    query findConProfile($conProfileId: ID!) {
  conProfile(id: $conProfileId) {
    _contactId
    id
    firstName
    lastName
    languages
    categories
    rediLocation
    profileAvatarImageS3Key
    email
    telephoneNumber
    githubProfileUrl
    linkedInProfileUrl
    slackUsername
  }
}
    `;
export const useFindConProfileQuery = <
      TData = FindConProfileQuery,
      TError = unknown
    >(
      variables: FindConProfileQueryVariables,
      options?: UseQueryOptions<FindConProfileQuery, TError, TData>
    ) =>
    useQuery<FindConProfileQuery, TError, TData>(
      ['findConProfile', variables],
      fetcher<FindConProfileQuery, FindConProfileQueryVariables>(FindConProfileDocument, variables),
      options
    );

useFindConProfileQuery.getKey = (variables: FindConProfileQueryVariables) => ['findConProfile', variables];
;
