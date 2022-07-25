// THIS FILE IS GENERATED, DO NOT EDIT!
import * as Types from '@talent-connect/data-access';

import { useQuery, UseQueryOptions } from 'react-query';
import { fetcher } from '@talent-connect/data-access';
export type GetMentorshipMatchesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetMentorshipMatchesQuery = { __typename?: 'Query', conMentorshipMatches: Array<{ __typename?: 'ConMentorshipMatch', id: string, createdAt: any, status: Types.MentorshipMatchStatus, applicationText?: string | null, expectationText?: string | null, mentorId: string, menteeId: string, updatedAt: any, mentor: { __typename?: 'ConProfile', id: string, firstName: string, fullName: string, rediLocation: Types.RediLocation }, mentee: { __typename?: 'ConProfile', id: string, firstName: string, fullName: string, rediLocation: Types.RediLocation } }> };


export const GetMentorshipMatchesDocument = `
    query getMentorshipMatches {
  conMentorshipMatches {
    id
    createdAt
    status
    applicationText
    expectationText
    mentorId
    mentor {
      id
      firstName
      fullName
      rediLocation
    }
    menteeId
    mentee {
      id
      firstName
      fullName
      rediLocation
    }
    updatedAt
  }
}
    `;
export const useGetMentorshipMatchesQuery = <
      TData = GetMentorshipMatchesQuery,
      TError = unknown
    >(
      variables?: GetMentorshipMatchesQueryVariables,
      options?: UseQueryOptions<GetMentorshipMatchesQuery, TError, TData>
    ) =>
    useQuery<GetMentorshipMatchesQuery, TError, TData>(
      variables === undefined ? ['getMentorshipMatches'] : ['getMentorshipMatches', variables],
      fetcher<GetMentorshipMatchesQuery, GetMentorshipMatchesQueryVariables>(GetMentorshipMatchesDocument, variables),
      options
    );

useGetMentorshipMatchesQuery.getKey = (variables?: GetMentorshipMatchesQueryVariables) => variables === undefined ? ['getMentorshipMatches'] : ['getMentorshipMatches', variables];
;
