// THIS FILE IS GENERATED, DO NOT EDIT!
import * as Types from '@talent-connect/data-access';

export type AllTpJobListingFieldsFragment = { __typename?: 'TpJobListing', createdAt: any, expiresAt?: any | null, status?: Types.TpJobListingStatus | null, title?: string | null, updatedAt: any, employmentType?: Types.TpEmploymentType | null, id: string, idealTechnicalSkills?: Array<Types.TpTechnicalSkill> | null, isRemotePossible?: boolean | null, languageRequirements?: string | null, location?: string | null, relatesToPositions?: Array<Types.TpDesiredPosition> | null, salaryRange?: string | null, summary?: string | null, companyProfileId: string, companyName: string, profileAvatarImageS3Key?: string | null, federalState?: Types.FederalState | null, contactFirstName?: string | null, contactLastName?: string | null, contactEmailAddress?: string | null, contactPhoneNumber?: string | null, isFromCareerPartner: boolean };

export const AllTpJobListingFieldsFragmentDoc = `
    fragment AllTpJobListingFields on TpJobListing {
  createdAt
  expiresAt
  status
  title
  updatedAt
  employmentType
  id
  idealTechnicalSkills
  isRemotePossible
  languageRequirements
  location
  relatesToPositions
  salaryRange
  summary
  companyProfileId
  companyName
  profileAvatarImageS3Key
  federalState
  contactFirstName
  contactLastName
  contactEmailAddress
  contactPhoneNumber
  isFromCareerPartner
}
    `;