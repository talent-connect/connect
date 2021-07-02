import { EducationRecord } from './tp-jobseeker-profile-cv-shared-interfaces/EducationRecord'
import { ExperienceRecord } from './tp-jobseeker-profile-cv-shared-interfaces/ExperienceRecord'
import { LanguageRecord } from './tp-jobseeker-profile-cv-shared-interfaces/LanguageRecord'
import { ProjectRecord } from './tp-jobseeker-profile-cv-shared-interfaces/ProjectRecord'

export type TpJobseekerCv = {
  id: string
  cvName: string

  firstName: string
  lastName: string
  contactEmail: string

  genderPronouns?: string

  profileAvatarImageS3Key: string

  desiredPositions?: string[]
  phoneNumber?: string
  postalMailingAddress?: string
  location?: string

  // TODO: consider making this a array of URLs
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

  createdAt: Date
  updatedAt: Date
}
