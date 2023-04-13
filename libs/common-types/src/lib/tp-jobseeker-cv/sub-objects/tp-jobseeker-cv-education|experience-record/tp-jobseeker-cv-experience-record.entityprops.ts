import { Field, ID, Int, ObjectType } from '@nestjs/graphql'

@ObjectType('TpJobseekerCvExperienceRecord')
export class TpJobseekerCvExperienceRecordEntityProps {
  @Field((type) => ID)
  id: string
  @Field((type) => Int)
  sortIndex: number
  @Field((type) => ID)
  tpJobseekerCvId: string

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

  userId: string

  createdAt: Date
  updatedAt: Date
}
