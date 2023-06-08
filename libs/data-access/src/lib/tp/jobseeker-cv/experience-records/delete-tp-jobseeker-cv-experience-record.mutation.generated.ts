// THIS FILE IS GENERATED, DO NOT EDIT!
import * as Types from '@talent-connect/data-access';

import { useMutation, UseMutationOptions } from 'react-query';
import { fetcherForTp } from '@talent-connect/data-access';
export type TpJobseekerCvExperienceRecordDeleteMutationVariables = Types.Exact<{
  input: Types.TpJobseekerCvExperienceRecordDeleteInput;
}>;


export type TpJobseekerCvExperienceRecordDeleteMutation = { __typename?: 'Mutation', tpJobseekerCvExperienceRecordDelete: { __typename?: 'OkResponseMutationOutputDto', ok: boolean } };


export const TpJobseekerCvExperienceRecordDeleteDocument = `
    mutation tpJobseekerCvExperienceRecordDelete($input: TpJobseekerCvExperienceRecordDeleteInput!) {
  tpJobseekerCvExperienceRecordDelete(
    tpJobseekerCvExperienceRecordDeleteInput: $input
  ) {
    ok
  }
}
    `;
export const useTpJobseekerCvExperienceRecordDeleteMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<TpJobseekerCvExperienceRecordDeleteMutation, TError, TpJobseekerCvExperienceRecordDeleteMutationVariables, TContext>) =>
    useMutation<TpJobseekerCvExperienceRecordDeleteMutation, TError, TpJobseekerCvExperienceRecordDeleteMutationVariables, TContext>(
      ['tpJobseekerCvExperienceRecordDelete'],
      (variables?: TpJobseekerCvExperienceRecordDeleteMutationVariables) => fetcherForTp<TpJobseekerCvExperienceRecordDeleteMutation, TpJobseekerCvExperienceRecordDeleteMutationVariables>(TpJobseekerCvExperienceRecordDeleteDocument, variables)(),
      options
    ););