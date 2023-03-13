import { Field, ID, ObjectType } from '@nestjs/graphql'
import { TpEducationCertificationType } from '../enums'

@ObjectType('TpJobseekerProfileEducationRecord')
export class TpJobseekerProfileEducationRecordEntityProps {
  @Field((type) => ID)
  id: string
  uuid: string
  @Field((type) => ID)
  userId: string
  @Field((type) => ID)
  tpJobseekerProfileId: string

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

  createdAt: Date
  updatedAt: Date
}
