// THIS FILE IS GENERATED, DO NOT EDIT!
import * as Types from '@talent-connect/data-access';

export type EditableNamePhotoLocationJobseekerProfilePropFragment = { __typename?: 'TpJobseekerDirectoryEntry', firstName: string, lastName: string, genderPronouns?: string | null, location?: string | null, federalState?: Types.FederalState | null, willingToRelocate: boolean, profileAvatarImageS3Key?: string | null };

export const EditableNamePhotoLocationJobseekerProfilePropFragmentDoc = `
    fragment EditableNamePhotoLocationJobseekerProfileProp on TpJobseekerDirectoryEntry {
  firstName
  lastName
  genderPronouns
  location
  federalState
  willingToRelocate
  profileAvatarImageS3Key
}
    `;