import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType('TpJobseekerProfileExperienceRecord')
export class TpJobseekerProfileExperienceRecordEntityProps {
  @Field((type) => ID)
  id: string
  uuid: string
  @Field((type) => ID)
  userId: string
  @Field((type) => ID)
  tpJobseekerProfileId: string

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

  createdAt: Date
  updatedAt: Date
}
