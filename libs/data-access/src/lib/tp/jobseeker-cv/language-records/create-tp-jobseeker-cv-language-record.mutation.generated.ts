// THIS FILE IS GENERATED, DO NOT EDIT!
import * as Types from '@talent-connect/data-access';

import { useMutation, UseMutationOptions } from 'react-query';
import { fetcher } from '@talent-connect/data-access';
export type TpJobseekerCvLanguageRecordCreateMutationVariables = Types.Exact<{
  input: Types.TpJobseekerCvLanguageRecordCreateInput;
}>;


export type TpJobseekerCvLanguageRecordCreateMutation = { __typename?: 'Mutation', tpJobseekerCvLanguageRecordCreate: { __typename?: 'OkResponseMutationOutputDto', ok: boolean } };


export const TpJobseekerCvLanguageRecordCreateDocument = `
    mutation tpJobseekerCvLanguageRecordCreate($input: TpJobseekerCvLanguageRecordCreateInput!) {
  tpJobseekerCvLanguageRecordCreate(
    tpJobseekerCvLanguageRecordCreateInput: $input
  ) {
    ok
  }
}
    `;
export const useTpJobseekerCvLanguageRecordCreateMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<TpJobseekerCvLanguageRecordCreateMutation, TError, TpJobseekerCvLanguageRecordCreateMutationVariables, TContext>) =>
    useMutation<TpJobseekerCvLanguageRecordCreateMutation, TError, TpJobseekerCvLanguageRecordCreateMutationVariables, TContext>(
      ['tpJobseekerCvLanguageRecordCreate'],
      (variables?: TpJobseekerCvLanguageRecordCreateMutationVariables) => fetcher<TpJobseekerCvLanguageRecordCreateMutation, TpJobseekerCvLanguageRecordCreateMutationVariables>(TpJobseekerCvLanguageRecordCreateDocument, variables)(),
      options
    );