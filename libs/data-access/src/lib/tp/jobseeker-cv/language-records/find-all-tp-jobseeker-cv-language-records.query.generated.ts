// THIS FILE IS GENERATED, DO NOT EDIT!
import * as Types from '@talent-connect/data-access';

import { AllTpJobseekerCvLanguageRecordFieldsFragmentDoc } from './tp-jobseeker-cv-language-record.fragment.generated';
import { useQuery, UseQueryOptions } from 'react-query';
import { fetcher } from '@talent-connect/data-access';
export type FindAllTpJobseekerCvLanguageRecordsQueryVariables = Types.Exact<{
  tpJobseekerCvId: Types.Scalars['ID'];
}>;


export type FindAllTpJobseekerCvLanguageRecordsQuery = { __typename?: 'Query', tpJobseekerCvLanguageRecords: Array<{ __typename?: 'TpJobseekerCvLanguageRecord', id: string, language: Types.Language, proficiencyLevelId: Types.LanguageProficiencyLevel, tpJobseekerCvId: string }> };


export const FindAllTpJobseekerCvLanguageRecordsDocument = `
    query findAllTpJobseekerCvLanguageRecords($tpJobseekerCvId: ID!) {
  tpJobseekerCvLanguageRecords(tpJobseekerCvId: $tpJobseekerCvId) {
    ...AllTpJobseekerCvLanguageRecordFields
  }
}
    ${AllTpJobseekerCvLanguageRecordFieldsFragmentDoc}`;
export const useFindAllTpJobseekerCvLanguageRecordsQuery = <
      TData = FindAllTpJobseekerCvLanguageRecordsQuery,
      TError = unknown
    >(
      variables: FindAllTpJobseekerCvLanguageRecordsQueryVariables,
      options?: UseQueryOptions<FindAllTpJobseekerCvLanguageRecordsQuery, TError, TData>
    ) =>
    useQuery<FindAllTpJobseekerCvLanguageRecordsQuery, TError, TData>(
      ['findAllTpJobseekerCvLanguageRecords', variables],
      fetcher<FindAllTpJobseekerCvLanguageRecordsQuery, FindAllTpJobseekerCvLanguageRecordsQueryVariables>(FindAllTpJobseekerCvLanguageRecordsDocument, variables),
      options
    );

useFindAllTpJobseekerCvLanguageRecordsQuery.getKey = (variables: FindAllTpJobseekerCvLanguageRecordsQueryVariables) => ['findAllTpJobseekerCvLanguageRecords', variables];
;
