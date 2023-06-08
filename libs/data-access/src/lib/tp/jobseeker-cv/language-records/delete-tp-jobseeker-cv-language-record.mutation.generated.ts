// THIS FILE IS GENERATED, DO NOT EDIT!
import * as Types from '@talent-connect/data-access';

import { useMutation, UseMutationOptions } from 'react-query';
import { fetcherForTp } from '@talent-connect/data-access';
export type TpJobseekerCvLanguageRecordDeleteMutationVariables = Types.Exact<{
  input: Types.TpJobseekerCvLanguageRecordDeleteInput;
}>;


export type TpJobseekerCvLanguageRecordDeleteMutation = { __typename?: 'Mutation', tpJobseekerCvLanguageRecordDelete: { __typename?: 'OkResponseMutationOutputDto', ok: boolean } };


export const TpJobseekerCvLanguageRecordDeleteDocument = `
    mutation tpJobseekerCvLanguageRecordDelete($input: TpJobseekerCvLanguageRecordDeleteInput!) {
  tpJobseekerCvLanguageRecordDelete(
    tpJobseekerCvLanguageRecordDeleteInput: $input
  ) {
    ok
  }
}
    `;
export const useTpJobseekerCvLanguageRecordDeleteMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<TpJobseekerCvLanguageRecordDeleteMutation, TError, TpJobseekerCvLanguageRecordDeleteMutationVariables, TContext>) =>
    useMutation<TpJobseekerCvLanguageRecordDeleteMutation, TError, TpJobseekerCvLanguageRecordDeleteMutationVariables, TContext>(
      ['tpJobseekerCvLanguageRecordDelete'],
      (variables?: TpJobseekerCvLanguageRecordDeleteMutationVariables) => fetcherForTp<TpJobseekerCvLanguageRecordDeleteMutation, TpJobseekerCvLanguageRecordDeleteMutationVariables>(TpJobseekerCvLanguageRecordDeleteDocument, variables)(),
      options
    ););