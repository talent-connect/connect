// THIS FILE IS GENERATED, DO NOT EDIT!
import * as Types from '@talent-connect/data-access';

import { useMutation, UseMutationOptions } from 'react-query';
import { fetcher } from '@talent-connect/data-access';
export type TpJobseekerCvPatchMutationVariables = Types.Exact<{
  input: Types.TpJobseekerCvPatchInput;
}>;


export type TpJobseekerCvPatchMutation = { __typename?: 'Mutation', tpJobseekerCvPatch: { __typename?: 'OkResponseMutationOutputDto', ok: boolean } };


export const TpJobseekerCvPatchDocument = `
    mutation tpJobseekerCvPatch($input: TpJobseekerCvPatchInput!) {
  tpJobseekerCvPatch(tpJobseekerCvPatchInput: $input) {
    ok
  }
}
    `;
export const useTpJobseekerCvPatchMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<TpJobseekerCvPatchMutation, TError, TpJobseekerCvPatchMutationVariables, TContext>) =>
    useMutation<TpJobseekerCvPatchMutation, TError, TpJobseekerCvPatchMutationVariables, TContext>(
      ['tpJobseekerCvPatch'],
      (variables?: TpJobseekerCvPatchMutationVariables) => fetcher<TpJobseekerCvPatchMutation, TpJobseekerCvPatchMutationVariables>(TpJobseekerCvPatchDocument, variables)(),
      options
    );