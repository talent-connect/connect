import { Field, ID, ObjectType } from '@nestjs/graphql'
import { EntityProps } from '../../base-interfaces-types-classes'
import {
  FederalState,
  TpDesiredPosition,
  TpEmploymentType,
  TpTechnicalSkill,
} from '../../common-objects'
import { JobseekerProfileStatus, TpAvailabilityOption } from '../enums'

@ObjectType('TpJobseekerProfile')
export class TpJobseekerProfileEntityProps implements EntityProps {
  @Field((type) => ID)
  id: string

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

  createdAt: Date
  updatedAt: Date
}
