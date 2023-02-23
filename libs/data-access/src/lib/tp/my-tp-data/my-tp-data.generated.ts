// THIS FILE IS GENERATED, DO NOT EDIT!
import * as Types from '@talent-connect/data-access';

import { AllCompanyRepresentativeRelationshipFieldsFragmentDoc } from '../company-representative-relationship/company-representative-relationship.fragment.generated';
import { AllTpCompanyProfileFieldsFragmentDoc } from '../company-profiles/tp-company-profile.fragment.generated';
import { AllTpJobseekerProfileFieldsFragmentDoc } from '../jobseeker-profiles/tp-jobseeker-profile.graphql.generated';
import { useQuery, UseQueryOptions } from 'react-query';
import { fetcher } from '@talent-connect/data-access';
export type MyTpDataQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type MyTpDataQuery = { __typename?: 'Query', tpCurrentUserDataGet: { __typename?: 'TpCurrentUserData', companyRepresentativeRelationship?: { __typename?: 'TpCompanyRepresentativeRelationship', id: string, tpCompanyProfileId: string, userId: string, status: Types.TpCompanyRepresentativeRelationshipStatus, createdAt: any, updatedAt: any } | null, representedCompany?: { __typename?: 'TpCompanyProfile', id: string, profileAvatarImageS3Key?: string | null, companyName: string, location?: string | null, tagline?: string | null, industry?: string | null, website?: string | null, linkedInUrl?: string | null, phoneNumber?: string | null, about?: string | null, state: Types.CompanyTalentPoolState, isProfileVisibleToJobseekers: boolean, createdAt: any, updatedAt: any } | null, jobseekerProfile?: { __typename?: 'TpJobseekerProfile', aboutYourself?: string | null, federalState?: Types.FederalState | null, firstName: string, fullName: string, genderPronouns?: string | null, githubUrl?: string | null, id: string, ifAvailabilityIsDate_date?: any | null, isHired: boolean, isJobFair2022Participant: boolean, isJobFair2023Participant: boolean, availability?: Types.TpAvailabilityOption | null, isProfileVisibleToCompanies: boolean, lastName: string, linkedInUrl?: string | null, location?: string | null, loopbackUserId: string, personalWebsite?: string | null, postalMailingAddress?: string | null, profileAvatarImageS3Key?: string | null, rediLocation?: string | null, behanceUrl?: string | null, stackOverflowUrl?: string | null, state: Types.JobseekerProfileStatus, telephoneNumber?: string | null, topSkills?: Array<Types.TpTechnicalSkill> | null, twitterUrl?: string | null, updatedAt: any, userId: string, willingToRelocate: boolean, createdAt: any, currentlyEnrolledInCourse?: string | null, desiredEmploymentType?: Array<Types.TpDesiredEmploymentType> | null, desiredPositions?: Array<Types.TpDesiredPosition> | null, dribbbleUrl?: string | null, email: string, experience?: Array<{ __typename?: 'ExperienceRecord', city?: string | null, uuid: string, company?: string | null, country?: string | null, current?: boolean | null, description?: string | null, endDateMonth?: number | null, endDateYear?: number | null, startDateMonth?: number | null, startDateYear?: number | null, title?: string | null }> | null, workingLanguages?: Array<{ __typename?: 'LanguageRecord', language: Types.Language, proficiencyLevelId: Types.LanguageProficiencyLevel }> | null, education?: Array<{ __typename?: 'EducationRecord', certificationType?: Types.TpEducationCertificationType | null, title?: string | null, uuid: string, current?: boolean | null, description?: string | null, endDateMonth?: number | null, endDateYear?: number | null, institutionCity?: string | null, institutionCountry?: string | null, institutionName?: string | null, startDateMonth?: number | null, startDateYear?: number | null }> | null } | null } };


export const MyTpDataDocument = `
    query myTpData {
  tpCurrentUserDataGet {
    companyRepresentativeRelationship {
      ...AllCompanyRepresentativeRelationshipFields
    }
    representedCompany {
      ...AllTpCompanyProfileFields
    }
    jobseekerProfile {
      ...AllTpJobseekerProfileFields
    }
  }
}
    ${AllCompanyRepresentativeRelationshipFieldsFragmentDoc}
${AllTpCompanyProfileFieldsFragmentDoc}
${AllTpJobseekerProfileFieldsFragmentDoc}`;
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
