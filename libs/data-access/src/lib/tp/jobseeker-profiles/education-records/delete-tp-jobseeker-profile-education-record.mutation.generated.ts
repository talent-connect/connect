// THIS FILE IS GENERATED, DO NOT EDIT!
import * as Types from '@talent-connect/data-access';

import { useMutation, UseMutationOptions } from 'react-query';
import { fetcherForTp } from '@talent-connect/data-access';
export type TpJobseekerProfileEducationRecordDeleteMutationVariables = Types.Exact<{
  input: Types.TpJobseekerProfileEducationRecordDeleteInput;
}>;


export type TpJobseekerProfileEducationRecordDeleteMutation = { __typename?: 'Mutation', tpJobseekerProfileEducationRecordDelete: { __typename?: 'OkResponseMutationOutputDto', ok: boolean } };


export const TpJobseekerProfileEducationRecordDeleteDocument = `
    mutation tpJobseekerProfileEducationRecordDelete($input: TpJobseekerProfileEducationRecordDeleteInput!) {
  tpJobseekerProfileEducationRecordDelete(
    tpJobseekerProfileEducationRecordDeleteInput: $input
  ) {
    ok
  }
}
    `;
export const useTpJobseekerProfileEducationRecordDeleteMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<TpJobseekerProfileEducationRecordDeleteMutation, TError, TpJobseekerProfileEducationRecordDeleteMutationVariables, TContext>) =>
    useMutation<TpJobseekerProfileEducationRecordDeleteMutation, TError, TpJobseekerProfileEducationRecordDeleteMutationVariables, TContext>(
      ['tpJobseekerProfileEducationRecordDelete'],
      (variables?: TpJobseekerProfileEducationRecordDeleteMutationVariables) => fetcherForTp<TpJobseekerProfileEducationRecordDeleteMutation, TpJobseekerProfileEducationRecordDeleteMutationVariables>(TpJobseekerProfileEducationRecordDeleteDocument, variables)(),
      options
    ););