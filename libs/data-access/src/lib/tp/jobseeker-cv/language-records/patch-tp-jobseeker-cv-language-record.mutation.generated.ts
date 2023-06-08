// THIS FILE IS GENERATED, DO NOT EDIT!
import * as Types from '@talent-connect/data-access';

import { useMutation, UseMutationOptions } from 'react-query';
import { fetcherForTp } from '@talent-connect/data-access';
export type TpJobseekerCvLanguageRecordPatchMutationVariables = Types.Exact<{
  input: Types.TpJobseekerCvLanguageRecordPatchInput;
}>;


export type TpJobseekerCvLanguageRecordPatchMutation = { __typename?: 'Mutation', tpJobseekerCvLanguageRecordPatch: { __typename?: 'OkResponseMutationOutputDto', ok: boolean } };


export const TpJobseekerCvLanguageRecordPatchDocument = `
    mutation tpJobseekerCvLanguageRecordPatch($input: TpJobseekerCvLanguageRecordPatchInput!) {
  tpJobseekerCvLanguageRecordPatch(tpJobseekerCvLanguageRecordPatchInput: $input) {
    ok
  }
}
    `;
export const useTpJobseekerCvLanguageRecordPatchMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<TpJobseekerCvLanguageRecordPatchMutation, TError, TpJobseekerCvLanguageRecordPatchMutationVariables, TContext>) =>
    useMutation<TpJobseekerCvLanguageRecordPatchMutation, TError, TpJobseekerCvLanguageRecordPatchMutationVariables, TContext>(
      ['tpJobseekerCvLanguageRecordPatch'],
      (variables?: TpJobseekerCvLanguageRecordPatchMutationVariables) => fetcherForTp<TpJobseekerCvLanguageRecordPatchMutation, TpJobseekerCvLanguageRecordPatchMutationVariables>(TpJobseekerCvLanguageRecordPatchDocument, variables)(),
      options
    ););