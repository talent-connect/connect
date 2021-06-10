import { Language } from './Language'
import { TpJobseekerProfileState } from './TpJobseekerProfileState'

export type TpJobseekerProfile = {
  id: string
  firstName: string
  lastName: string
  contactEmail: string
  currentlyEnrolledInCourse: string

  profileAvatarImageS3Key: string

  desiredPositions?: string[]
  profileImage?: string
  phoneNumber?: string
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
  aboutYourself?: string
  topSkills?: string[]
  experience?: ExperienceRecord[]
  education?: EducationRecord[]
  projects?: ProjectRecord[]

  state: TpJobseekerProfileState

  createdAt: Date
  updatedAt: Date
  gaveGdprConsentAt: Date
}

interface LanguageRecord {
  language: Language
  proficiencyLevelId: string
}

export interface ExperienceRecord {
  uuid: string
  title?: string
  company?: string
  description?: string

  startDateMonth?: number
  startDateYear?: number
  endDateMonth?: number
  endDateYear?: number
  current?: boolean
}

export interface EducationRecord {
  uuid: string
  type?: string
  title?: string
  institutionName?: string
  description?: string
  certificationType?: string

  startDateMonth?: number
  startDateYear?: number
  endDateMonth?: number
  endDateYear?: number
  current?: boolean
}

interface ProjectRecord {
  title?: string
  description?: string
  link?: string
}
