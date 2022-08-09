// THIS FILE IS GENERATED, DO NOT EDIT!
import * as Types from '@talent-connect/data-access';

import { useQuery, UseQueryOptions } from 'react-query';
import { fetcher } from '@talent-connect/data-access';
export type MyTpDataQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type MyTpDataQuery = { __typename?: 'Query', tpCurrentUserDataGet: { __typename?: 'TpCurrentUserData', companyRepresentativeStatus: { __typename?: 'TpCompanyRepresentativeRelationship', id: string } } };


export const MyTpDataDocument = `
    query myTpData {
  tpCurrentUserDataGet {
    companyRepresentativeStatus {
      id
    }
  }
}
    `;
export const useMyTpDataQuery = <
      TData = MyTpDataQuery,
      TError = unknown
    >(
      variables?: MyTpDataQueryVariables,
      options?: UseQueryOptions<MyTpDataQuery, TError, TData>
    ) =>
    useQuery<MyTpDataQuery, TError, TData>(
      variables === undefined ? ['myTpData'] : ['myTpData', variables],
      fetcher<MyTpDataQuery, MyTpDataQueryVariables>(MyTpDataDocument, variables),
      options
    );

useMyTpDataQuery.getKey = (variables?: MyTpDataQueryVariables) => variables === undefined ? ['myTpData'] : ['myTpData', variables];
;
