import { UnauthorizedException, UseGuards } from '@nestjs/common'
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import {
  ConMentoringSessionEntityProps,
  ConMentorshipMatchEntityProps,
  ConProfileEntityProps,
  OkResponseMutationOutputDto,
} from '@talent-connect/common-types'
import { CurrentUser } from '../auth/current-user.decorator'
import { CurrentUserInfo } from '../auth/current-user.interface'
import { GqlJwtAuthGuard } from '../auth/gql-jwt-auth.guard'
import { ConMentoringSessionsService } from '../con-mentoring-sessions/con-mentoring-sessions.service'
import { ConProfilesService } from '../con-profiles/con-profiles.service'
import { FindMentorshipMatchesArgs } from './args/find-mentorship-matches.args'
import { FindOneMentorshipMatchArgs } from './args/find-one-mentorship-match.args'
import { ConMentorshipMatchesService } from './con-mentorship-matches.service'
import {
  ConMentorshipMatchesAcceptMentorshipInputDto,
  ConMentorshipMatchesAcceptMentorshipOutputDto,
} from './dto/con-mentorship-matches-accept-mentorship.mutation-dtos'
import {
  ConMentorshipMatchesApplyForMentorshipInputDto,
  ConMentorshipMatchesApplyForMentorshipOutputDto,
} from './dto/con-mentorship-matches-apply-for-mentorship.mutation-dtos'
import {
  ConMentorshipMatchesCompleteMentorshipInputDto,
  ConMentorshipMatchesCompleteMentorshipOutputDto,
} from './dto/con-mentorship-matches-complete-mentorship.mutation-dtos'
import {
  ConMentorshipMatchesDeclineMentorshipInputDto,
  ConMentorshipMatchesDeclineMentorshipOutputDto,
} from './dto/con-mentorship-matches-decline-mentorship.mutation-dtos'

@UseGuards(GqlJwtAuthGuard)
@Resolver(() => ConMentorshipMatchEntityProps)
export class ConMentorshipMatchesResolver {
  constructor(
    private readonly conMentorshipMatchesService: ConMentorshipMatchesService,
    // @Inject(forwardRef(() => ConProfilesService))
    private readonly conProfilesService: ConProfilesService,
    private readonly conMentoringSessionsService: ConMentoringSessionsService
  ) {}

  @Query(() => [ConMentorshipMatchEntityProps], {
    name: 'conMentorshipMatches',
  })
  async findAll(
    @Args() args: FindMentorshipMatchesArgs,
    @CurrentUser() currentUser: CurrentUserInfo
  ) {
    const filter: any = {
      $or: [
        { 'Mentor__r.Loopback_User_ID__c': currentUser.loopbackUserId },
        { 'Mentee__r.Loopback_User_ID__c': currentUser.loopbackUserId },
      ],
    }
    if (args?.filter?.status) {
      filter.Status__c = args.filter.status
    }

    const entities = await this.conMentorshipMatchesService.findAll(filter)
    const props = entities.map((entity) => entity.props)
    return props
  }

  @Query(() => ConMentorshipMatchEntityProps, { name: 'conMentorshipMatch' })
  async findOne(
    @Args() args: FindOneMentorshipMatchArgs,
    @CurrentUser() currentUser: CurrentUserInfo
  ) {
    const filter: any = {
      $or: [
        { 'Mentor__r.Loopback_User_ID__c': currentUser.loopbackUserId },
        { 'Mentee__r.Loopback_User_ID__c': currentUser.loopbackUserId },
      ],
      Id: args.id,
    }
    const entity = await this.conMentorshipMatchesService.findOne(filter)
    return entity.props
  }

  @Mutation(() => OkResponseMutationOutputDto, {
    name: 'conMatchMarkMentorshipAcceptedNotificationDismissed',
  })
  async patch(
    @Args('conMentorshipMatchId', { type: () => String }) id: string,
    @CurrentUser() currentUser: CurrentUserInfo
  ) {
    const entity = await this.conMentorshipMatchesService.findOneById(id)
    if (entity.props.menteeId !== currentUser.userId) {
      throw new UnauthorizedException('You are not the mentee of this match')
    }

    await this.conMentorshipMatchesService.patch(id, {
      hasMenteeDismissedMentorshipApplicationAcceptedNotification: true,
    })
    return { ok: true }
  }

