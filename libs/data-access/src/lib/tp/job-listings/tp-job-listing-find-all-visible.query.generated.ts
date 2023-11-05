// THIS FILE IS GENERATED, DO NOT EDIT!
import * as Types from '@talent-connect/data-access';

import { AllTpJobListingFieldsFragmentDoc } from './tp-job-listing.fragment.generated';
import { useQuery, UseQueryOptions } from 'react-query';
import { fetcher } from '@talent-connect/data-access';
export type TpJobListingFindAllVisibleQueryVariables = Types.Exact<{
  input: Types.FindAllVisibleTpJobListingsArgsFilter;
}>;


export type TpJobListingFindAllVisibleQuery = { __typename?: 'Query', tpJobListings: Array<{ __typename?: 'TpJobListing', createdAt: any, title?: string | null, updatedAt: any, employmentType?: Types.TpEmploymentType | null, id: string, idealTechnicalSkills?: Array<Types.TpTechnicalSkill> | null, isRemotePossible?: boolean | null, languageRequirements?: string | null, location?: string | null, relatesToPositions?: Array<Types.TpDesiredPosition> | null, salaryRange?: string | null, summary?: string | null, companyProfileId: string, companyName: string, profileAvatarImageS3Key?: string | null, federalState?: Types.FederalState | null, createdByCompanyRepresentative?: string | null }> };


export const TpJobListingFindAllVisibleDocument = `
    query tpJobListingFindAllVisible($input: FindAllVisibleTpJobListingsArgsFilter!) {
  tpJobListings(filter: $input) {
    ...AllTpJobListingFields
  }
}
    ${AllTpJobListingFieldsFragmentDoc}`;
export const useTpJobListingFindAllVisibleQuery = <
      TData = TpJobListingFindAllVisibleQuery,
      TError = unknown
    >(
      variables: TpJobListingFindAllVisibleQueryVariables,
      options?: UseQueryOptions<TpJobListingFindAllVisibleQuery, TError, TData>
    ) =>
    useQuery<TpJobListingFindAllVisibleQuery, TError, TData>(
      ['tpJobListingFindAllVisible', variables],
      fetcher<TpJobListingFindAllVisibleQuery, TpJobListingFindAllVisibleQueryVariables>(TpJobListingFindAllVisibleDocument, variables),
      options
    );

useTpJobListingFindAllVisibleQuery.getKey = (variables: TpJobListingFindAllVisibleQueryVariables) => ['tpJobListingFindAllVisible', variables];
;
