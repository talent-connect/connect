// THIS FILE IS GENERATED, DO NOT EDIT!
import * as Types from '@talent-connect/data-access';

import { useMutation, UseMutationOptions } from 'react-query';
import { fetcherForTp } from '@talent-connect/data-access';
export type TpJobseekerCvEducationRecordPatchMutationVariables = Types.Exact<{
  input: Types.TpJobseekerCvEducationRecordPatchInput;
}>;


export type TpJobseekerCvEducationRecordPatchMutation = { __typename?: 'Mutation', tpJobseekerCvEducationRecordPatch: { __typename?: 'OkResponseMutationOutputDto', ok: boolean } };


export const TpJobseekerCvEducationRecordPatchDocument = `
    mutation tpJobseekerCvEducationRecordPatch($input: TpJobseekerCvEducationRecordPatchInput!) {
  tpJobseekerCvEducationRecordPatch(
    tpJobseekerCvEducationRecordPatchInput: $input
  ) {
    ok
  }
}
    `;
export const useTpJobseekerCvEducationRecordPatchMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<TpJobseekerCvEducationRecordPatchMutation, TError, TpJobseekerCvEducationRecordPatchMutationVariables, TContext>) =>
    useMutation<TpJobseekerCvEducationRecordPatchMutation, TError, TpJobseekerCvEducationRecordPatchMutationVariables, TContext>(
      ['tpJobseekerCvEducationRecordPatch'],
      (variables?: TpJobseekerCvEducationRecordPatchMutationVariables) => fetcherForTp<TpJobseekerCvEducationRecordPatchMutation, TpJobseekerCvEducationRecordPatchMutationVariables>(TpJobseekerCvEducationRecordPatchDocument, variables)(),
      options
    ););