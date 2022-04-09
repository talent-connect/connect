import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { ConProfilesService } from './con-profiles.service'
import { ConProfile } from './entities/con-profile.entity'
import { CreateConProfileInput } from './dto/create-con-profile.input'
import { UpdateConProfileInput } from './dto/update-con-profile.input'

@Resolver(() => ConProfile)
export class ConProfilesResolver {
  constructor(private readonly conProfilesService: ConProfilesService) {}

  @Mutation(() => ConProfile)
  createConProfile(
    @Args('createConProfileInput') createConProfileInput: CreateConProfileInput
  ) {
    return this.conProfilesService.create(createConProfileInput)
  }

  @Query(() => [ConProfile], { name: 'conProfiles' })
  async findAll() {
    const data = await this.conProfilesService.findAll()
    return data
  }

  @Query(() => ConProfile, { name: 'conProfile' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.conProfilesService.findOne(id)
  }

  @Mutation(() => ConProfile)
  updateConProfile(
    @Args('updateConProfileInput') updateConProfileInput: UpdateConProfileInput
  ) {
    return this.conProfilesService.update(
      updateConProfileInput.id,
      updateConProfileInput
    )
  }

  @Mutation(() => ConProfile)
  removeConProfile(@Args('id', { type: () => Int }) id: number) {
    return this.conProfilesService.remove(id)
  }
}
