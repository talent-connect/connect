import { Timestamp } from './Timestamp';
import { EducationRecord } from './tp-jobseeker-profile-cv-shared-interfaces/EducationRecord'
import { ExperienceRecord } from './tp-jobseeker-profile-cv-shared-interfaces/ExperienceRecord'
import { HrSummit2021JobFairCompanyJobPreferenceRecord } from './tp-jobseeker-profile-cv-shared-interfaces/HrSummit2021JobFairCompanyJobPreferenceRecord'
import { LanguageRecord } from './tp-jobseeker-profile-cv-shared-interfaces/LanguageRecord'
import { ProjectRecord } from './tp-jobseeker-profile-cv-shared-interfaces/ProjectRecord'
import { TpJobSeekerProfileState } from './TpJobSeekerProfileState'

export type TpJobSeekerProfile =
  & Timestamp
  & {
  id: string
  firstName: string
  lastName: string
  contactEmail: string
  currentlyEnrolledInCourse: string

  genderPronouns?: string // TODO use GenderKey?

  profileAvatarImageS3Key: string

  desiredPositions?: string[]
  profileImage?: string // TODO: delete me. I'm only used in the CV bukder prototype
  phoneNumber?: string
  postalMailingAddress?: string
  location?: string

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
  projects?: ProjectRecord[]

  state: TpJobSeekerProfileState

  gaveGdprConsentAt: Date

  hrSummit2021JobFairCompanyJobPreferences?: HrSummit2021JobFairCompanyJobPreferenceRecord[]
  isJobFair2022Participant?: boolean

  isProfileVisibleToCompanies: boolean
}
