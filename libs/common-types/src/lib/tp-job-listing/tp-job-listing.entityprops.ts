import { Field, ID, ObjectType } from '@nestjs/graphql'
import { EntityProps } from '../base-interfaces-types-classes'
import {
  TpDesiredPosition,
  TpEmploymentType,
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
  @Field((type) => TpEmploymentType)
  employmentType?: TpEmploymentType
  languageRequirements?: string
  salaryRange?: string
  isRemotePossible?: boolean

  @Field((type) => ID)
  companyProfileId: string

  createdAt: Date
  updatedAt: Date
}
