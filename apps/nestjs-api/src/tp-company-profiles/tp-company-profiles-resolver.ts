import { UseGuards } from '@nestjs/common'
import { Mutation, Query, Resolver } from '@nestjs/graphql'
import { TpCompanyProfileEntityProps } from '@talent-connect/common-types'
import { GqlJwtAuthGuard } from '../auth/gql-jwt-auth.guard'
import { TpCompanyProfilesService } from './tp-company-profiles.service'

@UseGuards(GqlJwtAuthGuard)
@Resolver(() => TpCompanyProfileEntityProps)
export class TpCompanyProfilesResolver {
  constructor(
    private readonly tpCompanyProfilesService: TpCompanyProfilesService
  ) {}

  @Mutation()
  
}
