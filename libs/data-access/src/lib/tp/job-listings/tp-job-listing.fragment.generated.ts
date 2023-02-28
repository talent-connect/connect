// THIS FILE IS GENERATED, DO NOT EDIT!
import * as Types from '@talent-connect/data-access';

export type AllTpJobListingFieldsFragment = { __typename?: 'TpJobListing', createdAt: any, title?: string | null, updatedAt: any, employmentType?: Types.TpEmploymentType | null, id: string, idealTechnicalSkills?: Array<Types.TpTechnicalSkill> | null, isRemotePossible?: boolean | null, languageRequirements?: string | null, location?: string | null, relatesToPositions?: Array<Types.TpDesiredPosition> | null, salaryRange?: string | null, summary?: string | null };

export const AllTpJobListingFieldsFragmentDoc = `
    fragment AllTpJobListingFields on TpJobListing {
  createdAt
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
}
    `;