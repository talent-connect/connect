import { ArgsType, Field, InputType } from '@nestjs/graphql'
import {
  FederalState,
  TpDesiredEmploymentType,
  TpDesiredPosition,
  TpTechnicalSkill,
} from '@talent-connect/common-types'

@ArgsType()
export class FindAllVisibleTpJobListingsArgs {
  filter: FindAllVisibleTpJobListingsArgsFilter
}

@InputType('FindAllVisibleTpJobListingsArgsFilter')
class FindAllVisibleTpJobListingsArgsFilter {
  @Field((type) => [TpDesiredPosition])
  relatesToPositions?: TpDesiredPosition[]

  @Field((type) => [TpTechnicalSkill])
  skills?: TpTechnicalSkill[]

  @Field((type) => [TpDesiredEmploymentType])
  employmentTypes?: TpDesiredEmploymentType[]

  @Field((type) => [FederalState])
  federalStates?: FederalState[]

  isRemotePossible?: boolean
}
