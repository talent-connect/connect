// THIS FILE IS GENERATED, DO NOT EDIT!
import * as Types from '@talent-connect/data-access';

import { useMutation, UseMutationOptions } from 'react-query';
import { fetcher } from '@talent-connect/data-access';
export type PatchUserContactMutationVariables = Types.Exact<{
  input: Types.UserContactPatchInput;
}>;


export type PatchUserContactMutation = { __typename?: 'Mutation', userContactPatch: { __typename?: 'OkResponseMutationOutputDto', ok: boolean } };


export const PatchUserContactDocument = `
    mutation patchUserContact($input: UserContactPatchInput!) {
  userContactPatch(userContactPatchInput: $input) {
    ok
  }
}
    `;
export const usePatchUserContactMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<PatchUserContactMutation, TError, PatchUserContactMutationVariables, TContext>) =>
    useMutation<PatchUserContactMutation, TError, PatchUserContactMutationVariables, TContext>(
      ['patchUserContact'],
      (variables?: PatchUserContactMutationVariables) => fetcher<PatchUserContactMutation, PatchUserContactMutationVariables>(PatchUserContactDocument, variables)(),
      options
    );