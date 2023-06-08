// THIS FILE IS GENERATED, DO NOT EDIT!
import * as Types from '@talent-connect/data-access';

import { useMutation, UseMutationOptions } from 'react-query';
import { fetcherForTp } from '@talent-connect/data-access';
export type CompleteMentorshipMutationVariables = Types.Exact<{
  input: Types.ConMentorshipMatchesCompleteMentorshipInputDto;
}>;


export type CompleteMentorshipMutation = { __typename?: 'Mutation', conMentorshipMatchesCompleteMentorship: { __typename?: 'ConMentorshipMatchesCompleteMentorshipOutputDto', ok: boolean } };


export const CompleteMentorshipDocument = `
    mutation completeMentorship($input: ConMentorshipMatchesCompleteMentorshipInputDto!) {
  conMentorshipMatchesCompleteMentorship(input: $input) {
    ok
  }
}
    `;
export const useCompleteMentorshipMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CompleteMentorshipMutation, TError, CompleteMentorshipMutationVariables, TContext>) =>
    useMutation<CompleteMentorshipMutation, TError, CompleteMentorshipMutationVariables, TContext>(
      ['completeMentorship'],
      (variables?: CompleteMentorshipMutationVariables) => fetcherForTp<CompleteMentorshipMutation, CompleteMentorshipMutationVariables>(CompleteMentorshipDocument, variables)(),
      options
    ););