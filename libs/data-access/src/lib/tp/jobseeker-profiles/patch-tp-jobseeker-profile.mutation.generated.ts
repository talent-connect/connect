// THIS FILE IS GENERATED, DO NOT EDIT!
import * as Types from '@talent-connect/data-access';

import { useMutation, UseMutationOptions } from 'react-query';
import { fetcherForTp } from '@talent-connect/data-access';
export type TpJobseekerProfilePatchMutationVariables = Types.Exact<{
  input: Types.TpJobseekerProfilePatchInput;
}>;


export type TpJobseekerProfilePatchMutation = { __typename?: 'Mutation', tpJobseekerProfilePatch: { __typename?: 'OkResponseMutationOutputDto', ok: boolean } };


export const TpJobseekerProfilePatchDocument = `
    mutation tpJobseekerProfilePatch($input: TpJobseekerProfilePatchInput!) {
  tpJobseekerProfilePatch(tpJobseekerProfilePatchInput: $input) {
    ok
  }
}
    `;
export const useTpJobseekerProfilePatchMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<TpJobseekerProfilePatchMutation, TError, TpJobseekerProfilePatchMutationVariables, TContext>) =>
    useMutation<TpJobseekerProfilePatchMutation, TError, TpJobseekerProfilePatchMutationVariables, TContext>(
      ['tpJobseekerProfilePatch'],
      (variables?: TpJobseekerProfilePatchMutationVariables) => fetcherForTp<TpJobseekerProfilePatchMutation, TpJobseekerProfilePatchMutationVariables>(TpJobseekerProfilePatchDocument, variables)(),
      options
    ););