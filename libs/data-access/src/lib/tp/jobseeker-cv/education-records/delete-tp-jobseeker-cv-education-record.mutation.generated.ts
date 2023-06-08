// THIS FILE IS GENERATED, DO NOT EDIT!
import * as Types from '@talent-connect/data-access';

import { useMutation, UseMutationOptions } from 'react-query';
import { fetcherForTp } from '@talent-connect/data-access';
export type TpJobseekerCvEducationRecordDeleteMutationVariables = Types.Exact<{
  input: Types.TpJobseekerCvEducationRecordDeleteInput;
}>;


export type TpJobseekerCvEducationRecordDeleteMutation = { __typename?: 'Mutation', tpJobseekerCvEducationRecordDelete: { __typename?: 'OkResponseMutationOutputDto', ok: boolean } };


export const TpJobseekerCvEducationRecordDeleteDocument = `
    mutation tpJobseekerCvEducationRecordDelete($input: TpJobseekerCvEducationRecordDeleteInput!) {
  tpJobseekerCvEducationRecordDelete(
    tpJobseekerCvEducationRecordDeleteInput: $input
  ) {
    ok
  }
}
    `;
export const useTpJobseekerCvEducationRecordDeleteMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<TpJobseekerCvEducationRecordDeleteMutation, TError, TpJobseekerCvEducationRecordDeleteMutationVariables, TContext>) =>
    useMutation<TpJobseekerCvEducationRecordDeleteMutation, TError, TpJobseekerCvEducationRecordDeleteMutationVariables, TContext>(
      ['tpJobseekerCvEducationRecordDelete'],
      (variables?: TpJobseekerCvEducationRecordDeleteMutationVariables) => fetcherForTp<TpJobseekerCvEducationRecordDeleteMutation, TpJobseekerCvEducationRecordDeleteMutationVariables>(TpJobseekerCvEducationRecordDeleteDocument, variables)(),
      options
    ););