// THIS FILE IS GENERATED, DO NOT EDIT!
import * as Types from '@talent-connect/data-access';

import { useMutation, UseMutationOptions } from 'react-query';
import { fetcherForTp } from '@talent-connect/data-access';
export type ApplyForMentorMentorPropFragment = { __typename?: 'ConProfile', id: string, fullName: string, firstName: string };

export type ApplyForMentorshipMutationVariables = Types.Exact<{
  input: Types.ConMentorshipMatchesApplyForMentorshipInputDto;
}>;


export type ApplyForMentorshipMutation = { __typename?: 'Mutation', conMentorshipMatchesApplyForMentorship: { __typename?: 'ConMentorshipMatchesApplyForMentorshipOutputDto', ok: boolean } };

export const ApplyForMentorMentorPropFragmentDoc = `
    fragment ApplyForMentorMentorProp on ConProfile {
  id
  fullName
  firstName
}
    `;
export const ApplyForMentorshipDocument = `
    mutation applyForMentorship($input: ConMentorshipMatchesApplyForMentorshipInputDto!) {
  conMentorshipMatchesApplyForMentorship(input: $input) {
    ok
  }
}
    `;
export const useApplyForMentorshipMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<ApplyForMentorshipMutation, TError, ApplyForMentorshipMutationVariables, TContext>) =>
    useMutation<ApplyForMentorshipMutation, TError, ApplyForMentorshipMutationVariables, TContext>(
      ['applyForMentorship'],
      (variables?: ApplyForMentorshipMutationVariables) => fetcherForTp<ApplyForMentorshipMutation, ApplyForMentorshipMutationVariables>(ApplyForMentorshipDocument, variables)(),
      options
    ););