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
} from '@talent-connect/common-types'
import { ConMentoringSessionsService } from '../con-mentoring-sessions/con-mentoring-sessions.service'
import { ConProfilesService } from './con-profiles.service'
import { CreateConProfileInput } from './dto/create-con-profile.input'
import { UpdateConProfileInput } from './dto/update-con-profile.input'

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

  // @Query(() => ConProfileEntity, { name: 'conProfile' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.conProfilesService.findOne(id)
  // }

  // @Mutation(() => ConProfileEntity)
  // updateConProfile(
  //   @Args('updateConProfileInput') updateConProfileInput: UpdateConProfileInput
  // ) {
  //   return this.conProfilesService.update(
  //     updateConProfileInput.id,
  //     updateConProfileInput
  //   )
  // }

  // @Mutation(() => ConProfileEntity)
  // removeConProfile(@Args('id', { type: () => Int }) id: number) {
  //   return this.conProfilesService.remove(id)
  // }

  // @ResolveField((of) => [ConMentoringSessionEntityProps])
  // async mentoringSessions(
  //   @Parent() conProfile: ConProfileEntityProps
  // ): Promise<ConMentoringSessionEntityProps[]> {
  //   const { _contactId } = conProfile
  //   const mentoringSessions = await this.conMentoringSessionsService.findAll({
  //     $or: [{ Mentee__c: _contactId }, { Mentor__c: _contactId }],
  //   })
  //   const props = mentoringSessions.map((entity) => entity.props)

  //   return props
  // }
}
