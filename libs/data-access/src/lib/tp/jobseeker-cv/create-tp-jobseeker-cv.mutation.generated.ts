// THIS FILE IS GENERATED, DO NOT EDIT!
import * as Types from '@talent-connect/data-access';

import { useMutation, UseMutationOptions } from 'react-query';
import { fetcher } from '@talent-connect/data-access';
export type TpJobseekerCvCreateMutationVariables = Types.Exact<{
  input: Types.TpJobseekerCvCreateInput;
}>;


export type TpJobseekerCvCreateMutation = { __typename?: 'Mutation', tpJobseekerCvCreate: { __typename?: 'OkIdResponseMutationOutputDto', id: string, ok: boolean } };


export const TpJobseekerCvCreateDocument = `
    mutation tpJobseekerCvCreate($input: TpJobseekerCvCreateInput!) {
  tpJobseekerCvCreate(tpJobseekerCvCreateInput: $input) {
    id
    ok
  }
}
    `;
export const useTpJobseekerCvCreateMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<TpJobseekerCvCreateMutation, TError, TpJobseekerCvCreateMutationVariables, TContext>) =>
    useMutation<TpJobseekerCvCreateMutation, TError, TpJobseekerCvCreateMutationVariables, TContext>(
      ['tpJobseekerCvCreate'],
      (variables?: TpJobseekerCvCreateMutationVariables) => fetcher<TpJobseekerCvCreateMutation, TpJobseekerCvCreateMutationVariables>(TpJobseekerCvCreateDocument, variables)(),
      options
    );