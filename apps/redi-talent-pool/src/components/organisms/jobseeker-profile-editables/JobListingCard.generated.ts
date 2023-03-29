// THIS FILE IS GENERATED, DO NOT EDIT!
import * as Types from '@talent-connect/data-access';

export type JobListingCardJobListingPropFragment = { __typename?: 'TpJobListing', id: string, title?: string | null, idealTechnicalSkills?: Array<Types.TpTechnicalSkill> | null, companyName: string, profileAvatarImageS3Key?: string | null };

export const JobListingCardJobListingPropFragmentDoc = `
    fragment JobListingCardJobListingProp on TpJobListing {
  id
  title
  idealTechnicalSkills
  companyName
  profileAvatarImageS3Key
}
    `;