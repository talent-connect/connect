// THIS FILE IS GENERATED, DO NOT EDIT!
import * as Types from '@talent-connect/data-access';

import { AllTpJobListingFieldsFragmentDoc } from '../../../../../../libs/data-access/src/lib/tp/job-listings/tp-job-listing.fragment.generated';
import { useQuery, UseQueryOptions } from 'react-query';
import { fetcher } from '@talent-connect/data-access';
export type LoadModalFormJobListingDataQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type LoadModalFormJobListingDataQuery = { __typename?: 'Query', tpJobListing: { __typename?: 'TpJobListing', createdAt: any, expiresAt?: any | null, status?: Types.TpJobListingStatus | null, title?: string | null, updatedAt: any, employmentType?: Types.TpEmploymentType | null, id: string, idealTechnicalSkills?: Array<Types.TpTechnicalSkill> | null, isRemotePossible?: boolean | null, languageRequirements?: string | null, location?: string | null, relatesToPositions?: Array<Types.TpDesiredPosition> | null, salaryRange?: string | null, summary?: string | null, companyProfileId: string, companyName: string, profileAvatarImageS3Key?: string | null, federalState?: Types.FederalState | null, isFromCareerPartner: boolean, contactFirstName?: string | null, contactLastName?: string | null, contactEmailAddress?: string | null, contactPhoneNumber?: string | null } };


export const LoadModalFormJobListingDataDocument = `
    query loadModalFormJobListingData($id: ID!) {
  tpJobListing(filter: {id: $id}) {
    ...AllTpJobListingFields
  }
}
    ${AllTpJobListingFieldsFragmentDoc}`;
export const useLoadModalFormJobListingDataQuery = <
      TData = LoadModalFormJobListingDataQuery,
      TError = unknown
    >(
      variables: LoadModalFormJobListingDataQueryVariables,
      options?: UseQueryOptions<LoadModalFormJobListingDataQuery, TError, TData>
    ) =>
    useQuery<LoadModalFormJobListingDataQuery, TError, TData>(
      ['loadModalFormJobListingData', variables],
      fetcher<LoadModalFormJobListingDataQuery, LoadModalFormJobListingDataQueryVariables>(LoadModalFormJobListingDataDocument, variables),
      options
    );

useLoadModalFormJobListingDataQuery.getKey = (variables: LoadModalFormJobListingDataQueryVariables) => ['loadModalFormJobListingData', variables];
;
