// THIS FILE IS GENERATED, DO NOT EDIT!
import * as Types from '@talent-connect/data-access';

import { useMutation, UseMutationOptions } from 'react-query';
import { fetcherForTp } from '@talent-connect/data-access';
export type CreateMentoringSessionMutationVariables = Types.Exact<{
  input: Types.CreateConMentoringSessionInput;
}>;


export type CreateMentoringSessionMutation = { __typename?: 'Mutation', createConMentoringSession: { __typename?: 'ConMentoringSession', id: string } };


export const CreateMentoringSessionDocument = `
    mutation createMentoringSession($input: CreateConMentoringSessionInput!) {
  createConMentoringSession(createConMentoringSessionInput: $input) {
    id
  }
}
    `;
export const useCreateMentoringSessionMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateMentoringSessionMutation, TError, CreateMentoringSessionMutationVariables, TContext>) =>
    useMutation<CreateMentoringSessionMutation, TError, CreateMentoringSessionMutationVariables, TContext>(
      ['createMentoringSession'],
      (variables?: CreateMentoringSessionMutationVariables) => fetcherForTp<CreateMentoringSessionMutation, CreateMentoringSessionMutationVariables>(CreateMentoringSessionDocument, variables)(),
      options
    ););