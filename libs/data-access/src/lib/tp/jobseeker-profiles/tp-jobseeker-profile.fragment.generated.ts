// THIS FILE IS GENERATED, DO NOT EDIT!
import * as Types from '@talent-connect/data-access';

export type AllTpJobseekerProfileFieldsFragment = { __typename?: 'TpJobseekerProfile', aboutYourself?: string | null, federalState?: Types.FederalState | null, firstName: string, fullName: string, genderPronouns?: string | null, githubUrl?: string | null, id: string, ifAvailabilityIsDate_date?: any | null, isHired: boolean, isJobFair2022Participant: boolean, isJobFair2023Participant: boolean, availability?: Types.TpAvailabilityOption | null, isProfileVisibleToCompanies: boolean, lastName: string, linkedInUrl?: string | null, location?: string | null, loopbackUserId: string, personalWebsite?: string | null, postalMailingAddress?: string | null, profileAvatarImageS3Key?: string | null, rediLocation?: string | null, behanceUrl?: string | null, stackOverflowUrl?: string | null, state: Types.JobseekerProfileStatus, telephoneNumber?: string | null, topSkills?: Array<Types.TpTechnicalSkill> | null, twitterUrl?: string | null, updatedAt: any, userId: string, willingToRelocate: boolean, createdAt: any, currentlyEnrolledInCourse?: string | null, desiredEmploymentType?: Array<Types.TpEmploymentType> | null, desiredPositions?: Array<Types.TpDesiredPosition> | null, dribbbleUrl?: string | null, email: string, experience?: Array<{ __typename?: 'ExperienceRecord', city?: string | null, uuid: string, company?: string | null, country?: string | null, current?: boolean | null, description?: string | null, endDateMonth?: number | null, endDateYear?: number | null, startDateMonth?: number | null, startDateYear?: number | null, title?: string | null }> | null, workingLanguages?: Array<{ __typename?: 'LanguageRecord', language: Types.Language, proficiencyLevelId: Types.LanguageProficiencyLevel }> | null, education?: Array<{ __typename?: 'EducationRecord', certificationType?: Types.TpEducationCertificationType | null, title?: string | null, uuid: string, current?: boolean | null, description?: string | null, endDateMonth?: number | null, endDateYear?: number | null, institutionCity?: string | null, institutionCountry?: string | null, institutionName?: string | null, startDateMonth?: number | null, startDateYear?: number | null }> | null };

export const AllTpJobseekerProfileFieldsFragmentDoc = `
    fragment AllTpJobseekerProfileFields on TpJobseekerProfile {
  aboutYourself
  experience {
    city
    uuid
    company
    country
    current
    description
    endDateMonth
    endDateYear
    startDateMonth
    startDateYear
    title
  }
  federalState
  firstName
  fullName
  genderPronouns
  githubUrl
  id
  ifAvailabilityIsDate_date
  isHired
  isJobFair2022Participant
  isJobFair2023Participant
  availability
  isProfileVisibleToCompanies
  lastName
  linkedInUrl
  location
  loopbackUserId
  personalWebsite
  postalMailingAddress
  profileAvatarImageS3Key
  rediLocation
  behanceUrl
  stackOverflowUrl
  state
  telephoneNumber
  topSkills
  twitterUrl
  updatedAt
  userId
  willingToRelocate
  workingLanguages {
    language
    proficiencyLevelId
  }
  createdAt
  currentlyEnrolledInCourse
  desiredEmploymentType
  desiredPositions
  dribbbleUrl
  education {
    certificationType
    title
    uuid
    current
    description
    endDateMonth
    endDateYear
    institutionCity
    institutionCountry
    institutionName
    startDateMonth
    startDateYear
  }
  email
}
    `;