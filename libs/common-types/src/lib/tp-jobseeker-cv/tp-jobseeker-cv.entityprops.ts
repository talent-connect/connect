import { Field, ID, ObjectType } from '@nestjs/graphql'
import { EntityProps } from '../base-interfaces-types-classes'
import { ImmigrationStatus } from '../common-objects'
import {
  TpDesiredPosition,
  TpEmploymentType,
  TpTechnicalSkill,
} from '../common-objects/contact'
import { TpAvailabilityOption } from '../tp-common-objects'

@ObjectType('TpJobseekerCv')
export class TpJobseekerCvEntityProps implements EntityProps {
  @Field((type) => ID)
  id: string

  aboutYourself?: string
  @Field((type) => TpAvailabilityOption)
  availability?: TpAvailabilityOption
  ifAvailabilityIsDate_date?: Date
  profileAvatarImageS3Key?: string
  behanceUrl?: string
  @Field((type) => ID)
  userId: string
  @Field((type) => [TpEmploymentType])
  desiredEmploymentType?: Array<TpEmploymentType>
  @Field((type) => [TpDesiredPosition])
  desiredPositions?: Array<TpDesiredPosition>
  dribbbleUrl?: string
  email?: string
  firstName?: string
  githubUrl?: string
  @Field((type) => ImmigrationStatus)
  immigrationStatus?: ImmigrationStatus
  cvName: string
  lastName?: string
  linkedInUrl?: string
  location?: string
  postalMailingAddress?: string
  telephoneNumber?: string
  stackOverflowUrl?: string
  @Field((type) => [TpTechnicalSkill])
  topSkills?: Array<TpTechnicalSkill>
  twitterUrl?: string
  personalWebsite?: string
  willingToRelocate: boolean

  createdAt: Date
  updatedAt: Date
}
