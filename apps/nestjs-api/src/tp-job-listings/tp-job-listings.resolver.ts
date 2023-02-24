import { UseGuards } from '@nestjs/common'
import { Args, Query, Resolver } from '@nestjs/graphql'
import { TpJobseekerProfileEntityProps } from '@talent-connect/common-types'
import { GqlJwtAuthGuard } from '../auth/gql-jwt-auth.guard'
import { FindAllVisibleTpJobListingsArgs } from './args/find-all-visible-tp-jobseeker-profiles.args'
import { TpJobListingsService } from './tp-job-listings.service'

@UseGuards(GqlJwtAuthGuard)
@Resolver(() => TpJobseekerProfileEntityProps)
export class TpJobListingsResolver {
  constructor(private readonly service: TpJobListingsService) {}

  // //! TODO: Add auth
  @Query(() => [TpJobseekerProfileEntityProps], {
    name: 'tpJobListings',
  })
  async findAllVisible(@Args() args: FindAllVisibleTpJobListingsArgs) {
    const entities = await this.service.findAllVisibleJobseekers(args)
    const props = entities.map((entity) => entity.props)
    return props
  }

  // //! TODO: Add auth
  //? THIS CALLS .findOne that looks up by contactId, not jobseekerprofileId. Fix that.
  // @Query(() => [TpJobseekerProfileEntityProps], {
  //   name: 'tpJobseekerProfile',
  // })
  // async findOne(@Args('id') id: string) {
  //   const entity = await this.service.findOne(id)
  //   return entity.props
  // }
}
