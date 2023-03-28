// THIS FILE IS GENERATED, DO NOT EDIT!
import * as Types from '@talent-connect/data-access';

import { useMutation, UseMutationOptions } from 'react-query';
import { fetcher } from '@talent-connect/data-access';
export type TpJobListingDeleteMutationVariables = Types.Exact<{
  input: Types.TpJobListingDeleteInput;
}>;


export type TpJobListingDeleteMutation = { __typename?: 'Mutation', tpJobListingDelete: { __typename?: 'OkResponseMutationOutputDto', ok: boolean } };


export const TpJobListingDeleteDocument = `
    mutation tpJobListingDelete($input: TpJobListingDeleteInput!) {
  tpJobListingDelete(tpJobListingDeleteInput: $input) {
    ok
  }
}
    `;
export const useTpJobListingDeleteMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<TpJobListingDeleteMutation, TError, TpJobListingDeleteMutationVariables, TContext>) =>
    useMutation<TpJobListingDeleteMutation, TError, TpJobListingDeleteMutationVariables, TContext>(
      ['tpJobListingDelete'],
      (variables?: TpJobListingDeleteMutationVariables) => fetcher<TpJobListingDeleteMutation, TpJobListingDeleteMutationVariables>(TpJobListingDeleteDocument, variables)(),
      options
    );