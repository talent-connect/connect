// THIS FILE IS GENERATED, DO NOT EDIT!
import * as Types from '@talent-connect/data-access';

import { useMutation, UseMutationOptions } from 'react-query';
import { fetcherForTp } from '@talent-connect/data-access';
export type TpJobseekerCvCreateFromCurrentUserJobseekerProfileMutationVariables = Types.Exact<{
  input: Types.TpJobseekerCvCreateFromCurrentUserJobseekerProfileInput;
}>;


export type TpJobseekerCvCreateFromCurrentUserJobseekerProfileMutation = { __typename?: 'Mutation', tpJobseekerCreateFromCurrentUserJobseekerProfile: { __typename?: 'OkIdResponseMutationOutputDto', id: string, ok: boolean } };


export const TpJobseekerCvCreateFromCurrentUserJobseekerProfileDocument = `
    mutation tpJobseekerCvCreateFromCurrentUserJobseekerProfile($input: TpJobseekerCvCreateFromCurrentUserJobseekerProfileInput!) {
  tpJobseekerCreateFromCurrentUserJobseekerProfile(input: $input) {
    id
    ok
  }
}
    `;
export const useTpJobseekerCvCreateFromCurrentUserJobseekerProfileMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<TpJobseekerCvCreateFromCurrentUserJobseekerProfileMutation, TError, TpJobseekerCvCreateFromCurrentUserJobseekerProfileMutationVariables, TContext>) =>
    useMutation<TpJobseekerCvCreateFromCurrentUserJobseekerProfileMutation, TError, TpJobseekerCvCreateFromCurrentUserJobseekerProfileMutationVariables, TContext>(
      ['tpJobseekerCvCreateFromCurrentUserJobseekerProfile'],
      (variables?: TpJobseekerCvCreateFromCurrentUserJobseekerProfileMutationVariables) => fetcherForTp<TpJobseekerCvCreateFromCurrentUserJobseekerProfileMutation, TpJobseekerCvCreateFromCurrentUserJobseekerProfileMutationVariables>(TpJobseekerCvCreateFromCurrentUserJobseekerProfileDocument, variables)(),
      options
    ););