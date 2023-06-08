// THIS FILE IS GENERATED, DO NOT EDIT!
import * as Types from '@talent-connect/data-access';

import { useMutation, UseMutationOptions } from 'react-query';
import { fetcherForTp } from '@talent-connect/data-access';
export type TpJobseekerProfileLanguageRecordDeleteMutationVariables = Types.Exact<{
  input: Types.TpJobseekerProfileLanguageRecordDeleteInput;
}>;


export type TpJobseekerProfileLanguageRecordDeleteMutation = { __typename?: 'Mutation', tpJobseekerProfileLanguageRecordDelete: { __typename?: 'OkResponseMutationOutputDto', ok: boolean } };


export const TpJobseekerProfileLanguageRecordDeleteDocument = `
    mutation tpJobseekerProfileLanguageRecordDelete($input: TpJobseekerProfileLanguageRecordDeleteInput!) {
  tpJobseekerProfileLanguageRecordDelete(
    tpJobseekerProfileLanguageRecordDeleteInput: $input
  ) {
    ok
  }
}
    `;
export const useTpJobseekerProfileLanguageRecordDeleteMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<TpJobseekerProfileLanguageRecordDeleteMutation, TError, TpJobseekerProfileLanguageRecordDeleteMutationVariables, TContext>) =>
    useMutation<TpJobseekerProfileLanguageRecordDeleteMutation, TError, TpJobseekerProfileLanguageRecordDeleteMutationVariables, TContext>(
      ['tpJobseekerProfileLanguageRecordDelete'],
      (variables?: TpJobseekerProfileLanguageRecordDeleteMutationVariables) => fetcherForTp<TpJobseekerProfileLanguageRecordDeleteMutation, TpJobseekerProfileLanguageRecordDeleteMutationVariables>(TpJobseekerProfileLanguageRecordDeleteDocument, variables)(),
      options
    ););