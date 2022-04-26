import * as Types from '../../../types';

import { useQuery, UseQueryOptions } from 'react-query';
import { fetcher } from '@talent-connect/data-access';
export type TestQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type TestQuery = { __typename?: 'Query', conProfiles: Array<{ __typename?: 'ConProfile', id: string, firstName: string, lastName: string, rediLocation: Types.RediLocation, gender?: Types.Gender | null }> };


export const TestDocument = `
    query test {
  conProfiles {
    id
    firstName
    lastName
    rediLocation
    gender
  }
}
    `;
export const useTestQuery = <
      TData = TestQuery,
      TError = unknown
    >(
      variables?: TestQueryVariables,
      options?: UseQueryOptions<TestQuery, TError, TData>
    ) =>
    useQuery<TestQuery, TError, TData>(
      variables === undefined ? ['test'] : ['test', variables],
      fetcher<TestQuery, TestQueryVariables>(TestDocument, variables),
      options
    );