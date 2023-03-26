// THIS FILE IS GENERATED, DO NOT EDIT!
import * as Types from '@talent-connect/data-access';

import { useMutation, UseMutationOptions } from 'react-query';
import { fetcher } from '@talent-connect/data-access';
export type TpJobseekerProfileLanguageRecordPatchMutationVariables = Types.Exact<{
  input: Types.TpJobseekerProfileLanguageRecordPatchInput;
}>;


export type TpJobseekerProfileLanguageRecordPatchMutation = { __typename?: 'Mutation', tpJobseekerProfileLanguageRecordPatch: { __typename?: 'OkResponseMutationOutputDto', ok: boolean } };


export const TpJobseekerProfileLanguageRecordPatchDocument = `
    mutation tpJobseekerProfileLanguageRecordPatch($input: TpJobseekerProfileLanguageRecordPatchInput!) {
  tpJobseekerProfileLanguageRecordPatch(
    tpJobseekerProfileLanguageRecordPatchInput: $input
  ) {
    ok
  }
}
    `;
export const useTpJobseekerProfileLanguageRecordPatchMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<TpJobseekerProfileLanguageRecordPatchMutation, TError, TpJobseekerProfileLanguageRecordPatchMutationVariables, TContext>) =>
    useMutation<TpJobseekerProfileLanguageRecordPatchMutation, TError, TpJobseekerProfileLanguageRecordPatchMutationVariables, TContext>(
      ['tpJobseekerProfileLanguageRecordPatch'],
      (variables?: TpJobseekerProfileLanguageRecordPatchMutationVariables) => fetcher<TpJobseekerProfileLanguageRecordPatchMutation, TpJobseekerProfileLanguageRecordPatchMutationVariables>(TpJobseekerProfileLanguageRecordPatchDocument, variables)(),
      options
    );