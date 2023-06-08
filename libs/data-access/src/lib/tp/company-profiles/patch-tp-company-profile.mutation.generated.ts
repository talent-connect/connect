// THIS FILE IS GENERATED, DO NOT EDIT!
import * as Types from '@talent-connect/data-access';

import { useMutation, UseMutationOptions } from 'react-query';
import { fetcherForTp } from '@talent-connect/data-access';
export type PatchTpCompanyProfileMutationVariables = Types.Exact<{
  input: Types.TpCompanyProfilePatchInput;
}>;


export type PatchTpCompanyProfileMutation = { __typename?: 'Mutation', tpCompanyProfilePatch: { __typename?: 'OkResponseMutationOutputDto', ok: boolean } };


export const PatchTpCompanyProfileDocument = `
    mutation patchTpCompanyProfile($input: TpCompanyProfilePatchInput!) {
  tpCompanyProfilePatch(tpCompanyProfilePatchInput: $input) {
    ok
  }
}
    `;
export const usePatchTpCompanyProfileMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<PatchTpCompanyProfileMutation, TError, PatchTpCompanyProfileMutationVariables, TContext>) =>
    useMutation<PatchTpCompanyProfileMutation, TError, PatchTpCompanyProfileMutationVariables, TContext>(
      ['patchTpCompanyProfile'],
      (variables?: PatchTpCompanyProfileMutationVariables) => fetcherForTp<PatchTpCompanyProfileMutation, PatchTpCompanyProfileMutationVariables>(PatchTpCompanyProfileDocument, variables)(),
      options
    ););