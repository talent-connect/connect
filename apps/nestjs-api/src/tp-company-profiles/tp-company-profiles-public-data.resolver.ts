import { UseGuards } from '@nestjs/common'
import { Query, Resolver } from '@nestjs/graphql'
import { TpCompanyProfileEntityProps } from '@talent-connect/common-types'
import { GqlJwtAuthGuard } from '../auth/gql-jwt-auth.guard'
import { TpCompanyProfilesService } from './tp-company-profiles.service'

@Resolver(() => TpCompanyProfileEntityProps)
export class TpCompanyProfilesResolverPublicData {
  constructor(
    private readonly tpCompanyProfilesService: TpCompanyProfilesService
  ) {}

  @Query(() => [TpCompanyProfileEntityProps], { name: 'tpCompanyProfiles' })
  async findAll() {
    const entities = await this.tpCompanyProfilesService.findAll({})
    const props = entities.map((entity) => entity.props)
    return props
  }
}
