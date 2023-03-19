// THIS FILE IS GENERATED, DO NOT EDIT!
import * as Types from '@talent-connect/data-access';

export type AllTpJobseekerProfileEducationRecordFieldsFragment = { __typename?: 'TpJobseekerProfileEducationRecord', certificationType?: Types.TpEducationCertificationType | null, title?: string | null, sortIndex: number, current?: boolean | null, description?: string | null, endDateMonth?: number | null, endDateYear?: number | null, institutionCity?: string | null, institutionCountry?: string | null, institutionName?: string | null, startDateMonth?: number | null, startDateYear?: number | null, createdAt: any, id: string, tpJobseekerProfileId: string, updatedAt: any, userId: string };

export const AllTpJobseekerProfileEducationRecordFieldsFragmentDoc = `
    fragment AllTpJobseekerProfileEducationRecordFields on TpJobseekerProfileEducationRecord {
  certificationType
  title
  sortIndex
  current
  description
  endDateMonth
  endDateYear
  institutionCity
  institutionCountry
  institutionName
  startDateMonth
  startDateYear
  createdAt
  id
  tpJobseekerProfileId
  updatedAt
  userId
}
    `;