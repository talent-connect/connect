// THIS FILE IS GENERATED, DO NOT EDIT!
import * as Types from '@talent-connect/data-access';

import { AllCompanyRepresentativeRelationshipFieldsFragmentDoc } from '../company-representative-relationship/company-representative-relationship.fragment.generated';
import { AllTpCompanyProfileFieldsFragmentDoc } from '../company-profiles/tp-company-profile.fragment.generated';
import { useQuery, UseQueryOptions } from 'react-query';
import { fetcher } from '@talent-connect/data-access';
export type MyTpDataQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type MyTpDataQuery = { __typename?: 'Query', tpCurrentUserDataGet: { __typename?: 'TpCurrentUserData', companyRepresentativeStatus: { __typename?: 'TpCompanyRepresentativeRelationship', id: string, tpCompanyProfileId: string, userId: string, status: Types.TpCompanyRepresentativeRelationshipStatus, createdAt: any, updatedAt: any }, representedCompany: { __typename?: 'TpCompanyProfile', id: string, profileAvatarImageS3Key?: string | null, companyName: string, location?: string | null, tagline?: string | null, industry?: string | null, website?: string | null, linkedInUrl?: string | null, phoneNumber?: string | null, about?: string | null, state: Types.CompanyTalentPoolState, isProfileVisibleToJobseekers: boolean, createdAt: any, updatedAt: any } } };


export const MyTpDataDocument = `
    query myTpData {
  tpCurrentUserDataGet {
    companyRepresentativeStatus {
      ...AllCompanyRepresentativeRelationshipFields
    }
    representedCompany {
      ...AllTpCompanyProfileFields
    }
  }
}
    ${AllCompanyRepresentativeRelationshipFieldsFragmentDoc}
${AllTpCompanyProfileFieldsFragmentDoc}`;
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
