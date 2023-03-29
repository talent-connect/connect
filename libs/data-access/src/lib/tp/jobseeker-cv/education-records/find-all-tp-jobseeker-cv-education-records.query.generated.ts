// THIS FILE IS GENERATED, DO NOT EDIT!
import * as Types from '@talent-connect/data-access';

import { AllTpJobseekerCvEducationRecordFieldsFragmentDoc } from './tp-jobseeker-cv-education-record.fragment.generated';
import { useQuery, UseQueryOptions } from 'react-query';
import { fetcher } from '@talent-connect/data-access';
export type FindAllTpJobseekerCvEducationRecordsQueryVariables = Types.Exact<{
  tpJobseekerCvId: Types.Scalars['ID'];
}>;


export type FindAllTpJobseekerCvEducationRecordsQuery = { __typename?: 'Query', tpJobseekerCvEducationRecords: Array<{ __typename?: 'TpJobseekerCvEducationRecord', id: string, certificationType?: Types.TpEducationCertificationType | null, sortIndex: number, startDateMonth?: number | null, startDateYear?: number | null, title?: string | null, tpJobseekerCvId: string, updatedAt: any, createdAt: any, current?: boolean | null, description?: string | null, endDateMonth?: number | null, endDateYear?: number | null, institutionCity?: string | null, institutionCountry?: string | null, institutionName?: string | null }> };


export const FindAllTpJobseekerCvEducationRecordsDocument = `
    query findAllTpJobseekerCvEducationRecords($tpJobseekerCvId: ID!) {
  tpJobseekerCvEducationRecords(tpJobseekerCvId: $tpJobseekerCvId) {
    ...AllTpJobseekerCvEducationRecordFields
  }
}
    ${AllTpJobseekerCvEducationRecordFieldsFragmentDoc}`;
export const useFindAllTpJobseekerCvEducationRecordsQuery = <
      TData = FindAllTpJobseekerCvEducationRecordsQuery,
      TError = unknown
    >(
      variables: FindAllTpJobseekerCvEducationRecordsQueryVariables,
      options?: UseQueryOptions<FindAllTpJobseekerCvEducationRecordsQuery, TError, TData>
    ) =>
    useQuery<FindAllTpJobseekerCvEducationRecordsQuery, TError, TData>(
      ['findAllTpJobseekerCvEducationRecords', variables],
      fetcher<FindAllTpJobseekerCvEducationRecordsQuery, FindAllTpJobseekerCvEducationRecordsQueryVariables>(FindAllTpJobseekerCvEducationRecordsDocument, variables),
      options
    );

useFindAllTpJobseekerCvEducationRecordsQuery.getKey = (variables: FindAllTpJobseekerCvEducationRecordsQueryVariables) => ['findAllTpJobseekerCvEducationRecords', variables];
;
