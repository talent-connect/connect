// THIS FILE IS GENERATED, DO NOT EDIT!
import * as Types from '@talent-connect/data-access';

import { useMutation, UseMutationOptions } from 'react-query';
import { fetcherForTp } from '@talent-connect/data-access';
export type TpJobListingPatchMutationVariables = Types.Exact<{
  input: Types.TpJobListingPatchInput;
}>;


export type TpJobListingPatchMutation = { __typename?: 'Mutation', tpJobListingPatch: { __typename?: 'OkResponseMutationOutputDto', ok: boolean } };


export const TpJobListingPatchDocument = `
    mutation tpJobListingPatch($input: TpJobListingPatchInput!) {
  tpJobListingPatch(tpJobListingPatchInput: $input) {
    ok
  }
}
    `;
export const useTpJobListingPatchMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<TpJobListingPatchMutation, TError, TpJobListingPatchMutationVariables, TContext>) =>
    useMutation<TpJobListingPatchMutation, TError, TpJobListingPatchMutationVariables, TContext>(
      ['tpJobListingPatch'],
      (variables?: TpJobListingPatchMutationVariables) => fetcherForTp<TpJobListingPatchMutation, TpJobListingPatchMutationVariables>(TpJobListingPatchDocument, variables)(),
      options
    ););