// THIS FILE IS GENERATED, DO NOT EDIT!
import * as Types from '@talent-connect/data-access';

import { AllTpJobseekerCvFieldsFragmentDoc } from './tp-jobseeker-cv.fragment.generated';
import { useQuery, UseQueryOptions } from 'react-query';
import { fetcherForCon } from '@talent-connect/data-access';
export type FindOneTpJobseekerCvQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type FindOneTpJobseekerCvQuery = { __typename?: 'Query', tpJobseekerCv: { __typename?: 'TpJobseekerCv', aboutYourself?: string | null, githubUrl?: string | null, id: string, ifAvailabilityIsDate_date?: any | null, immigrationStatus?: Types.ImmigrationStatus | null, lastName?: string | null, linkedInUrl?: string | null, location?: string | null, personalWebsite?: string | null, postalMailingAddress?: string | null, profileAvatarImageS3Key?: string | null, availability?: Types.TpAvailabilityOption | null, stackOverflowUrl?: string | null, telephoneNumber?: string | null, topSkills?: Array<Types.TpTechnicalSkill> | null, twitterUrl?: string | null, updatedAt: any, userId: string, willingToRelocate: boolean, behanceUrl?: string | null, createdAt: any, cvName: string, desiredEmploymentType?: Array<Types.TpEmploymentType> | null, desiredPositions?: Array<Types.TpDesiredPosition> | null, dribbbleUrl?: string | null, email?: string | null, firstName?: string | null } };


export const FindOneTpJobseekerCvDocument = `
    query findOneTpJobseekerCv($id: ID!) {
  tpJobseekerCv(id: $id) {
    ...AllTpJobseekerCvFields
  }
}
    ${AllTpJobseekerCvFieldsFragmentDoc}`;
export const useFindOneTpJobseekerCvQuery = <
      TData = FindOneTpJobseekerCvQuery,
      TError = unknown
    >(
      variables: FindOneTpJobseekerCvQueryVariables,
      options?: UseQueryOptions<FindOneTpJobseekerCvQuery, TError, TData>
    ) =>
    useQuery<FindOneTpJobseekerCvQuery, TError, TData>(
      ['findOneTpJobseekerCv', variables],
      fetcherForCon<FindOneTpJobseekerCvQuery, FindOneTpJobseekerCvQueryVariables>(FindOneTpJobseekerCvDocument, variables),
      options
    );

useFindOneTpJobseekerCvQuery.getKey = (variables: FindOneTpJobseekerCvQueryVariables) => ['findOneTpJobseekerCv', variables];
;
