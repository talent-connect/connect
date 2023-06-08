// THIS FILE IS GENERATED, DO NOT EDIT!
import * as Types from '@talent-connect/data-access';

import { useMutation, UseMutationOptions } from 'react-query';
import { fetcherForTp } from '@talent-connect/data-access';
export type TpJobseekerProfileExperienceRecordCreateMutationVariables = Types.Exact<{
  input: Types.TpJobseekerProfileExperienceRecordCreateInput;
}>;


export type TpJobseekerProfileExperienceRecordCreateMutation = { __typename?: 'Mutation', tpJobseekerProfileExperienceRecordCreate: { __typename?: 'OkResponseMutationOutputDto', ok: boolean } };


export const TpJobseekerProfileExperienceRecordCreateDocument = `
    mutation tpJobseekerProfileExperienceRecordCreate($input: TpJobseekerProfileExperienceRecordCreateInput!) {
  tpJobseekerProfileExperienceRecordCreate(
    tpJobseekerProfileExperienceRecordCreateInput: $input
  ) {
    ok
  }
}
    `;
export const useTpJobseekerProfileExperienceRecordCreateMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<TpJobseekerProfileExperienceRecordCreateMutation, TError, TpJobseekerProfileExperienceRecordCreateMutationVariables, TContext>) =>
    useMutation<TpJobseekerProfileExperienceRecordCreateMutation, TError, TpJobseekerProfileExperienceRecordCreateMutationVariables, TContext>(
      ['tpJobseekerProfileExperienceRecordCreate'],
      (variables?: TpJobseekerProfileExperienceRecordCreateMutationVariables) => fetcherForTp<TpJobseekerProfileExperienceRecordCreateMutation, TpJobseekerProfileExperienceRecordCreateMutationVariables>(TpJobseekerProfileExperienceRecordCreateDocument, variables)(),
      options
    ););