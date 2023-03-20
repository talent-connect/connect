// THIS FILE IS GENERATED, DO NOT EDIT!
import * as Types from '@talent-connect/data-access';

export type AllTpJobseekerCvFieldsFragment = { __typename?: 'TpJobseekerCv', aboutYourself?: string | null, githubUrl?: string | null, id: string, ifAvailabilityIsDate_date?: any | null, immigrationStatus?: Types.ImmigrationStatus | null, lastName?: string | null, linkedInUrl?: string | null, location?: string | null, personalWebsite?: string | null, postalMailingAddress?: string | null, profileAvatarImageS3Key?: string | null, availability?: Types.TpAvailabilityOption | null, stackOverflowUrl?: string | null, telephoneNumber?: string | null, topSkills?: Array<Types.TpTechnicalSkill> | null, twitterUrl?: string | null, updatedAt: any, userId: string, willingToRelocate: boolean, behanceUrl?: string | null, createdAt: any, cvName: string, desiredEmploymentType?: Array<Types.TpEmploymentType> | null, desiredPositions?: Array<Types.TpDesiredPosition> | null, dribbbleUrl?: string | null, email?: string | null, firstName?: string | null };

export const AllTpJobseekerCvFieldsFragmentDoc = `
    fragment AllTpJobseekerCvFields on TpJobseekerCv {
  aboutYourself
  githubUrl
  id
  ifAvailabilityIsDate_date
  immigrationStatus
  lastName
  linkedInUrl
  location
  personalWebsite
  postalMailingAddress
  profileAvatarImageS3Key
  availability
  stackOverflowUrl
  telephoneNumber
  topSkills
  twitterUrl
  updatedAt
  userId
  willingToRelocate
  behanceUrl
  createdAt
  cvName
  desiredEmploymentType
  desiredPositions
  dribbbleUrl
  email
  firstName
}
    `;