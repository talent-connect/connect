import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import {
  ConProfileEntity,
  ConProfileEntityProps,
} from '@talent-connect/common-types'
import { ConProfilesService } from './con-profiles.service'
import { CreateConProfileInput } from './dto/create-con-profile.input'
import { UpdateConProfileInput } from './dto/update-con-profile.input'

@Resolver(() => ConProfileEntity)
export class ConProfilesResolver {
  constructor(private readonly conProfilesService: ConProfilesService) {}

  // @Mutation(() => ConProfileEntity)
  // createConProfile(
  //   @Args('createConProfileInput') createConProfileInput: CreateConProfileInput
  // ) {
  //   return this.conProfilesService.create(createConProfileInput)
  // }

  @Query(() => [ConProfileEntityProps], { name: 'conProfiles' })
  async findAll() {
    const entities = await this.conProfilesService.findAll()
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
}
