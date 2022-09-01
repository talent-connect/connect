import { Field, ID, ObjectType } from '@nestjs/graphql'
import { EntityProps } from '../base-interfaces-types-classes'
import {
  FederalState,
  JobseekerProfileStatus,
  TpAvailabilityOption,
  TpDesiredEmploymentType,
  TpDesiredPosition,
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
  birthDate?: Date
  linkedInProfileUrl?: string
  githubProfileUrl?: string
  slackUsername?: string
  telephoneNumber?: string

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
  isProfileVisibleToCompanies: boolean
  isHired: boolean
  @Field((type) => FederalState)
  federalState: FederalState
  willingToRelocate: boolean

  createdAt: Date
  updatedAt: Date

  // The next ones are computed fields in Salesforce
  age?: number
  fullName: string
}
