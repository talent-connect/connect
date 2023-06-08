// THIS FILE IS GENERATED, DO NOT EDIT!
import * as Types from '@talent-connect/data-access';

import { useQuery, UseQueryOptions } from 'react-query';
import { fetcherForTp } from '@talent-connect/data-access';
export type ListAllTpCompanyNamesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ListAllTpCompanyNamesQuery = { __typename?: 'Query', publicTpCompanyProfiles: Array<{ __typename?: 'TpCompanyProfile', id: string, companyName: string }> };


export const ListAllTpCompanyNamesDocument = `
    query listAllTpCompanyNames {
  publicTpCompanyProfiles {
    id
    companyName
  }
}
    `;
export const useListAllTpCompanyNamesQuery = <
      TData = ListAllTpCompanyNamesQuery,
      TError = unknown
    >(
      variables?: ListAllTpCompanyNamesQueryVariables,
      options?: UseQueryOptions<ListAllTpCompanyNamesQuery, TError, TData>
    ) =>
    useQuery<ListAllTpCompanyNamesQuery, TError, TData>(
      variables === undefined ? ['listAllTpCompanyNames'] : ['listAllTpCompanyNames', variables],
      fetcherForTp<ListAllTpCompanyNamesQuery, ListAllTpCompanyNamesQueryVariables>(ListAllTpCompanyNamesDocument, variables),
      options
    );

useListAllTpCompanyNamesQuery.getKey = (variables?: ListAllTpCompanyNamesQueryVariables) => variables === undefined ? ['listAllTpCompanyNames'] : ['listAllTpCompanyNames', variables];
;
;
