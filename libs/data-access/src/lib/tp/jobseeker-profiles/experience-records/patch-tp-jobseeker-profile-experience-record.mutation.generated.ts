// THIS FILE IS GENERATED, DO NOT EDIT!
import * as Types from '@talent-connect/data-access';

import { useMutation, UseMutationOptions } from 'react-query';
import { fetcherForTp } from '@talent-connect/data-access';
export type TpJobseekerProfileExperienceRecordPatchMutationVariables = Types.Exact<{
  input: Types.TpJobseekerProfileExperienceRecordPatchInput;
}>;


export type TpJobseekerProfileExperienceRecordPatchMutation = { __typename?: 'Mutation', tpJobseekerProfileExperienceRecordPatch: { __typename?: 'OkResponseMutationOutputDto', ok: boolean } };


export const TpJobseekerProfileExperienceRecordPatchDocument = `
    mutation tpJobseekerProfileExperienceRecordPatch($input: TpJobseekerProfileExperienceRecordPatchInput!) {
  tpJobseekerProfileExperienceRecordPatch(
    tpJobseekerProfileExperienceRecordPatchInput: $input
  ) {
    ok
  }
}
    `;
export const useTpJobseekerProfileExperienceRecordPatchMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<TpJobseekerProfileExperienceRecordPatchMutation, TError, TpJobseekerProfileExperienceRecordPatchMutationVariables, TContext>) =>
    useMutation<TpJobseekerProfileExperienceRecordPatchMutation, TError, TpJobseekerProfileExperienceRecordPatchMutationVariables, TContext>(
      ['tpJobseekerProfileExperienceRecordPatch'],
      (variables?: TpJobseekerProfileExperienceRecordPatchMutationVariables) => fetcherForTp<TpJobseekerProfileExperienceRecordPatchMutation, TpJobseekerProfileExperienceRecordPatchMutationVariables>(TpJobseekerProfileExperienceRecordPatchDocument, variables)(),
      options
    ););