// THIS FILE IS GENERATED, DO NOT EDIT!
import * as Types from '@talent-connect/data-access';

import { useMutation, UseMutationOptions } from 'react-query';
import { fetcher } from '@talent-connect/data-access';
export type SignUpCompanyMutationVariables = Types.Exact<{
  input: Types.TpCompanyProfileSignUpInputDto;
}>;


export type SignUpCompanyMutation = { __typename?: 'Mutation', tpCompanyProfileSignUp: { __typename?: 'TpCompanyProfileSignUpInputOutputDto', ok: boolean } };


export const SignUpCompanyDocument = `
    mutation signUpCompany($input: TpCompanyProfileSignUpInputDto!) {
  tpCompanyProfileSignUp(input: $input) {
    ok
  }
}
    `;
export const useSignUpCompanyMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<SignUpCompanyMutation, TError, SignUpCompanyMutationVariables, TContext>) =>
    useMutation<SignUpCompanyMutation, TError, SignUpCompanyMutationVariables, TContext>(
      ['signUpCompany'],
      (variables?: SignUpCompanyMutationVariables) => fetcher<SignUpCompanyMutation, SignUpCompanyMutationVariables>(SignUpCompanyDocument, variables)(),
      options
    );