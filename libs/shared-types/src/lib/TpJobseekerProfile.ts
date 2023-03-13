import { HrSummit2021JobFairCompanyJobPreferenceRecord } from './tp-jobseeker-profile-cv-shared-interfaces/HrSummit2021JobFairCompanyJobPreferenceRecord'
import { LanguageRecord } from './tp-jobseeker-profile-cv-shared-interfaces/LanguageRecord'
import { TpJobseekerProfileEducationRecord } from './tp-jobseeker-profile-cv-shared-interfaces/TpJobseekerProfileEducationRecord'
import { TpJobseekerProfileExperienceRecord } from './tp-jobseeker-profile-cv-shared-interfaces/TpJobseekerProfileExperienceRecord'
import { TpJobseekerProfileState } from './TpJobseekerProfileState'

export type TpJobseekerProfile = {
  id: string
  firstName: string
  lastName: string
  contactEmail: string
  currentlyEnrolledInCourse: string

  genderPronouns?: string

  profileAvatarImageS3Key: string

  desiredPositions?: string[]
  profileImage?: string // TODO: delete me. I'm only used in the CV bukder prototype
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
  experience?: TpJobseekerProfileExperienceRecord[]
  education?: TpJobseekerProfileEducationRecord[]

  state: TpJobseekerProfileState
  willingToRelocate?: boolean

  createdAt: Date
  updatedAt: Date
  gaveGdprConsentAt: Date

  hrSummit2021JobFairCompanyJobPreferences?: HrSummit2021JobFairCompanyJobPreferenceRecord[]
  isJobFair2023Participant?: boolean

  isProfileVisibleToCompanies: boolean
  isHired: boolean

  favouritedTpJobListingIds: string[]
}
