import { NotFoundException } from '@nestjs/common'
import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import {
  ConMentoringSessionEntityProps,
  ConProfileEntity,
  ConProfileEntityProps,
  UpdateConProfileInput,
} from '@talent-connect/common-types'
import { ConMentoringSessionsService } from '../con-mentoring-sessions/con-mentoring-sessions.service'
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

  @Query(() => ConProfileEntityProps, { name: 'conProfileByLoopbackUserId' })
  async findOneByLoopbackUserId(
    @Args('loopbackUserId') loopbackUserId: string
  ) {
    const entity = await this.conProfilesService.findOneByLoopbackUserId(
      loopbackUserId
    )
    return entity.props
  }

  // @Query(() => ConProfileEntity, { name: 'conProfile' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.conProfilesService.findOne(id)
  // }

  @Mutation(() => ConProfileEntityProps)
  updateConProfile(
    @Args('updateConProfileInput') updateConProfileInput: UpdateConProfileInput
  ) {
    return this.conProfilesService.update(updateConProfileInput)
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
