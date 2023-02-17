import { Field, ID, ObjectType } from '@nestjs/graphql'
import { EntityProps } from '../base-interfaces-types-classes'
import { Language, LanguageProficiencyLevel } from '../common-objects'
import {
  FederalState,
  JobseekerProfileStatus,
  TpAvailabilityOption,
  TpDesiredEmploymentType,
  TpDesiredPosition,
  TpEducationCertificationType,
  TpTechnicalSkill,
} from './enums'

@ObjectType('TpJobseekerProfile')
export class TpJobseekerProfileEntityProps implements EntityProps {
  @Field((type) => ID)
  id: string

  userId: string
  email: string
  loopbackUserId: string
  firstName: string
  lastName: string

  personalWebsite?: string
  githubUrl?: string
  linkedInUrl?: string
  twitterUrl?: string
  behanceUrl?: string
  stackOverflowUrl?: string
  dribbbleUrl?: string

  postalMailingAddress?: string
  telephoneNumber?: string

  genderPronouns?: string

  location?: string

  rediLocation?: string
  currentlyEnrolledInCourse?: string
  profileAvatarImageS3Key?: string
  @Field((type) => [TpDesiredPosition])
  desiredPositions?: Array<TpDesiredPosition>
  @Field((type) => [TpDesiredEmploymentType])
  desiredEmploymentType?: Array<TpDesiredEmploymentType>
  @Field((type) => TpAvailabilityOption)
  availability?: TpAvailabilityOption
  ifAvailabilityIsDate_date?: Date
  aboutYourself?: string
  @Field((type) => [TpTechnicalSkill])
  topSkills?: Array<TpTechnicalSkill>
  @Field((type) => JobseekerProfileStatus)
  state: JobseekerProfileStatus
  isJobFair2022Participant: boolean
  isJobFair2023Participant: boolean
  isProfileVisibleToCompanies: boolean
  isHired: boolean
  @Field((type) => FederalState)
  federalState?: FederalState
  willingToRelocate: boolean

  @Field((type) => [ExperienceRecord])
  experience?: Array<ExperienceRecord>
  @Field((type) => [EducationRecord])
  education?: Array<EducationRecord>

  workingLanguages?: Array<LanguageRecord>

  createdAt: Date
  updatedAt: Date

  // The next ones are computed fields in Salesforce
  fullName: string
}

@ObjectType('ExperienceRecord')
export class ExperienceRecord {
  uuid: string
  city?: string
  title?: string
  country?: string
  company?: string
  description?: string
  startDateMonth?: number
  startDateYear?: number
  endDateMonth?: number
  endDateYear?: number
  current?: boolean
}

@ObjectType('EducationRecord')
export class EducationRecord {
  uuid: string
  institutionCity?: string
  title?: string
  institutionCountry?: string
  institutionName?: string
  description?: string
  @Field((type) => TpEducationCertificationType)
  certificationType?: string

  startDateMonth?: number
  startDateYear?: number
  endDateMonth?: number
  endDateYear?: number
  current?: boolean
}

@ObjectType('LanguageRecord')
export class LanguageRecord {
  @Field((type) => Language)
  language: Language

  @Field((type) => LanguageProficiencyLevel)
  proficiencyLevelId: LanguageProficiencyLevel
}
