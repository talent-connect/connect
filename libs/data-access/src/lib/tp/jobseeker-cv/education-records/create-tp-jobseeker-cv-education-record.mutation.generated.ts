// THIS FILE IS GENERATED, DO NOT EDIT!
import * as Types from '@talent-connect/data-access';

import { useMutation, UseMutationOptions } from 'react-query';
import { fetcherForTp } from '@talent-connect/data-access';
export type TpJobseekerCvEducationRecordCreateMutationVariables = Types.Exact<{
  input: Types.TpJobseekerCvEducationRecordCreateInput;
}>;


export type TpJobseekerCvEducationRecordCreateMutation = { __typename?: 'Mutation', tpJobseekerCvEducationRecordCreate: { __typename?: 'OkResponseMutationOutputDto', ok: boolean } };


export const TpJobseekerCvEducationRecordCreateDocument = `
    mutation tpJobseekerCvEducationRecordCreate($input: TpJobseekerCvEducationRecordCreateInput!) {
  tpJobseekerCvEducationRecordCreate(
    tpJobseekerCvEducationRecordCreateInput: $input
  ) {
    ok
  }
}
    `;
export const useTpJobseekerCvEducationRecordCreateMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<TpJobseekerCvEducationRecordCreateMutation, TError, TpJobseekerCvEducationRecordCreateMutationVariables, TContext>) =>
    useMutation<TpJobseekerCvEducationRecordCreateMutation, TError, TpJobseekerCvEducationRecordCreateMutationVariables, TContext>(
      ['tpJobseekerCvEducationRecordCreate'],
      (variables?: TpJobseekerCvEducationRecordCreateMutationVariables) => fetcherForTp<TpJobseekerCvEducationRecordCreateMutation, TpJobseekerCvEducationRecordCreateMutationVariables>(TpJobseekerCvEducationRecordCreateDocument, variables)(),
      options
    ););