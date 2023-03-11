import { UseGuards } from '@nestjs/common'
import { Args, Query, Resolver } from '@nestjs/graphql'
import { TpJobseekerDirectoryEntryEntityProps } from '@talent-connect/common-types'
import { GqlJwtAuthGuard } from '../auth/gql-jwt-auth.guard'
import { FindAllVisibleTpJobseekerDirectoryEntriesArgs } from './args/find-all-visible-tp-jobseeker-directory-entries.args'
import { TpJobseekerDirectoryEntriesService } from './tp-jobseeker-directory-entries.service'

@UseGuards(GqlJwtAuthGuard)
@Resolver(() => TpJobseekerDirectoryEntryEntityProps)
export class TpJobseekerDirectoryEntriesResolver {
  constructor(private readonly service: TpJobseekerDirectoryEntriesService) {}

  // //! TODO: Add auth
  @Query(() => [TpJobseekerDirectoryEntryEntityProps], {
    name: 'tpJobseekerDirectoryEntries',
  })
  async findAllVisible(
    @Args() args: FindAllVisibleTpJobseekerDirectoryEntriesArgs
  ) {
    const entities = await this.service.findAllVisibleJobseekers(args)
    const props = entities.map((entity) => entity.props)
    return props
  }

  // //! TODO: Add auth
  //? THIS CALLS .findOne that looks up by contactId, not jobseekerprofileId. Fix that.
  // @Query(() => [TpJobseekerDirectoryEntryEntityProps], {
  //   name: 'tpJobseekerProfile',
  // })
  // async findOne(@Args('id') id: string) {
  //   const entity = await this.service.findOne(id)
  //   return entity.props
  // }
}
