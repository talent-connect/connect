import { BadRequestException, UseGuards } from '@nestjs/common'
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
  OkIdResponseMutationOutputDto,
} from '@talent-connect/common-types'
import { CurrentUser } from '../auth/current-user.decorator'
import { CurrentUserInfo } from '../auth/current-user.interface'
import { GqlJwtAuthGuard } from '../auth/gql-jwt-auth.guard'
import { ConMentoringSessionsService } from '../con-mentoring-sessions/con-mentoring-sessions.service'
import { ConMentorshipMatchesService } from '../con-mentorship-matches/con-mentorship-matches.service'
import { FindConProfilesArgs } from './args/find-con-profiles.args'
import { FindOneConProfileArgs } from './args/find-one-con-profile.args'
import { ConProfilesService } from './con-profiles.service'
import { ConProfileSignUpInput } from './dtos/con-profile-sign-up.entityinput'
import { PatchConProfileInput } from './dtos/patch-con-profile.entityinput'

@UseGuards(GqlJwtAuthGuard)
@Resolver(() => ConProfileEntityProps)
export class ConProfilesResolver {
  constructor(
    private readonly conProfilesService: ConProfilesService,
    private readonly conMentoringSessionsService: ConMentoringSessionsService,
    // @Inject(forwardRef(() => ConMentorshipMatchesService))
    private readonly conMentorshipMatchesService: ConMentorshipMatchesService
  ) {}

  @Mutation(() => OkIdResponseMutationOutputDto, { name: 'conProfileSignUp' })
  async createConProfile(
    @Args('input') createConProfileInput: ConProfileSignUpInput,
    @CurrentUser() currentUser: CurrentUserInfo
  ) {
    const id = await this.conProfilesService.signUp(
      createConProfileInput,
      currentUser
    )
    return { ok: true, id }
  }
  //
  //! TODO: Add auth
  @Query(() => [ConProfileEntityProps], { name: 'conProfilesAvailableMentors' })
  async findAllAvailableMentors(@Args() args: FindConProfilesArgs) {
    const entities = await this.conProfilesService.findAllAvailableMentors(args)
    const props = entities.map((entity) => entity.props)
    return props
  }

  //! TODO: Add auth
  @Query(() => ConProfileEntityProps, {
    name: 'conProfile',
  })
  async findOne(@Args() args: FindOneConProfileArgs) {
    if (args.id && args.loopbackUserId) {
      throw new BadRequestException(
        'You cannot pass both id and loopbackUserId'
      )
    }
    if (args.loopbackUserId) {
      const entity = await this.conProfilesService.findOneByLoopbackUserId(
        args.loopbackUserId
      )
      return entity.props
    }
    if (args.id) {
      const entity = await this.conProfilesService.findOneById(args.id)
      return entity.props
    }
    throw new BadRequestException('Must provide either loopbackUserId or id')
  }

  @Query(() => ConProfileEntityProps, {
    name: 'myConProfile',
  })
  async findCurrentUser(@CurrentUser() currentUser: CurrentUserInfo) {
    const entity = await this.conProfilesService.findOneByLoopbackUserId(
      currentUser.loopbackUserId
    )
    return entity.props
  }

  // @Query(() => ConProfileEntity, { name: 'conProfile' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.conProfilesService.findOne(id)
  // }

  //! TODO: Add auth
  @Mutation(() => ConProfileEntityProps, { name: 'patchConProfile' })
  async patch(
    @Args('patchConProfileInput') patchConProfileInput: PatchConProfileInput
  ) {
    const updatedEntity = await this.conProfilesService.update(
      patchConProfileInput
    )
    return updatedEntity.props
  }

  // @Mutation(() => ConProfileEntity)
  // removeConProfile(@Args('id', { type: () => Int }) id: number) {
  //   return this.conProfilesService.remove(id)
  // }

  //! TODO: Add auth
  @ResolveField((of) => [ConMentoringSessionEntityProps])
  async mentoringSessions(
    @Parent() conProfile: ConProfileEntityProps
  ): Promise<ConMentoringSessionEntityProps[]> {
    const { userId } = conProfile
    const mentoringSessions = await this.conMentoringSessionsService.findAll({
      $or: [{ Mentee__c: userId }, { Mentor__c: userId }],
    })
    const props = mentoringSessions.map((entity) => entity.props)

    return props
  }

  //! TODO: Add auth
  @ResolveField((of) => [ConMentorshipMatchEntityProps])
  async mentorshipMatches(
    @Parent() conProfile: ConProfileEntityProps
  ): Promise<ConMentorshipMatchEntityProps[]> {
    const { userId } = conProfile
    const mentorshipMatches = await this.conMentorshipMatchesService.findAll({
      $or: [{ Mentee__c: userId }, { Mentor__c: userId }],
    })
    const props = mentorshipMatches.map((entity) => entity.props)

    return props
  }
}
