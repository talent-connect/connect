import { UseGuards } from '@nestjs/common'
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
import {
  ConMentorshipMatchesMarkAsDismissedInputDto,
  ConMentorshipMatchesMarkAsDismissedOutputDto,
} from './dto/con-mentorship-matches-mark-as-dismissed.mutation-dtos'

@UseGuards(GqlJwtAuthGuard)
@Resolver(() => ConMentorshipMatchEntityProps)
export class ConMentorshipMatchesResolver {
  constructor(
    private readonly conMentorshipMatchesService: ConMentorshipMatchesService,
    // @Inject(forwardRef(() => ConProfilesService))
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
        { 'Mentor__r.Loopback_User_ID__c': user.loopbackUserId },
        { 'Mentee__r.Loopback_User_ID__c': user.loopbackUserId },
      ],
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
        { 'Mentor__r.Loopback_User_ID__c': user.loopbackUserId },
        { 'Mentee__r.Loopback_User_ID__c': user.loopbackUserId },
      ],
      Id: args.id,
    }
    const entity = await this.conMentorshipMatchesService.findOne(filter)
    return entity.props
  }

  //! TODO: Add auth
  @Mutation(() => OkResponseMutationOutputDto, {
    name: 'conMatchMarkMentorshipAcceptedNotificationDismissed',
  })
  async patch(
    @Args('conMentorshipMatchId', { type: () => String }) id: string
  ) {
    await this.conMentorshipMatchesService.patch(id, {
      hasMenteeDismissedMentorshipApplicationAcceptedNotification: true,
    })
    return { ok: true }
  }

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
    const entities = await this.conProfilesService.findAll({
      'Contact__r.Id': menteeId,
    })
    const entity = entities[0]

    return entity.props
  }

  //! TODO: Add auth
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
    @CurrentUser() user: CurrentUserInfo
  ) {
    const filter = {
      $or: [
        { 'Mentor__r.Loopback_User_ID__c': user.loopbackUserId },
        { 'Mentee__r.Loopback_User_ID__c': user.loopbackUserId },
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
    @Args('input') input: ConMentorshipMatchesAcceptMentorshipInputDto
  ) {
    const result = await this.conMentorshipMatchesService.acceptMentorship(
      input
    )

    return { ok: true, id: result.id }
  }

  @Mutation(() => ConMentorshipMatchesDeclineMentorshipOutputDto, {
    name: 'conMentorshipMatchesDeclineMentorship',
  })
  async declineMentorship(
    @Args('input') input: ConMentorshipMatchesDeclineMentorshipInputDto
  ) {
    const result = await this.conMentorshipMatchesService.declineMentorship(
      input
    )

    return { ok: true, id: result.id }
  }

  @Mutation(() => ConMentorshipMatchesCompleteMentorshipOutputDto, {
    name: 'conMentorshipMatchesCompleteMentorship',
  })
  async completeMentorship(
    @Args('input') input: ConMentorshipMatchesCompleteMentorshipInputDto
  ) {
    const result = await this.conMentorshipMatchesService.completeMentorship(
      input
    )

    return { ok: true, id: result.id }
  }

  @Mutation(() => ConMentorshipMatchesApplyForMentorshipOutputDto, {
    name: 'conMentorshipMatchesApplyForMentorship',
  })
  async applyForMentorship(
    @CurrentUser() user: CurrentUserInfo,
    @Args('input') input: ConMentorshipMatchesApplyForMentorshipInputDto
  ) {
    const result = await this.conMentorshipMatchesService.applyForMentorship(
      user.userId,
      input
    )

    return { ok: true, id: result.id }
  }

  @Mutation(() => ConMentorshipMatchesMarkAsDismissedOutputDto, {
    name: 'conMentorshipMatchesMarkAsDismissed',
  })
  async markAsDismissed(
    @CurrentUser() user: CurrentUserInfo,
    @Args('input') input: ConMentorshipMatchesMarkAsDismissedInputDto
  ) {
    const result = await this.conMentorshipMatchesService.markAsDismissed(input)

    return { ok: true, id: result.id }
  }
}
