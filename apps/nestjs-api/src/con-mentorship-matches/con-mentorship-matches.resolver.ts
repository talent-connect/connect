import { UseGuards } from '@nestjs/common'
import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import {
  ConMentorshipMatchEntityProps,
  ConProfileEntityProps,
} from '@talent-connect/common-types'
import { GqlJwtAuthGuard } from '../auth/gql-jwt-auth.guard'
import { ConProfilesService } from '../con-profiles/con-profiles.service'
import { ConMentorshipMatchesService } from './con-mentorship-matches.service'

@UseGuards(GqlJwtAuthGuard)
@Resolver(() => ConMentorshipMatchEntityProps)
export class ConMentorshipMatchesResolver {
  constructor(
    private readonly conMentorshipMatchesService: ConMentorshipMatchesService,
    private readonly conProfilesService: ConProfilesService
  ) {}

  // @Mutation(() => ConMentorshipMatch)
  // createConMentorshipMatch(
  //   @Args('createConMentorshipMatchInput')
  //   createConMentorshipMatchInput: CreateConMentorshipMatchInput
  // ) {
  //   return this.conMentorshipMatchesService.create(
  //     createConMentorshipMatchInput
  //   )
  // }

  //! TODO: Add auth
  @Query(() => [ConMentorshipMatchEntityProps], {
    name: 'conMentorshipMatches',
  })
  async findAll() {
    const entities = await this.conMentorshipMatchesService.findAll()
    const props = entities.map((entity) => entity.props)
    return props
  }

  // @Query(() => ConMentorshipMatch, { name: 'conMentorshipMatch' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.conMentorshipMatchesService.findOne(id)
  // }

  // @Mutation(() => ConMentorshipMatch)
  // updateConMentorshipMatch(
  //   @Args('updateConMentorshipMatchInput')
  //   updateConMentorshipMatchInput: UpdateConMentorshipMatchInput
  // ) {
  //   return this.conMentorshipMatchesService.update(
  //     updateConMentorshipMatchInput.id,
  //     updateConMentorshipMatchInput
  //   )
  // }

  // @Mutation(() => ConMentorshipMatch)
  // removeConMentorshipMatch(@Args('id', { type: () => Int }) id: number) {
  //   return this.conMentorshipMatchesService.remove(id)
  // }

  //! TODO: Add auth
  @ResolveField((of) => ConProfileEntityProps)
  async mentee(
    @Parent() conMentorshipMatch: ConMentorshipMatchEntityProps
  ): Promise<ConProfileEntityProps> {
    const { menteeId } = conMentorshipMatch
    const conProfiles = await this.conProfilesService.findAll({
      'Contact__r.Id': menteeId,
    })
    const conProfile = conProfiles[0]

    return conProfile.props
  }
}
