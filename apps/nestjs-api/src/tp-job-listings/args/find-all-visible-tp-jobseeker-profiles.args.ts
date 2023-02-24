import { ArgsType, Field, InputType } from '@nestjs/graphql'
import {
  FederalState,
  Language,
  TpDesiredEmploymentType,
  TpDesiredPosition,
  TpTechnicalSkill,
} from '@talent-connect/common-types'

@ArgsType()
export class FindAllVisibleTpJobseekerProfilesArgs {
  filter: FindAllVisibleTpJobseekerProfilesArgsFilter
}

@InputType('FindAllVisibleTpJobseekerProfilesArgsFilter')
class FindAllVisibleTpJobseekerProfilesArgsFilter {
  name?: string
  @Field((type) => [Language])
  desiredLanguages?: Language[]
  @Field((type) => [TpDesiredPosition])
  desiredPositions?: TpDesiredPosition[]
  @Field((type) => [TpDesiredEmploymentType])
  employmentTypes?: TpDesiredEmploymentType[]
  @Field((type) => [TpTechnicalSkill])
  skills?: TpTechnicalSkill[]
  @Field((type) => [FederalState])
  federalStates?: FederalState[]
  isJobFair2022Participant?: boolean
  isJobFair2023Participant?: boolean
}
