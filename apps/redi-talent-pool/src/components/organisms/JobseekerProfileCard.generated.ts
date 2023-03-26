// THIS FILE IS GENERATED, DO NOT EDIT!
import * as Types from '@talent-connect/data-access';

export type JobseekerProfileCardJobseekerProfilePropFragment = { __typename?: 'TpJobseekerDirectoryEntry', id: string, fullName: string, desiredPositions?: Array<Types.TpDesiredPosition> | null, topSkills?: Array<Types.TpTechnicalSkill> | null, profileAvatarImageS3Key?: string | null, isHired: boolean };

export const JobseekerProfileCardJobseekerProfilePropFragmentDoc = `
    fragment JobseekerProfileCardJobseekerProfileProp on TpJobseekerDirectoryEntry {
  id
  fullName
  desiredPositions
  topSkills
  profileAvatarImageS3Key
  isHired
}
    `;