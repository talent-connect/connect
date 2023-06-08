// THIS FILE IS GENERATED, DO NOT EDIT!
import * as Types from '@talent-connect/data-access';

import { useMutation, UseMutationOptions } from 'react-query';
import { fetcherForTp } from '@talent-connect/data-access';
export type TpJobseekerProfileLanguageRecordCreateMutationVariables = Types.Exact<{
  input: Types.TpJobseekerProfileLanguageRecordCreateInput;
}>;


export type TpJobseekerProfileLanguageRecordCreateMutation = { __typename?: 'Mutation', tpJobseekerProfileLanguageRecordCreate: { __typename?: 'OkResponseMutationOutputDto', ok: boolean } };


export const TpJobseekerProfileLanguageRecordCreateDocument = `
    mutation tpJobseekerProfileLanguageRecordCreate($input: TpJobseekerProfileLanguageRecordCreateInput!) {
  tpJobseekerProfileLanguageRecordCreate(
    tpJobseekerProfileLanguageRecordCreateInput: $input
  ) {
    ok
  }
}
    `;
export const useTpJobseekerProfileLanguageRecordCreateMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<TpJobseekerProfileLanguageRecordCreateMutation, TError, TpJobseekerProfileLanguageRecordCreateMutationVariables, TContext>) =>
    useMutation<TpJobseekerProfileLanguageRecordCreateMutation, TError, TpJobseekerProfileLanguageRecordCreateMutationVariables, TContext>(
      ['tpJobseekerProfileLanguageRecordCreate'],
      (variables?: TpJobseekerProfileLanguageRecordCreateMutationVariables) => fetcherForTp<TpJobseekerProfileLanguageRecordCreateMutation, TpJobseekerProfileLanguageRecordCreateMutationVariables>(TpJobseekerProfileLanguageRecordCreateDocument, variables)(),
      options
    ););