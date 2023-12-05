import { ArgsType, Field, InputType } from '@nestjs/graphql'
import {
  FederalState,
  TpDesiredPosition,
  TpEmploymentType,
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

  @Field((type) => [TpEmploymentType])
  employmentTypes?: TpEmploymentType[]

  @Field((type) => [FederalState])
  federalStates?: FederalState[]

  isRemotePossible?: boolean
  joinsDusseldorf24WinterJobFair?: boolean
  joinsMunich24SummerJobFair?: boolean
}
