// THIS FILE IS GENERATED, DO NOT EDIT!
import * as Types from '@talent-connect/data-access';

import { useMutation, UseMutationOptions } from 'react-query';
import { fetcher } from '@talent-connect/data-access';
export type TpJobseekerCvDeleteMutationVariables = Types.Exact<{
  input: Types.TpJobseekerCvDeleteInput;
}>;


export type TpJobseekerCvDeleteMutation = { __typename?: 'Mutation', tpJobseekerCvDelete: { __typename?: 'OkResponseMutationOutputDto', ok: boolean } };


export const TpJobseekerCvDeleteDocument = `
    mutation tpJobseekerCvDelete($input: TpJobseekerCvDeleteInput!) {
  tpJobseekerCvDelete(tpJobseekerCvDeleteInput: $input) {
    ok
  }
}
    `;
export const useTpJobseekerCvDeleteMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<TpJobseekerCvDeleteMutation, TError, TpJobseekerCvDeleteMutationVariables, TContext>) =>
    useMutation<TpJobseekerCvDeleteMutation, TError, TpJobseekerCvDeleteMutationVariables, TContext>(
      ['tpJobseekerCvDelete'],
      (variables?: TpJobseekerCvDeleteMutationVariables) => fetcher<TpJobseekerCvDeleteMutation, TpJobseekerCvDeleteMutationVariables>(TpJobseekerCvDeleteDocument, variables)(),
      options
    );