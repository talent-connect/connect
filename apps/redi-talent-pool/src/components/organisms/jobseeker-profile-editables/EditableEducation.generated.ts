// THIS FILE IS GENERATED, DO NOT EDIT!
import * as Types from '@talent-connect/data-access';

import { AllTpJobseekerProfileEducationRecordFieldsFragmentDoc } from '../../../../../../libs/data-access/src/lib/tp/jobseeker-profiles/education-records/tp-jobseeker-profile-education-record.fragment.generated';
export type EditableEducationProfilePropFragment = { __typename?: 'TpJobseekerDirectoryEntry', education?: Array<{ __typename?: 'TpJobseekerProfileEducationRecord', certificationType?: Types.TpEducationCertificationType | null, title?: string | null, sortIndex: number, current?: boolean | null, description?: string | null, endDateMonth?: number | null, endDateYear?: number | null, institutionCity?: string | null, institutionCountry?: string | null, institutionName?: string | null, startDateMonth?: number | null, startDateYear?: number | null, createdAt: any, id: string, tpJobseekerProfileId: string, updatedAt: any, userId: string }> | null };

export const EditableEducationProfilePropFragmentDoc = `
    fragment EditableEducationProfileProp on TpJobseekerDirectoryEntry {
  education {
    ...AllTpJobseekerProfileEducationRecordFields
  }
}
    ${AllTpJobseekerProfileEducationRecordFieldsFragmentDoc}`;