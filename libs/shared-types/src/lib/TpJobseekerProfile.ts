import { EducationRecord } from './tp-jobseeker-profile-cv-shared-interfaces/EducationRecord'
import { ExperienceRecord } from './tp-jobseeker-profile-cv-shared-interfaces/ExperienceRecord'
import { HrSummit2021JobFairCompanyJobPreferenceRecord } from './tp-jobseeker-profile-cv-shared-interfaces/HrSummit2021JobFairCompanyJobPreferenceRecord'
import { LanguageRecord } from './tp-jobseeker-profile-cv-shared-interfaces/LanguageRecord'
import { TpJobseekerProfileState } from './TpJobseekerProfileState'

export type TpJobseekerProfile = {
  id: string
  firstName: string
  lastName: string
  contactEmail: string

  genderPronouns?: string

  profileAvatarImageS3Key: string

  desiredPositions?: string[]
  profileImage?: string // TODO: delete me. I'm only used in the CV builder prototype
  phoneNumber?: string
  postalMailingAddress?: string
  location?: string
  federalState?: string

  personalWebsite?: string
  githubUrl?: string
  linkedInUrl?: string
  twitterUrl?: string
  behanceUrl?: string
  stackOverflowUrl?: string
  dribbbleUrl?: string

  workingLanguages?: LanguageRecord[]
  yearsOfRelevantExperience?: string
  desiredEmploymentType?: string[]
  availability?: string
  ifAvailabilityIsDate_date?: Date
  immigrationStatus?: string
  aboutYourself?: string
  topSkills?: string[]
  experience?: ExperienceRecord[]
  education?: EducationRecord[]

  state: TpJobseekerProfileState
  willingToRelocate?: boolean

  createdAt: Date
  updatedAt: Date
  gaveGdprConsentAt: Date

  hrSummit2021JobFairCompanyJobPreferences?: HrSummit2021JobFairCompanyJobPreferenceRecord[]

  isProfileVisibleToCompanies: boolean
  isHired: boolean

  favouritedTpJobListingIds: string[]
}
