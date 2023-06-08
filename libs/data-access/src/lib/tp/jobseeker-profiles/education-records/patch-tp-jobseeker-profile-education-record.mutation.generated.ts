// THIS FILE IS GENERATED, DO NOT EDIT!
import * as Types from '@talent-connect/data-access';

import { useMutation, UseMutationOptions } from 'react-query';
import { fetcherForTp } from '@talent-connect/data-access';
export type TpJobseekerProfileEducationRecordPatchMutationVariables = Types.Exact<{
  input: Types.TpJobseekerProfileEducationRecordPatchInput;
}>;


export type TpJobseekerProfileEducationRecordPatchMutation = { __typename?: 'Mutation', tpJobseekerProfileEducationRecordPatch: { __typename?: 'OkResponseMutationOutputDto', ok: boolean } };


export const TpJobseekerProfileEducationRecordPatchDocument = `
    mutation tpJobseekerProfileEducationRecordPatch($input: TpJobseekerProfileEducationRecordPatchInput!) {
  tpJobseekerProfileEducationRecordPatch(
    tpJobseekerProfileEducationRecordPatchInput: $input
  ) {
    ok
  }
}
    `;
export const useTpJobseekerProfileEducationRecordPatchMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<TpJobseekerProfileEducationRecordPatchMutation, TError, TpJobseekerProfileEducationRecordPatchMutationVariables, TContext>) =>
    useMutation<TpJobseekerProfileEducationRecordPatchMutation, TError, TpJobseekerProfileEducationRecordPatchMutationVariables, TContext>(
      ['tpJobseekerProfileEducationRecordPatch'],
      (variables?: TpJobseekerProfileEducationRecordPatchMutationVariables) => fetcherForTp<TpJobseekerProfileEducationRecordPatchMutation, TpJobseekerProfileEducationRecordPatchMutationVariables>(TpJobseekerProfileEducationRecordPatchDocument, variables)(),
      options
    ););