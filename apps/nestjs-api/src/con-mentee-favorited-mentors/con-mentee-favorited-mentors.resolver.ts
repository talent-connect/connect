import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import {} from '@talent-connect/common-types'
import { CurrentUser } from '../auth/current-user.decorator'
import { CurrentUserInfo } from '../auth/current-user.interface'
import { GqlJwtAuthGuard } from '../auth/gql-jwt-auth.guard'
import { ConProfilesService } from '../con-profiles/con-profiles.service'
import { ConMenteeFavoritedMentorEntityProps } from './con-mentee-favorited-mentor.entityprops'
import { ConMenteeFavoritedMentorsService } from './con-mentee-favorited-mentors.service'
import {
  ConMenteeFavoritedMentorCreateMutationInputDto,
  ConMenteeFavoritedMentorCreateMutationOutputDto,
} from './dtos/con-mentee-favorited-mentor-create.mutation-dtos'
import {
  ConMenteeFavoritedMentorDeleteMutationInputDto,
  ConMenteeFavoritedMentorDeleteMutationOutputDto,
} from './dtos/con-mentee-favorited-mentor-delete.mutation-dtos'

@UseGuards(GqlJwtAuthGuard)
@Resolver(() => ConMenteeFavoritedMentorEntityProps)
export class ConMenteeFavoritedMentorsResolver {
  constructor(
    private readonly conProfilesService: ConProfilesService,
    private readonly conMenteeFavoritedMentorsService: ConMenteeFavoritedMentorsService
  ) {}

  @Mutation(() => ConMenteeFavoritedMentorCreateMutationOutputDto, {
    name: 'conMenteeFavoritedMentorCreate',
  })
  async createConMenteeFavoritedMentor(
    @CurrentUser() currentUser: CurrentUserInfo,
    @Args('input')
    input: ConMenteeFavoritedMentorCreateMutationInputDto
  ) {
    console.log('input', input)
    await this.conMenteeFavoritedMentorsService.create(input, currentUser)

    return { ok: true }
  }

  @Mutation(() => ConMenteeFavoritedMentorDeleteMutationOutputDto, {
    name: 'conMenteeFavoritedMentorDelete',
  })
  async deleteConMenteeFavoritedMentor(
    @CurrentUser() currentUser: CurrentUserInfo,
    @Args('input')
    input: ConMenteeFavoritedMentorDeleteMutationInputDto
  ) {
    await this.conMenteeFavoritedMentorsService.delete(input, currentUser)

    return { ok: true }
  }

  @Query(() => [ConMenteeFavoritedMentorEntityProps], {
    name: 'conMenteeFavoritedMentors',
  })
  async findAll(@CurrentUser() currentUser: CurrentUserInfo) {
    const currentUserMenteeProfile =
      await this.conProfilesService.findOneByLoopbackUserId(
        currentUser.loopbackUserId
      )
    const menteeId = currentUserMenteeProfile.props.id
    const entities =
      await this.conMenteeFavoritedMentorsService.findAllByMenteeId(menteeId)
    const props = entities.map((entity) => entity.props)

    return props
  }
}
