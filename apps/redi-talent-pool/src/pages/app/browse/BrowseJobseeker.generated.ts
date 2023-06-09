// THIS FILE IS GENERATED, DO NOT EDIT!
import * as Types from '@talent-connect/data-access';

import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from 'react-query';
import { fetcher } from '@talent-connect/data-access';
export type TpJobseekerFavouritedJobListingsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type TpJobseekerFavouritedJobListingsQuery = { __typename?: 'Query', tpJobseekerFavoritedJobListings: Array<{ __typename?: 'TpJobseekerFavoritedJobListing', tpJobListingId: string }> };

export type TpJobListingMarkAsFavouriteMutationVariables = Types.Exact<{
  input: Types.TpJobseekerFavoritedJobListingCreateMutationInputDto;
}>;


export type TpJobListingMarkAsFavouriteMutation = { __typename?: 'Mutation', tpJobseekerFavoritedJobListingCreate: { __typename?: 'TpJobseekerFavoritedJobListingCreateMutationOutputDto', ok: boolean } };

export type TpJobListingUnfavouriteMutationVariables = Types.Exact<{
  input: Types.TpJobseekerFavoritedJobListingDeleteMutationInputDto;
}>;


export type TpJobListingUnfavouriteMutation = { __typename?: 'Mutation', tpJobseekerFavoritedJobListingDelete: { __typename?: 'TpJobseekerFavoritedJobListingDeleteMutationOutputDto', ok: boolean } };


export const TpJobseekerFavouritedJobListingsDocument = `
    query tpJobseekerFavouritedJobListings {
  tpJobseekerFavoritedJobListings {
    tpJobListingId
  }
}
    `;
export const useTpJobseekerFavouritedJobListingsQuery = <
      TData = TpJobseekerFavouritedJobListingsQuery,
      TError = unknown
    >(
      variables?: TpJobseekerFavouritedJobListingsQueryVariables,
      options?: UseQueryOptions<TpJobseekerFavouritedJobListingsQuery, TError, TData>
    ) =>
    useQuery<TpJobseekerFavouritedJobListingsQuery, TError, TData>(
      variables === undefined ? ['tpJobseekerFavouritedJobListings'] : ['tpJobseekerFavouritedJobListings', variables],
      fetcher<TpJobseekerFavouritedJobListingsQuery, TpJobseekerFavouritedJobListingsQueryVariables>(TpJobseekerFavouritedJobListingsDocument, variables),
      options
    );

useTpJobseekerFavouritedJobListingsQuery.getKey = (variables?: TpJobseekerFavouritedJobListingsQueryVariables) => variables === undefined ? ['tpJobseekerFavouritedJobListings'] : ['tpJobseekerFavouritedJobListings', variables];
;

export const TpJobListingMarkAsFavouriteDocument = `
    mutation tpJobListingMarkAsFavourite($input: TpJobseekerFavoritedJobListingCreateMutationInputDto!) {
  tpJobseekerFavoritedJobListingCreate(input: $input) {
    ok
  }
}
    `;
export const useTpJobListingMarkAsFavouriteMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<TpJobListingMarkAsFavouriteMutation, TError, TpJobListingMarkAsFavouriteMutationVariables, TContext>) =>
    useMutation<TpJobListingMarkAsFavouriteMutation, TError, TpJobListingMarkAsFavouriteMutationVariables, TContext>(
      ['tpJobListingMarkAsFavourite'],
      (variables?: TpJobListingMarkAsFavouriteMutationVariables) => fetcher<TpJobListingMarkAsFavouriteMutation, TpJobListingMarkAsFavouriteMutationVariables>(TpJobListingMarkAsFavouriteDocument, variables)(),
      options
    );
export const TpJobListingUnfavouriteDocument = `
    mutation tpJobListingUnfavourite($input: TpJobseekerFavoritedJobListingDeleteMutationInputDto!) {
  tpJobseekerFavoritedJobListingDelete(input: $input) {
    ok
  }
}
    `;
export const useTpJobListingUnfavouriteMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<TpJobListingUnfavouriteMutation, TError, TpJobListingUnfavouriteMutationVariables, TContext>) =>
    useMutation<TpJobListingUnfavouriteMutation, TError, TpJobListingUnfavouriteMutationVariables, TContext>(
      ['tpJobListingUnfavourite'],
      (variables?: TpJobListingUnfavouriteMutationVariables) => fetcher<TpJobListingUnfavouriteMutation, TpJobListingUnfavouriteMutationVariables>(TpJobListingUnfavouriteDocument, variables)(),
      options
    );