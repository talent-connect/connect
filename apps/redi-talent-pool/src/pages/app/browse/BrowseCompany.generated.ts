// THIS FILE IS GENERATED, DO NOT EDIT!
import * as Types from '@talent-connect/data-access';

import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from 'react-query';
import { fetcher } from '@talent-connect/data-access';
export type LoadVisibleJobseekerProfilesQueryVariables = Types.Exact<{
  filter: Types.FindAllVisibleTpJobseekerDirectoryEntriesFilter;
}>;


export type LoadVisibleJobseekerProfilesQuery = { __typename?: 'Query', tpJobseekerDirectoryEntriesVisible: Array<{ __typename?: 'TpJobseekerDirectoryEntry', id: string, fullName: string, firstName: string, lastName: string, aboutYourself?: string | null, email: string }> };

export type TpCompanyFavouritedJobseekerProfilesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type TpCompanyFavouritedJobseekerProfilesQuery = { __typename?: 'Query', tpCompanyFavoritedJobseekerProfiles: Array<{ __typename?: 'TpCompanyFavoritedJobseekerProfile', favoritedTpJobseekerProfileId: string }> };

export type TpCompanyMarkJobseekerAsFavouriteMutationVariables = Types.Exact<{
  input: Types.TpCompanyFavoritedJobseekerProfileCreateMutationInputDto;
}>;


export type TpCompanyMarkJobseekerAsFavouriteMutation = { __typename?: 'Mutation', tpCompanyFavoritedJobseekerProfileCreate: { __typename?: 'TpCompanyFavoritedJobseekerProfileCreateMutationOutputDto', ok: boolean } };

export type TpCompanyUnmarkJobseekerAsFavouriteMutationVariables = Types.Exact<{
  input: Types.TpCompanyFavoritedJobseekerProfileDeleteMutationInputDto;
}>;


export type TpCompanyUnmarkJobseekerAsFavouriteMutation = { __typename?: 'Mutation', tpCompanyFavoritedJobseekerProfileDelete: { __typename?: 'TpCompanyFavoritedJobseekerProfileDeleteMutationOutputDto', ok: boolean } };


export const LoadVisibleJobseekerProfilesDocument = `
    query loadVisibleJobseekerProfiles($filter: FindAllVisibleTpJobseekerDirectoryEntriesFilter!) {
  tpJobseekerDirectoryEntriesVisible(filter: $filter) {
    id
    fullName
    firstName
    lastName
    aboutYourself
    email
  }
}
    `;
export const useLoadVisibleJobseekerProfilesQuery = <
      TData = LoadVisibleJobseekerProfilesQuery,
      TError = unknown
    >(
      variables: LoadVisibleJobseekerProfilesQueryVariables,
      options?: UseQueryOptions<LoadVisibleJobseekerProfilesQuery, TError, TData>
    ) =>
    useQuery<LoadVisibleJobseekerProfilesQuery, TError, TData>(
      ['loadVisibleJobseekerProfiles', variables],
      fetcher<LoadVisibleJobseekerProfilesQuery, LoadVisibleJobseekerProfilesQueryVariables>(LoadVisibleJobseekerProfilesDocument, variables),
      options
    );

useLoadVisibleJobseekerProfilesQuery.getKey = (variables: LoadVisibleJobseekerProfilesQueryVariables) => ['loadVisibleJobseekerProfiles', variables];
;

export const TpCompanyFavouritedJobseekerProfilesDocument = `
    query tpCompanyFavouritedJobseekerProfiles {
  tpCompanyFavoritedJobseekerProfiles {
    favoritedTpJobseekerProfileId
  }
}
    `;
export const useTpCompanyFavouritedJobseekerProfilesQuery = <
      TData = TpCompanyFavouritedJobseekerProfilesQuery,
      TError = unknown
    >(
      variables?: TpCompanyFavouritedJobseekerProfilesQueryVariables,
      options?: UseQueryOptions<TpCompanyFavouritedJobseekerProfilesQuery, TError, TData>
    ) =>
    useQuery<TpCompanyFavouritedJobseekerProfilesQuery, TError, TData>(
      variables === undefined ? ['tpCompanyFavouritedJobseekerProfiles'] : ['tpCompanyFavouritedJobseekerProfiles', variables],
      fetcher<TpCompanyFavouritedJobseekerProfilesQuery, TpCompanyFavouritedJobseekerProfilesQueryVariables>(TpCompanyFavouritedJobseekerProfilesDocument, variables),
      options
    );

useTpCompanyFavouritedJobseekerProfilesQuery.getKey = (variables?: TpCompanyFavouritedJobseekerProfilesQueryVariables) => variables === undefined ? ['tpCompanyFavouritedJobseekerProfiles'] : ['tpCompanyFavouritedJobseekerProfiles', variables];
;

export const TpCompanyMarkJobseekerAsFavouriteDocument = `
    mutation tpCompanyMarkJobseekerAsFavourite($input: TpCompanyFavoritedJobseekerProfileCreateMutationInputDto!) {
  tpCompanyFavoritedJobseekerProfileCreate(input: $input) {
    ok
  }
}
    `;
export const useTpCompanyMarkJobseekerAsFavouriteMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<TpCompanyMarkJobseekerAsFavouriteMutation, TError, TpCompanyMarkJobseekerAsFavouriteMutationVariables, TContext>) =>
    useMutation<TpCompanyMarkJobseekerAsFavouriteMutation, TError, TpCompanyMarkJobseekerAsFavouriteMutationVariables, TContext>(
      ['tpCompanyMarkJobseekerAsFavourite'],
      (variables?: TpCompanyMarkJobseekerAsFavouriteMutationVariables) => fetcher<TpCompanyMarkJobseekerAsFavouriteMutation, TpCompanyMarkJobseekerAsFavouriteMutationVariables>(TpCompanyMarkJobseekerAsFavouriteDocument, variables)(),
      options
    );
export const TpCompanyUnmarkJobseekerAsFavouriteDocument = `
    mutation tpCompanyUnmarkJobseekerAsFavourite($input: TpCompanyFavoritedJobseekerProfileDeleteMutationInputDto!) {
  tpCompanyFavoritedJobseekerProfileDelete(input: $input) {
    ok
  }
}
    `;
export const useTpCompanyUnmarkJobseekerAsFavouriteMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<TpCompanyUnmarkJobseekerAsFavouriteMutation, TError, TpCompanyUnmarkJobseekerAsFavouriteMutationVariables, TContext>) =>
    useMutation<TpCompanyUnmarkJobseekerAsFavouriteMutation, TError, TpCompanyUnmarkJobseekerAsFavouriteMutationVariables, TContext>(
      ['tpCompanyUnmarkJobseekerAsFavourite'],
      (variables?: TpCompanyUnmarkJobseekerAsFavouriteMutationVariables) => fetcher<TpCompanyUnmarkJobseekerAsFavouriteMutation, TpCompanyUnmarkJobseekerAsFavouriteMutationVariables>(TpCompanyUnmarkJobseekerAsFavouriteDocument, variables)(),
      options
    );