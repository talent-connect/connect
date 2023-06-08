// THIS FILE IS GENERATED, DO NOT EDIT!
import * as Types from '@talent-connect/data-access';

import { useMutation, UseMutationOptions } from 'react-query';
import { fetcherForTp } from '@talent-connect/data-access';
export type SignUpCompanyMutationVariables = Types.Exact<{
  input: Types.TpCompanyProfileSignUpInputDto;
}>;


export type SignUpCompanyMutation = { __typename?: 'Mutation', tpCompanyProfileSignUp: { __typename?: 'TpCompanyProfileSignUpInputOutputDto', ok: boolean } };

export type SignUpJobseekerMutationVariables = Types.Exact<{
  input: Types.TpJobseekerProfileSignUpDto;
}>;


export type SignUpJobseekerMutation = { __typename?: 'Mutation', tpJobseekerProfileSignUp: { __typename?: 'OkResponseMutationOutputDto', ok: boolean } };


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
      (variables?: SignUpCompanyMutationVariables) => fetcherForTp<SignUpCompanyMutation, SignUpCompanyMutationVariables>(SignUpCompanyDocument, variables)(),
      options
    );
export const SignUpJobseekerDocument = `
    mutation signUpJobseeker($input: TpJobseekerProfileSignUpDto!) {
  tpJobseekerProfileSignUp(input: $input) {
    ok
  }
}
    `;
export const useSignUpJobseekerMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<SignUpJobseekerMutation, TError, SignUpJobseekerMutationVariables, TContext>) =>
    useMutation<SignUpJobseekerMutation, TError, SignUpJobseekerMutationVariables, TContext>(
      ['signUpJobseeker'],
      (variables?: SignUpJobseekerMutationVariables) => fetcherForTp<SignUpJobseekerMutation, SignUpJobseekerMutationVariables>(SignUpJobseekerDocument, variables)(),
      options
    ); );