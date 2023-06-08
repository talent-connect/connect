// THIS FILE IS GENERATED, DO NOT EDIT!
import * as Types from '@talent-connect/data-access';

import { useMutation, UseMutationOptions } from 'react-query';
import { fetcherForTp } from '@talent-connect/data-access';
export type ReportProblemMutationVariables = Types.Exact<{
  input: Types.CreateConProblemReportInput;
}>;


export type ReportProblemMutation = { __typename?: 'Mutation', conProblemReportCreate: { __typename?: 'OkResponseMutationOutputDto', ok: boolean } };


export const ReportProblemDocument = `
    mutation reportProblem($input: CreateConProblemReportInput!) {
  conProblemReportCreate(input: $input) {
    ok
  }
}
    `;
export const useReportProblemMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<ReportProblemMutation, TError, ReportProblemMutationVariables, TContext>) =>
    useMutation<ReportProblemMutation, TError, ReportProblemMutationVariables, TContext>(
      ['reportProblem'],
      (variables?: ReportProblemMutationVariables) => fetcherForTp<ReportProblemMutation, ReportProblemMutationVariables>(ReportProblemDocument, variables)(),
      options
    ););