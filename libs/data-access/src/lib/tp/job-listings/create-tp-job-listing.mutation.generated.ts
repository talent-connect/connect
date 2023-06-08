// THIS FILE IS GENERATED, DO NOT EDIT!
import * as Types from '@talent-connect/data-access';

import { useMutation, UseMutationOptions } from 'react-query';
import { fetcherForTp } from '@talent-connect/data-access';
export type TpJobListingCreateMutationVariables = Types.Exact<{
  input: Types.TpJobListingCreateInput;
}>;


export type TpJobListingCreateMutation = { __typename?: 'Mutation', tpJobListingCreate: { __typename?: 'OkResponseMutationOutputDto', ok: boolean } };


export const TpJobListingCreateDocument = `
    mutation tpJobListingCreate($input: TpJobListingCreateInput!) {
  tpJobListingCreate(tpJobListingCreateInput: $input) {
    ok
  }
}
    `;
export const useTpJobListingCreateMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<TpJobListingCreateMutation, TError, TpJobListingCreateMutationVariables, TContext>) =>
    useMutation<TpJobListingCreateMutation, TError, TpJobListingCreateMutationVariables, TContext>(
      ['tpJobListingCreate'],
      (variables?: TpJobListingCreateMutationVariables) => fetcherForTp<TpJobListingCreateMutation, TpJobListingCreateMutationVariables>(TpJobListingCreateDocument, variables)(),
      options
    ););