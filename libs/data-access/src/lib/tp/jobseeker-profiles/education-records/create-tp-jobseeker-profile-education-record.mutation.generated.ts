// THIS FILE IS GENERATED, DO NOT EDIT!
import * as Types from '@talent-connect/data-access';

import { useMutation, UseMutationOptions } from 'react-query';
import { fetcher } from '@talent-connect/data-access';
export type TpJobseekerProfileEducationRecordCreateMutationVariables = Types.Exact<{
  input: Types.TpJobseekerProfileEducationRecordCreateInput;
}>;


export type TpJobseekerProfileEducationRecordCreateMutation = { __typename?: 'Mutation', tpJobseekerProfileEducationRecordCreate: { __typename?: 'OkResponseMutationOutputDto', ok: boolean } };


export const TpJobseekerProfileEducationRecordCreateDocument = `
    mutation tpJobseekerProfileEducationRecordCreate($input: TpJobseekerProfileEducationRecordCreateInput!) {
  tpJobseekerProfileEducationRecordCreate(
    tpJobseekerProfileEducationRecordCreateInput: $input
  ) {
    ok
  }
}
    `;
export const useTpJobseekerProfileEducationRecordCreateMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<TpJobseekerProfileEducationRecordCreateMutation, TError, TpJobseekerProfileEducationRecordCreateMutationVariables, TContext>) =>
    useMutation<TpJobseekerProfileEducationRecordCreateMutation, TError, TpJobseekerProfileEducationRecordCreateMutationVariables, TContext>(
      ['tpJobseekerProfileEducationRecordCreate'],
      (variables?: TpJobseekerProfileEducationRecordCreateMutationVariables) => fetcher<TpJobseekerProfileEducationRecordCreateMutation, TpJobseekerProfileEducationRecordCreateMutationVariables>(TpJobseekerProfileEducationRecordCreateDocument, variables)(),
      options
    );