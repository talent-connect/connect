// THIS FILE IS GENERATED, DO NOT EDIT!
import * as Types from '@talent-connect/data-access';

import { useMutation, UseMutationOptions } from 'react-query';
import { fetcherForTp } from '@talent-connect/data-access';
export type ConProfileSignUpMutationVariables = Types.Exact<{
  input: Types.ConProfileSignUpInput;
}>;


export type ConProfileSignUpMutation = { __typename?: 'Mutation', conProfileSignUp: { __typename?: 'OkIdResponseMutationOutputDto', id: string } };


export const ConProfileSignUpDocument = `
    mutation conProfileSignUp($input: ConProfileSignUpInput!) {
  conProfileSignUp(input: $input) {
    id
  }
}
    `;
export const useConProfileSignUpMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<ConProfileSignUpMutation, TError, ConProfileSignUpMutationVariables, TContext>) =>
    useMutation<ConProfileSignUpMutation, TError, ConProfileSignUpMutationVariables, TContext>(
      ['conProfileSignUp'],
      (variables?: ConProfileSignUpMutationVariables) => fetcherForTp<ConProfileSignUpMutation, ConProfileSignUpMutationVariables>(ConProfileSignUpDocument, variables)(),
      options
    ););