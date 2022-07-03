// THIS FILE IS GENERATED, DO NOT EDIT!
import * as Types from '@talent-connect/data-access';

import { useMutation, useQuery, UseMutationOptions, UseQueryOptions } from 'react-query';
import { fetcher } from '@talent-connect/data-access';
export type FavoriteMentorMutationVariables = Types.Exact<{
  input: Types.ConMenteeFavoritedMentorCreateMutationInputDto;
}>;


export type FavoriteMentorMutation = { __typename?: 'Mutation', conMenteeFavoritedMentorCreate: { __typename?: 'ConMenteeFavoritedMentorCreateMutationOutputDto', ok: boolean } };

export type UnfavoriteMentorMutationVariables = Types.Exact<{
  input: Types.ConMenteeFavoritedMentorDeleteMutationInputDto;
}>;


export type UnfavoriteMentorMutation = { __typename?: 'Mutation', conMenteeFavoritedMentorDelete: { __typename?: 'ConMenteeFavoritedMentorDeleteMutationOutputDto', ok: boolean } };

export type ListFavoriteMentorsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ListFavoriteMentorsQuery = { __typename?: 'Query', conMenteeFavoritedMentors: Array<{ __typename?: 'ConMenteeFavoritedMentor', mentorId: string }> };


export const FavoriteMentorDocument = `
    mutation favoriteMentor($input: ConMenteeFavoritedMentorCreateMutationInputDto!) {
  conMenteeFavoritedMentorCreate(input: $input) {
    ok
  }
}
    `;
export const useFavoriteMentorMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<FavoriteMentorMutation, TError, FavoriteMentorMutationVariables, TContext>) =>
    useMutation<FavoriteMentorMutation, TError, FavoriteMentorMutationVariables, TContext>(
      ['favoriteMentor'],
      (variables?: FavoriteMentorMutationVariables) => fetcher<FavoriteMentorMutation, FavoriteMentorMutationVariables>(FavoriteMentorDocument, variables)(),
      options
    );
export const UnfavoriteMentorDocument = `
    mutation unfavoriteMentor($input: ConMenteeFavoritedMentorDeleteMutationInputDto!) {
  conMenteeFavoritedMentorDelete(input: $input) {
    ok
  }
}
    `;
export const useUnfavoriteMentorMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UnfavoriteMentorMutation, TError, UnfavoriteMentorMutationVariables, TContext>) =>
    useMutation<UnfavoriteMentorMutation, TError, UnfavoriteMentorMutationVariables, TContext>(
      ['unfavoriteMentor'],
      (variables?: UnfavoriteMentorMutationVariables) => fetcher<UnfavoriteMentorMutation, UnfavoriteMentorMutationVariables>(UnfavoriteMentorDocument, variables)(),
      options
    );
export const ListFavoriteMentorsDocument = `
    query listFavoriteMentors {
  conMenteeFavoritedMentors {
    mentorId
  }
}
    `;
export const useListFavoriteMentorsQuery = <
      TData = ListFavoriteMentorsQuery,
      TError = unknown
    >(
      variables?: ListFavoriteMentorsQueryVariables,
      options?: UseQueryOptions<ListFavoriteMentorsQuery, TError, TData>
    ) =>
    useQuery<ListFavoriteMentorsQuery, TError, TData>(
      variables === undefined ? ['listFavoriteMentors'] : ['listFavoriteMentors', variables],
      fetcher<ListFavoriteMentorsQuery, ListFavoriteMentorsQueryVariables>(ListFavoriteMentorsDocument, variables),
      options
    );

useListFavoriteMentorsQuery.getKey = (variables?: ListFavoriteMentorsQueryVariables) => variables === undefined ? ['listFavoriteMentors'] : ['listFavoriteMentors', variables];
;
