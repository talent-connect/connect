import { LanguageKey } from '@talent-connect/shared-config'

export interface TpProfile {
  id: string
  desiredPositions?: string[]
  firstName?: string
  lastName?: string
  profileImage?: string
  email?: string
  phoneNumber?: string
  address?: string

  // Social
  personalWebsite?: string
  githubUrl?: string
  linkedInUrl?: string
  twitterUrl?: string
  behanceUrl?: string
  stackOverflowUrl?: string
  dribbbleUrl?: string

  workingLanguages?: LanguageKey[]
  yearsOfRelevantExperience?: string
  desiredEmploymentType?: string
  availability?: string
  aboutYourself?: string
  topSkills?: string[]
  experience?: ExperienceRecord[]
  education?: EducationRecord[]
  createdAt?: Date
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CVFormData extends Partial<TpProfile> {}

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

export interface DropdownOption {
  id: string
  label: string
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface DropdownOptions extends Array<DropdownOption> {}
