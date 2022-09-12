import { NotImplementedException, UseGuards } from '@nestjs/common'
import { Args, Query, Resolver } from '@nestjs/graphql'
import { TpJobseekerProfileEntityProps } from '@talent-connect/common-types'
import { GqlJwtAuthGuard } from '../auth/gql-jwt-auth.guard'
import { FindAllVisibleTpJobseekerProfilesArgs } from './args/find-all-visible-tp-jobseeker-profiles.args'
import { TpJobseekerProfilesService } from './tp-jobseeker-profiles.service'

@UseGuards(GqlJwtAuthGuard)
@Resolver(() => TpJobseekerProfileEntityProps)
export class TpJobseekerProfilesResolver {
  constructor(private readonly service: TpJobseekerProfilesService) {}

  // //! TODO: Add auth
  @Query(() => [TpJobseekerProfileEntityProps], {
    name: 'tpJobseekerProfiles',
  })
  async findAllVisible(@Args() args: FindAllVisibleTpJobseekerProfilesArgs) {
    if (args.loadLanguages) {
      throw new NotImplementedException(
        'Querying all TpJobseekerProfiles with language loading is not supported yet due to the massive Salesforce querying it would entail. Only when querying single profiles.'
      )
    }
    const entities = await this.service.findAll()
    const props = entities.map((entity) => entity.props)
    return props
  }
}
