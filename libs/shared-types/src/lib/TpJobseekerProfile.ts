import { Language } from './Language'
import { TpJobseekerProfileState } from './TpJobseekerProfileState'

export type TpJobseekerProfile = {
  id: string
  firstName: string
  lastName: string
  contactEmail: string
  currentlyEnrolledInCourse: string

  desiredPositions?: string[]
  profileImage?: string
  phoneNumber?: string
  address?: string

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

interface ExperienceRecord {
  title?: string
  company?: string

  startDate?: Date
  endDate?: Date
  current?: boolean
  description?: string
}

interface EducationRecord {
  type?: string
  institutionName?: string
  startDate?: Date
  endDate?: Date
  current?: boolean
  description?: string
}

interface ProjectRecord {
  title?: string
  description?: string
  link?: string
}
