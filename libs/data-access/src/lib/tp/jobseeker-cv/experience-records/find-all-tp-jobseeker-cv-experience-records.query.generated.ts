// THIS FILE IS GENERATED, DO NOT EDIT!
import * as Types from '@talent-connect/data-access';

import { AllTpJobseekerCvExperienceRecordFieldsFragmentDoc } from './tp-jobseeker-cv-experience-record.fragment.generated';
import { useQuery, UseQueryOptions } from 'react-query';
import { fetcher } from '@talent-connect/data-access';
export type FindAllTpJobseekerCvExperienceRecordsQueryVariables = Types.Exact<{
  tpJobseekerCvId: Types.Scalars['ID'];
}>;


export type FindAllTpJobseekerCvExperienceRecordsQuery = { __typename?: 'Query', tpJobseekerCvExperienceRecords: Array<{ __typename?: 'TpJobseekerCvExperienceRecord', city?: string | null, startDateMonth?: number | null, startDateYear?: number | null, title?: string | null, tpJobseekerCvId: string, updatedAt: any, company?: string | null, country?: string | null, createdAt: any, current?: boolean | null, description?: string | null, endDateMonth?: number | null, endDateYear?: number | null, id: string, sortIndex: number }> };


export const FindAllTpJobseekerCvExperienceRecordsDocument = `
    query findAllTpJobseekerCvExperienceRecords($tpJobseekerCvId: ID!) {
  tpJobseekerCvExperienceRecords(tpJobseekerCvId: $tpJobseekerCvId) {
    ...AllTpJobseekerCvExperienceRecordFields
  }
}
    ${AllTpJobseekerCvExperienceRecordFieldsFragmentDoc}`;
export const useFindAllTpJobseekerCvExperienceRecordsQuery = <
      TData = FindAllTpJobseekerCvExperienceRecordsQuery,
      TError = unknown
    >(
      variables: FindAllTpJobseekerCvExperienceRecordsQueryVariables,
      options?: UseQueryOptions<FindAllTpJobseekerCvExperienceRecordsQuery, TError, TData>
    ) =>
    useQuery<FindAllTpJobseekerCvExperienceRecordsQuery, TError, TData>(
      ['findAllTpJobseekerCvExperienceRecords', variables],
      fetcher<FindAllTpJobseekerCvExperienceRecordsQuery, FindAllTpJobseekerCvExperienceRecordsQueryVariables>(FindAllTpJobseekerCvExperienceRecordsDocument, variables),
      options
    );

useFindAllTpJobseekerCvExperienceRecordsQuery.getKey = (variables: FindAllTpJobseekerCvExperienceRecordsQueryVariables) => ['findAllTpJobseekerCvExperienceRecords', variables];
;
