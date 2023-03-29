// THIS FILE IS GENERATED, DO NOT EDIT!
import * as Types from '@talent-connect/data-access';

export type EditableImportantDetailsProfilePropFragment = { __typename?: 'TpJobseekerDirectoryEntry', desiredEmploymentType?: Array<Types.TpEmploymentType> | null, availability?: Types.TpAvailabilityOption | null, telephoneNumber?: string | null, postalMailingAddress?: string | null, immigrationStatus?: Types.ImmigrationStatus | null, ifAvailabilityIsDate_date?: any | null, email: string, willingToRelocate: boolean };

export const EditableImportantDetailsProfilePropFragmentDoc = `
    fragment EditableImportantDetailsProfileProp on TpJobseekerDirectoryEntry {
  desiredEmploymentType
  availability
  telephoneNumber
  postalMailingAddress
  immigrationStatus
  ifAvailabilityIsDate_date
  email
  willingToRelocate
}
    `;