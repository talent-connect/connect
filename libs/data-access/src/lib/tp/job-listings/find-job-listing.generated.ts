// THIS FILE IS GENERATED, DO NOT EDIT!
import * as Types from '@talent-connect/data-access';

import { AllTpJobListingFieldsFragmentDoc } from './tp-job-listing.fragment.generated';
import { AllTpCompanyProfileFieldsFragmentDoc } from '../company-profiles/tp-company-profile.fragment.generated';
import { AllUserContactFieldsFragmentDoc } from '../../common/user-contact.generated';
import { useQuery, UseQueryOptions } from 'react-query';
import { fetcher } from '@talent-connect/data-access';
export type FindJobListingQueryVariables = Types.Exact<{
  filter: Types.FindOneTpJobListingArgsFilter;
}>;


export type FindJobListingQuery = { __typename?: 'Query', tpJobListing: { __typename?: 'TpJobListing', createdAt: any, title?: string | null, updatedAt: any, employmentType?: Types.TpEmploymentType | null, id: string, idealTechnicalSkills?: Array<Types.TpTechnicalSkill> | null, isRemotePossible?: boolean | null, languageRequirements?: string | null, location?: string | null, relatesToPositions?: Array<Types.TpDesiredPosition> | null, salaryRange?: string | null, summary?: string | null, companyProfileId: string, companyProfile: { __typename?: 'TpCompanyProfile', id: string, profileAvatarImageS3Key?: string | null, companyName: string, location?: string | null, tagline?: string | null, industry?: string | null, website?: string | null, linkedInUrl?: string | null, phoneNumber?: string | null, about?: string | null, state: Types.CompanyTalentPoolState, isProfileVisibleToJobseekers: boolean, isJobFair2023Participant: boolean, createdAt: any, updatedAt: any, companyRepresentatives: Array<{ __typename?: 'UserContact', id: string, behanceUrl?: string | null, lastName: string, linkedInProfileUrl?: string | null, loopbackUserId: string, personalDescription?: string | null, personalWebsite?: string | null, postalMailingAddress?: string | null, slackUsername?: string | null, stackOverflowUrl?: string | null, telephoneNumber?: string | null, birthDate?: any | null, twitterUrl?: string | null, updatedAt: any, createdAt: any, dribbbleUrl?: string | null, email: string, firstName: string, gender?: Types.Gender | null, githubProfileUrl?: string | null, howDidHearAboutRediKey?: Types.FirstPointOfTpContactOption | null, howDidHearAboutRediOtherText?: string | null }> } } };


export const FindJobListingDocument = `
    query findJobListing($filter: FindOneTpJobListingArgsFilter!) {
  tpJobListing(filter: $filter) {
    ...AllTpJobListingFields
    companyProfile {
      ...AllTpCompanyProfileFields
      companyRepresentatives {
        ...AllUserContactFields
      }
    }
  }
}
    ${AllTpJobListingFieldsFragmentDoc}
${AllTpCompanyProfileFieldsFragmentDoc}
${AllUserContactFieldsFragmentDoc}`;
export const useFindJobListingQuery = <
      TData = FindJobListingQuery,
      TError = unknown
    >(
      variables: FindJobListingQueryVariables,
      options?: UseQueryOptions<FindJobListingQuery, TError, TData>
    ) =>
    useQuery<FindJobListingQuery, TError, TData>(
      ['findJobListing', variables],
      fetcher<FindJobListingQuery, FindJobListingQueryVariables>(FindJobListingDocument, variables),
      options
    );

useFindJobListingQuery.getKey = (variables: FindJobListingQueryVariables) => ['findJobListing', variables];
;
