import { Field, ID, ObjectType } from '@nestjs/graphql'
import { EntityProps } from '../base-interfaces-types-classes'
import {
  TpDesiredEmploymentType,
  TpDesiredPosition,
  TpTechnicalSkill,
} from '../common-objects'

@ObjectType('TpJobListing')
export class TpJobListingEntityProps implements EntityProps {
  @Field((type) => ID)
  id: string

  title?: string
  location?: string
  summary?: string
  @Field((type) => [TpTechnicalSkill])
  idealTechnicalSkills?: TpTechnicalSkill[]
  @Field((type) => [TpDesiredPosition])
  relatesToPositions?: TpDesiredPosition[]
  @Field((type) => TpDesiredEmploymentType)
  employmentType?: TpDesiredEmploymentType
  languageRequirements?: string
  salaryRange?: string
  isRemotePossible?: boolean

  createdAt: Date
  updatedAt: Date
}
