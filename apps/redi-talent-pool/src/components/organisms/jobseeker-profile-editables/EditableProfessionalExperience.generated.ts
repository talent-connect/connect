// THIS FILE IS GENERATED, DO NOT EDIT!
import * as Types from '@talent-connect/data-access';

import { AllTpJobseekerProfileExperienceRecordFieldsFragmentDoc } from '../../../../../../libs/data-access/src/lib/tp/jobseeker-profiles/experience-records/tp-jobseeker-profile-experience-record.fragment.generated';
export type EditableProfessionalExperienceProfilePropFragment = { __typename?: 'TpJobseekerDirectoryEntry', experience?: Array<{ __typename?: 'TpJobseekerProfileExperienceRecord', city?: string | null, sortIndex: number, company?: string | null, country?: string | null, current?: boolean | null, description?: string | null, endDateMonth?: number | null, endDateYear?: number | null, startDateMonth?: number | null, startDateYear?: number | null, title?: string | null, createdAt: any, id: string, tpJobseekerProfileId: string, updatedAt: any, userId: string }> | null };

export const EditableProfessionalExperienceProfilePropFragmentDoc = `
    fragment EditableProfessionalExperienceProfileProp on TpJobseekerDirectoryEntry {
  experience {
    ...AllTpJobseekerProfileExperienceRecordFields
  }
}
    ${AllTpJobseekerProfileExperienceRecordFieldsFragmentDoc}`;