import { UseGuards } from '@nestjs/common'
import { Args, Query, Resolver } from '@nestjs/graphql'
import { TpJobseekerDirectoryEntryEntityProps } from '@talent-connect/common-types'
import { GqlJwtAuthGuard } from '../auth/gql-jwt-auth.guard'
import { FindAllVisibleTpJobseekerDirectoryEntriesArgs } from './args/find-all-visible-tp-jobseeker-directory-entries.args'
import { FindOneVisibleTpJobseekerDirectoryEntryArgs } from './args/find-one-visible-tp-jobseeker-directory-entry.args'
import { TpJobseekerDirectoryEntriesService } from './tp-jobseeker-directory-entries.service'

@UseGuards(GqlJwtAuthGuard)
@Resolver(() => TpJobseekerDirectoryEntryEntityProps)
export class TpJobseekerDirectoryEntriesResolver {
  constructor(private readonly service: TpJobseekerDirectoryEntriesService) {}

  @Query(() => [TpJobseekerDirectoryEntryEntityProps], {
    name: 'tpJobseekerDirectoryEntriesVisible',
  })
  async findAllVisible(
    @Args() args: FindAllVisibleTpJobseekerDirectoryEntriesArgs
  ) {
    const entities = await this.service.findAllVisibleJobseekers(args)
    const sorted = entities.sort((a, b) => {
      if (a.props.updatedAt > b.props.updatedAt) return -1
      if (a.props.updatedAt < b.props.updatedAt) return 1
      return 0
    })
    const props = sorted.map((entity) => entity.props)
    return props
  }

  @Query(() => TpJobseekerDirectoryEntryEntityProps, {
    name: 'tpJobseekerDirectoryEntryVisible',
  })
  async findOne(@Args() args: FindOneVisibleTpJobseekerDirectoryEntryArgs) {
    const entity = await this.service.findOneVisibleJobseeker(args)
    const props = entity.props
    return props
  }
}
