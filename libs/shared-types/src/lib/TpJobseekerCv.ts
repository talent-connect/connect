import { Timestamp } from './Timestamp';
import { EducationRecord } from './tp-jobSeeker-profile-cv-shared-interfaces/EducationRecord'
import { ExperienceRecord } from './tp-jobSeeker-profile-cv-shared-interfaces/ExperienceRecord'
import { LanguageRecord } from './tp-jobSeeker-profile-cv-shared-interfaces/LanguageRecord'
import { ProjectRecord } from './tp-jobSeeker-profile-cv-shared-interfaces/ProjectRecord'

export type TpJobSeekerCv =
  & Timestamp
  & {
  id: string
  cvName: string

  firstName: string
  lastName: string
  contactEmail: string

  genderPronouns?: string // TODO use GenderKey?

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

  // TODO: this was added here to make <JobSeekerFormSectionOverview>
  // work in both CV Builder and Profile builder. Refactor that component
  // (probably needs to be split up) so that we can remove this property
  currentlyEnrolledInCourse?: string
}