  // @Mutation(() => ConMentorshipMatch)
  // removeConMentorshipMatch(@Args('id', { type: () => Int }) id: number) {
  //   return this.conMentorshipMatchesService.remove(id)
  // }

  @ResolveField((of) => ConProfileEntityProps)
  async mentee(
    @Parent() conMentorshipMatch: ConMentorshipMatchEntityProps
  ): Promise<ConProfileEntityProps> {
    const { menteeId } = conMentorshipMatch
    const entities = await this.conProfilesService.findAll({
      'Contact__r.Id': menteeId,
    })
    const entity = entities[0]

    return entity.props
  }

  @ResolveField((of) => ConProfileEntityProps)
  async mentor(
    @Parent() conMentorshipMatch: ConMentorshipMatchEntityProps
  ): Promise<ConProfileEntityProps> {
    const { mentorId } = conMentorshipMatch
    const entities = await this.conProfilesService.findAll({
      'Contact__r.Id': mentorId,
    })
    const entity = entities[0]

    return entity.props
  }

  @ResolveField((of) => [ConMentoringSessionEntityProps])
  async mentoringSessions(
    @Parent() parent: ConMentorshipMatchEntityProps,
    @CurrentUser() currentUser: CurrentUserInfo
  ) {
    const filter = {
      $or: [
        { 'Mentor__r.Loopback_User_ID__c': currentUser.loopbackUserId },
        { 'Mentee__r.Loopback_User_ID__c': currentUser.loopbackUserId },
      ],
      Mentor__c: parent.mentorId,
      Mentee__c: parent.menteeId,
    }
    const entities = await this.conMentoringSessionsService.findAll(filter)
    return entities.map((entity) => entity.props)
  }

  @Mutation(() => ConMentorshipMatchesAcceptMentorshipOutputDto, {
    name: 'conMentorshipMatchesAcceptMentorship',
  })
  async acceptMentorship(
    @Args('input') input: ConMentorshipMatchesAcceptMentorshipInputDto,
    @CurrentUser() currentUser: CurrentUserInfo
  ) {
    const entity = await this.conMentorshipMatchesService.findOneById(
      input.mentorshipMatchId
    )
    if (entity.props.mentorId !== currentUser.userId) {
      throw new UnauthorizedException('You are not the mentor of this match')
    }

    const result = await this.conMentorshipMatchesService.acceptMentorship(
      input
    )

    return { ok: true, id: result.id }
  }

  @Mutation(() => ConMentorshipMatchesDeclineMentorshipOutputDto, {
    name: 'conMentorshipMatchesDeclineMentorship',
  })
  async declineMentorship(
    @Args('input') input: ConMentorshipMatchesDeclineMentorshipInputDto,
    @CurrentUser() currentUser: CurrentUserInfo
  ) {
    const entity = await this.conMentorshipMatchesService.findOneById(
      input.mentorshipMatchId
    )
    if (entity.props.mentorId !== currentUser.userId) {
      throw new UnauthorizedException('You are not the mentor of this match')
    }

    const result = await this.conMentorshipMatchesService.declineMentorship(
      input
    )

    return { ok: true, id: result.id }
  }

  @Mutation(() => ConMentorshipMatchesCompleteMentorshipOutputDto, {
    name: 'conMentorshipMatchesCompleteMentorship',
  })
  async completeMentorship(
    @Args('input') input: ConMentorshipMatchesCompleteMentorshipInputDto,
    @CurrentUser() currentUser: CurrentUserInfo
  ) {
    const entity = await this.conMentorshipMatchesService.findOneById(
      input.mentorshipMatchId
    )
    if (entity.props.mentorId !== currentUser.userId) {
      throw new UnauthorizedException('You are not the mentor of this match')
    }

    const result = await this.conMentorshipMatchesService.completeMentorship(
      input
    )

    return { ok: true, id: result.id }
  }

  @Mutation(() => ConMentorshipMatchesApplyForMentorshipOutputDto, {
    name: 'conMentorshipMatchesApplyForMentorship',
  })
  async applyForMentorship(
    @Args('input') input: ConMentorshipMatchesApplyForMentorshipInputDto,
    @CurrentUser() currentUser: CurrentUserInfo
  ) {
    const result = await this.conMentorshipMatchesService.applyForMentorship(
      currentUser.userId,
      input
    )

    return { ok: true, id: result.id }
  }
}
