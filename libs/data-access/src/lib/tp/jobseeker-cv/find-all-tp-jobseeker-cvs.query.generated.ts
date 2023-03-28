// THIS FILE IS GENERATED, DO NOT EDIT!
import * as Types from '@talent-connect/data-access';

import { AllTpJobseekerCvFieldsFragmentDoc } from './tp-jobseeker-cv.fragment.generated';
import { useQuery, UseQueryOptions } from 'react-query';
import { fetcher } from '@talent-connect/data-access';
export type FindAllTpJobseekerCvsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type FindAllTpJobseekerCvsQuery = { __typename?: 'Query', tpJobseekerCvs: Array<{ __typename?: 'TpJobseekerCv', aboutYourself?: string | null, githubUrl?: string | null, id: string, ifAvailabilityIsDate_date?: any | null, immigrationStatus?: Types.ImmigrationStatus | null, lastName?: string | null, linkedInUrl?: string | null, location?: string | null, personalWebsite?: string | null, postalMailingAddress?: string | null, profileAvatarImageS3Key?: string | null, availability?: Types.TpAvailabilityOption | null, stackOverflowUrl?: string | null, telephoneNumber?: string | null, topSkills?: Array<Types.TpTechnicalSkill> | null, twitterUrl?: string | null, updatedAt: any, userId: string, willingToRelocate: boolean, behanceUrl?: string | null, createdAt: any, cvName: string, desiredEmploymentType?: Array<Types.TpEmploymentType> | null, desiredPositions?: Array<Types.TpDesiredPosition> | null, dribbbleUrl?: string | null, email?: string | null, firstName?: string | null }> };


export const FindAllTpJobseekerCvsDocument = `
    query findAllTpJobseekerCvs {
  tpJobseekerCvs {
    ...AllTpJobseekerCvFields
  }
}
    ${AllTpJobseekerCvFieldsFragmentDoc}`;
export const useFindAllTpJobseekerCvsQuery = <
      TData = FindAllTpJobseekerCvsQuery,
      TError = unknown
    >(
      variables?: FindAllTpJobseekerCvsQueryVariables,
      options?: UseQueryOptions<FindAllTpJobseekerCvsQuery, TError, TData>
    ) =>
    useQuery<FindAllTpJobseekerCvsQuery, TError, TData>(
      variables === undefined ? ['findAllTpJobseekerCvs'] : ['findAllTpJobseekerCvs', variables],
      fetcher<FindAllTpJobseekerCvsQuery, FindAllTpJobseekerCvsQueryVariables>(FindAllTpJobseekerCvsDocument, variables),
      options
    );

useFindAllTpJobseekerCvsQuery.getKey = (variables?: FindAllTpJobseekerCvsQueryVariables) => variables === undefined ? ['findAllTpJobseekerCvs'] : ['findAllTpJobseekerCvs', variables];
;
