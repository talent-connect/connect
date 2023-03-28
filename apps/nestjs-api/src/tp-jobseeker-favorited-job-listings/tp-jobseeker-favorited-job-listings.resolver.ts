import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import {} from '@talent-connect/common-types'
import { CurrentUser } from '../auth/current-user.decorator'
import { CurrentUserInfo } from '../auth/current-user.interface'
import { GqlJwtAuthGuard } from '../auth/gql-jwt-auth.guard'
import { TpJobseekerProfileService } from '../tp-jobseeker-profile/tp-jobseeker-profile.service'
import {
  TpJobseekerFavoritedJobListingCreateMutationInputDto,
  TpJobseekerFavoritedJobListingCreateMutationOutputDto,
} from './dtos/tp-jobseeker-favorited-job-listing-create.mutation-dtos'
import {
  TpJobseekerFavoritedJobListingDeleteMutationInputDto,
  TpJobseekerFavoritedJobListingDeleteMutationOutputDto,
} from './dtos/tp-jobseeker-favorited-job-listing-delete.mutation-dtos'
import { TpJobseekerFavoritedJobListingEntityProps } from './tp-jobseeker-favorited-job-listing.entityprops'
import { TpJobseekerFavoritedJobListingsService } from './tp-jobseeker-favorited-job-listings.service'

type NewType = TpJobseekerFavoritedJobListingsService

@UseGuards(GqlJwtAuthGuard)
@Resolver(() => TpJobseekerFavoritedJobListingEntityProps)
export class TpJobseekerFavoritedJobListingsResolver {
  constructor(
    private readonly tpJobseekerProfilesService: TpJobseekerProfileService,
    private readonly service: TpJobseekerFavoritedJobListingsService
  ) {}

  @Mutation(() => TpJobseekerFavoritedJobListingCreateMutationOutputDto, {
    name: 'tpJobseekerFavoritedJobListingCreate',
  })
  async createTpJobseekerFavoritedJobListing(
    @CurrentUser() currentUser: CurrentUserInfo,
    @Args('input')
    input: TpJobseekerFavoritedJobListingCreateMutationInputDto
  ) {
    await this.service.create(input, currentUser)

    return { ok: true }
  }

  @Mutation(() => TpJobseekerFavoritedJobListingDeleteMutationOutputDto, {
    name: 'tpJobseekerFavoritedJobListingDelete',
  })
  async deleteTpJobseekerFavoritedJobListing(
    @CurrentUser() currentUser: CurrentUserInfo,
    @Args('input')
    input: TpJobseekerFavoritedJobListingDeleteMutationInputDto
  ) {
    await this.service.delete(input, currentUser)

    return { ok: true }
  }

  @Query(() => [TpJobseekerFavoritedJobListingEntityProps], {
    name: 'tpJobseekerFavoritedJobListings',
  })
  async findAll(@CurrentUser() currentUser: CurrentUserInfo) {
    const currentUserMenteeProfile =
      await this.tpJobseekerProfilesService.findOneByUserId(currentUser.userId)
    const menteeId = currentUserMenteeProfile.props.id
    const entities = await this.service.findAllByTpJobseekerProfileId(menteeId)
    const props = entities.map((entity) => entity.props)

    return props
  }
}
