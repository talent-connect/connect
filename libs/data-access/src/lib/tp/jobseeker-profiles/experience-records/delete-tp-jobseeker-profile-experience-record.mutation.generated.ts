// THIS FILE IS GENERATED, DO NOT EDIT!
import * as Types from '@talent-connect/data-access';

import { useMutation, UseMutationOptions } from 'react-query';
import { fetcher } from '@talent-connect/data-access';
export type TpJobseekerProfileExperienceRecordDeleteMutationVariables = Types.Exact<{
  input: Types.TpJobseekerProfileExperienceRecordDeleteInput;
}>;


export type TpJobseekerProfileExperienceRecordDeleteMutation = { __typename?: 'Mutation', tpJobseekerProfileExperienceRecordDelete: { __typename?: 'OkResponseMutationOutputDto', ok: boolean } };


export const TpJobseekerProfileExperienceRecordDeleteDocument = `
    mutation tpJobseekerProfileExperienceRecordDelete($input: TpJobseekerProfileExperienceRecordDeleteInput!) {
  tpJobseekerProfileExperienceRecordDelete(
    tpJobseekerProfileExperienceRecordDeleteInput: $input
  ) {
    ok
  }
}
    `;
export const useTpJobseekerProfileExperienceRecordDeleteMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<TpJobseekerProfileExperienceRecordDeleteMutation, TError, TpJobseekerProfileExperienceRecordDeleteMutationVariables, TContext>) =>
    useMutation<TpJobseekerProfileExperienceRecordDeleteMutation, TError, TpJobseekerProfileExperienceRecordDeleteMutationVariables, TContext>(
      ['tpJobseekerProfileExperienceRecordDelete'],
      (variables?: TpJobseekerProfileExperienceRecordDeleteMutationVariables) => fetcher<TpJobseekerProfileExperienceRecordDeleteMutation, TpJobseekerProfileExperienceRecordDeleteMutationVariables>(TpJobseekerProfileExperienceRecordDeleteDocument, variables)(),
      options
    );