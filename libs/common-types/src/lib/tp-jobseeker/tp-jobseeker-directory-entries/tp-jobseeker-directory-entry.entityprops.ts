import { Field, ID, ObjectType } from '@nestjs/graphql'
import { EntityProps } from '../../base-interfaces-types-classes'
import {
  FederalState,
  TpDesiredPosition,
  TpEmploymentType,
  TpTechnicalSkill,
} from '../../common-objects'
import { TpJobseekerProfileEducationRecordEntityProps } from '../common-objects/tp-jobseeker-profile-education-record.entityprops'
import { TpJobseekerProfileExperienceRecordEntityProps } from '../common-objects/tp-jobseeker-profile-experience-record.entityprops'
import { TpJobseekerProfileLanguageRecordEntityProps } from '../common-objects/tp-jobseeker-profile-language-record.entityprops'
import { JobseekerProfileStatus, TpAvailabilityOption } from '../enums'

@ObjectType('TpJobseekerDirectoryEntry')
export class TpJobseekerDirectoryEntryEntityProps implements EntityProps {
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
  @Field((type) => [TpEmploymentType])
  desiredEmploymentType?: Array<TpEmploymentType>
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

  @Field((type) => [TpJobseekerProfileExperienceRecordEntityProps])
  experience?: Array<TpJobseekerProfileExperienceRecordEntityProps>
  @Field((type) => [TpJobseekerProfileEducationRecordEntityProps])
  education?: Array<TpJobseekerProfileEducationRecordEntityProps>

  @Field((type) => [TpJobseekerProfileLanguageRecordEntityProps])
  workingLanguages?: Array<TpJobseekerProfileLanguageRecordEntityProps>

  createdAt: Date
  updatedAt: Date

  // The next ones are computed fields in Salesforce
  fullName: string
}
