// THIS FILE IS GENERATED, DO NOT EDIT!
import * as Types from '@talent-connect/data-access';

import { useMutation, UseMutationOptions } from 'react-query';
import { fetcher } from '@talent-connect/data-access';
export type TpJobseekerCvExperienceRecordPatchMutationVariables = Types.Exact<{
  input: Types.TpJobseekerCvExperienceRecordPatchInput;
}>;


export type TpJobseekerCvExperienceRecordPatchMutation = { __typename?: 'Mutation', tpJobseekerCvExperienceRecordPatch: { __typename?: 'OkResponseMutationOutputDto', ok: boolean } };


export const TpJobseekerCvExperienceRecordPatchDocument = `
    mutation tpJobseekerCvExperienceRecordPatch($input: TpJobseekerCvExperienceRecordPatchInput!) {
  tpJobseekerCvExperienceRecordPatch(
    tpJobseekerCvExperienceRecordPatchInput: $input
  ) {
    ok
  }
}
    `;
export const useTpJobseekerCvExperienceRecordPatchMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<TpJobseekerCvExperienceRecordPatchMutation, TError, TpJobseekerCvExperienceRecordPatchMutationVariables, TContext>) =>
    useMutation<TpJobseekerCvExperienceRecordPatchMutation, TError, TpJobseekerCvExperienceRecordPatchMutationVariables, TContext>(
      ['tpJobseekerCvExperienceRecordPatch'],
      (variables?: TpJobseekerCvExperienceRecordPatchMutationVariables) => fetcher<TpJobseekerCvExperienceRecordPatchMutation, TpJobseekerCvExperienceRecordPatchMutationVariables>(TpJobseekerCvExperienceRecordPatchDocument, variables)(),
      options
    );