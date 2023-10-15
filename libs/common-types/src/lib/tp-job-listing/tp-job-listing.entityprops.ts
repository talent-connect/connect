import { Field, ID, ObjectType } from '@nestjs/graphql'
import { EntityProps } from '../base-interfaces-types-classes'
import {
  FederalState,
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
  @Field((type) => FederalState)
  federalState?: FederalState

  @Field((type) => ID)
  companyProfileId: string
  @Field((type) => ID)
  createdByCompanyRepresentative: string
  //  createdBy: any
  createdAt: Date
  updatedAt: Date

  // These are included from the Company Profile (SF: Account)
  companyName: string
  profileAvatarImageS3Key?: string

}
