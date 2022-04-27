import { BadRequestException } from '@nestjs/common'
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
  ConProfileEntityProps,
  Entity,
  PatchConProfileInput,
} from '@talent-connect/common-types'
import { ConMentoringSessionsService } from '../con-mentoring-sessions/con-mentoring-sessions.service'
import { FindOneConProfileArgs } from './args/find-one-con-profile.args'
import { ConProfilesService } from './con-profiles.service'

@Resolver(() => ConProfileEntityProps)
export class ConProfilesResolver {
  constructor(
    private readonly conProfilesService: ConProfilesService,
    private readonly conMentoringSessionsService: ConMentoringSessionsService
  ) {}

  // @Mutation(() => ConProfileEntity)
  // createConProfile(
  //   @Args('createConProfileInput') createConProfileInput: CreateConProfileInput
  // ) {
  //   return this.conProfilesService.create(createConProfileInput)
  // }

  @Query(() => [ConProfileEntityProps], { name: 'conProfiles' })
  async findAll() {
    const entities = await this.conProfilesService.findAll({})
    const props = entities.map((entity) => entity.props)
    return props
  }

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

  // @Query(() => ConProfileEntity, { name: 'conProfile' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.conProfilesService.findOne(id)
  // }

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

  @ResolveField((of) => [ConMentoringSessionEntityProps])
  async mentoringSessions(
    @Parent() conProfile: ConProfileEntityProps
  ): Promise<ConMentoringSessionEntityProps[]> {
    const { _contactId } = conProfile
    const mentoringSessions = await this.conMentoringSessionsService.findAll({
      $or: [{ Mentee__c: _contactId }, { Mentor__c: _contactId }],
    })
    const props = mentoringSessions.map((entity) => entity.props)

    return props
  }
}
