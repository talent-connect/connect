// THIS FILE IS GENERATED, DO NOT EDIT!
import * as Types from '@talent-connect/data-access';

export type AllTpCompanyProfileFieldsFragment = { __typename?: 'TpCompanyProfile', id: string, profileAvatarImageS3Key?: string | null, companyName: string, location?: string | null, tagline?: string | null, industry?: string | null, website?: string | null, linkedInUrl?: string | null, telephoneNumber?: string | null, about?: string | null, state: Types.CompanyTalentPoolState, isProfileVisibleToJobseekers: boolean, joinsDusseldorf24WinterJobFair?: boolean | null, joinsMunich24SummerJobFair?: boolean | null, createdAt: any, updatedAt: any };

export const AllTpCompanyProfileFieldsFragmentDoc = `
    fragment AllTpCompanyProfileFields on TpCompanyProfile {
  id
  profileAvatarImageS3Key
  companyName
  location
  tagline
  industry
  website
  linkedInUrl
  telephoneNumber
  about
  state
  isProfileVisibleToJobseekers
  joinsDusseldorf24WinterJobFair
  joinsMunich24SummerJobFair
  createdAt
  updatedAt
}
    `;