import { UseGuards } from '@nestjs/common'
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import {
  ConMentoringSessionEntityProps,
  ConMentorshipMatchEntityProps,
  ConProfileEntityProps,
} from '@talent-connect/common-types'
import { CurrentUser } from '../auth/current-user.decorator'
import { CurrentUserInfo } from '../auth/current-user.interface'
import { GqlJwtAuthGuard } from '../auth/gql-jwt-auth.guard'
import { ConMentoringSessionsService } from '../con-mentoring-sessions/con-mentoring-sessions.service'
import { ConProfilesService } from '../con-profiles/con-profiles.service'
import { FindMentorshipMatchesArgs } from './args/find-mentorship-matches.args'
import { FindOneMentorshipMatchArgs } from './args/find-one-mentorship-match.args'
import { ConMentorshipMatchesService } from './con-mentorship-matches.service'

@UseGuards(GqlJwtAuthGuard)
@Resolver(() => ConMentorshipMatchEntityProps)
export class ConMentorshipMatchesResolver {
  constructor(
    private readonly conMentorshipMatchesService: ConMentorshipMatchesService,
    private readonly conProfilesService: ConProfilesService,
    private readonly conMentoringSessionsService: ConMentoringSessionsService
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
  async findAll(
    @CurrentUser() user: CurrentUserInfo,
    @Args() args: FindMentorshipMatchesArgs
  ) {
    const filter: any = {
      $or: [
        { 'Mentor__r.Loopback_User_ID__c': user.userId },
        { 'Mentee__r.Loopback_User_ID__c': user.userId },
      ],
    }
    if (args.status) {
      filter.Status__c = args.status
    }
    const entities = await this.conMentorshipMatchesService.findAll(filter)
    const props = entities.map((entity) => entity.props)
    return props
  }

  @Query(() => ConMentorshipMatchEntityProps, { name: 'conMentorshipMatch' })
  async findOne(
    @CurrentUser() user: CurrentUserInfo,
    @Args() args: FindOneMentorshipMatchArgs
  ) {
    const filter: any = {
      $or: [
        { 'Mentor__r.Loopback_User_ID__c': user.userId },
        { 'Mentee__r.Loopback_User_ID__c': user.userId },
      ],
      Id: args.id,
    }
    const entity = await this.conMentorshipMatchesService.findOne(filter)
    return entity.props
  }

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

  //! TODO: Add auth
  @ResolveField((of) => ConProfileEntityProps)
  async mentor(
    @Parent() conMentorshipMatch: ConMentorshipMatchEntityProps
  ): Promise<ConProfileEntityProps> {
    const { mentorId } = conMentorshipMatch
    const conProfiles = await this.conProfilesService.findAll({
      'Contact__r.Id': mentorId,
    })
    const conProfile = conProfiles[0]

    return conProfile.props
  }

  @ResolveField((of) => [ConMentoringSessionEntityProps])
  async mentoringSessions(
    @Parent() parent: ConMentorshipMatchEntityProps,
    @CurrentUser() user: CurrentUserInfo
  ) {
    const filter = {
      $or: [
        { 'Mentor__r.Loopback_User_ID__c': user.userId },
        { 'Mentee__r.Loopback_User_ID__c': user.userId },
      ],
      Mentor__c: parent.mentorId,
      Mentee__c: parent.menteeId,
    }
    const entities = await this.conMentoringSessionsService.findAll(filter)
    return entities.map((entity) => entity.props)
  }
}
