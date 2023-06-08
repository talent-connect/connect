// THIS FILE IS GENERATED, DO NOT EDIT!
import * as Types from '@talent-connect/data-access';

import { useMutation, UseMutationOptions } from 'react-query';
import { fetcherForTp } from '@talent-connect/data-access';
export type TpJobseekerCvExperienceRecordCreateMutationVariables = Types.Exact<{
  input: Types.TpJobseekerCvExperienceRecordCreateInput;
}>;


export type TpJobseekerCvExperienceRecordCreateMutation = { __typename?: 'Mutation', tpJobseekerCvExperienceRecordCreate: { __typename?: 'OkResponseMutationOutputDto', ok: boolean } };


export const TpJobseekerCvExperienceRecordCreateDocument = `
    mutation tpJobseekerCvExperienceRecordCreate($input: TpJobseekerCvExperienceRecordCreateInput!) {
  tpJobseekerCvExperienceRecordCreate(
    tpJobseekerCvExperienceRecordCreateInput: $input
  ) {
    ok
  }
}
    `;
export const useTpJobseekerCvExperienceRecordCreateMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<TpJobseekerCvExperienceRecordCreateMutation, TError, TpJobseekerCvExperienceRecordCreateMutationVariables, TContext>) =>
    useMutation<TpJobseekerCvExperienceRecordCreateMutation, TError, TpJobseekerCvExperienceRecordCreateMutationVariables, TContext>(
      ['tpJobseekerCvExperienceRecordCreate'],
      (variables?: TpJobseekerCvExperienceRecordCreateMutationVariables) => fetcherForTp<TpJobseekerCvExperienceRecordCreateMutation, TpJobseekerCvExperienceRecordCreateMutationVariables>(TpJobseekerCvExperienceRecordCreateDocument, variables)(),
      options
    ););