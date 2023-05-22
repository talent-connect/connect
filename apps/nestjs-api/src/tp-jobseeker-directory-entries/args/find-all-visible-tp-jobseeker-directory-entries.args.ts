import { ArgsType, Field, InputType } from '@nestjs/graphql'
import {
  FederalState,
  Language,
  TpDesiredPosition,
  TpEmploymentType,
  TpTechnicalSkill,
} from '@talent-connect/common-types'

@ArgsType()
export class FindAllVisibleTpJobseekerDirectoryEntriesArgs {
  filter: FindAllVisibleTpJobseekerDirectoryEntriesFilter
}

@InputType('FindAllVisibleTpJobseekerDirectoryEntriesFilter')
class FindAllVisibleTpJobseekerDirectoryEntriesFilter {
  name?: string
  @Field((type) => [Language])
  desiredLanguages?: Language[]
  @Field((type) => [TpDesiredPosition])
  desiredPositions?: TpDesiredPosition[]
  @Field((type) => [TpEmploymentType])
  employmentTypes?: TpEmploymentType[]
  @Field((type) => [TpTechnicalSkill])
  skills?: TpTechnicalSkill[]
  @Field((type) => [FederalState])
  federalStates?: FederalState[]
  isJobFair2022Participant?: boolean
  isJobFair2023Participant?: boolean
  joinsBerlin23SummerJobFair?: boolean
  joinsMunich23SummerJobFair?: boolean
}
