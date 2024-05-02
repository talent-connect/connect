import { ArgsType, Field, InputType } from '@nestjs/graphql'
import {
  FederalState,
  Language,
  TpDesiredPosition,
  TpEmploymentType,
  TpTechnicalSkill,
} from '@talent-connect/common-types'

@InputType('PaginationArgs')
export class PaginationArgs {
  @Field((type) => Number)
  page: number
  @Field((type) => Number)
  perPage: number
}

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
  joinsMunich24SummerJobFair?: boolean

  @Field((type) => PaginationArgs, { defaultValue: { page: 1, perPage: 50 } })
  pagination: PaginationArgs
}
