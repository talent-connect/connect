// THIS FILE IS GENERATED, DO NOT EDIT!
import * as Types from '@talent-connect/data-access';

export type AllTpJobseekerCvEducationRecordFieldsFragment = { __typename?: 'TpJobseekerCvEducationRecord', id: string, certificationType?: Types.TpEducationCertificationType | null, sortIndex: number, startDateMonth?: number | null, startDateYear?: number | null, title?: string | null, tpJobseekerCvId: string, updatedAt: any, createdAt: any, current?: boolean | null, description?: string | null, endDateMonth?: number | null, endDateYear?: number | null, institutionCity?: string | null, institutionCountry?: string | null, institutionName?: string | null };

export const AllTpJobseekerCvEducationRecordFieldsFragmentDoc = `
    fragment AllTpJobseekerCvEducationRecordFields on TpJobseekerCvEducationRecord {
  id
  certificationType
  sortIndex
  startDateMonth
  startDateYear
  title
  tpJobseekerCvId
  updatedAt
  createdAt
  current
  description
  endDateMonth
  endDateYear
  institutionCity
  institutionCountry
  institutionName
}
    `;