import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import {} from '@talent-connect/common-types'
import { CurrentUser } from '../auth/current-user.decorator'
import { CurrentUserInfo } from '../auth/current-user.interface'
import { GqlJwtAuthGuard } from '../auth/gql-jwt-auth.guard'
import { TpCompanyRepresentativeRelationshipsService } from '../tp-company-profiles/tp-company-representative-relationships.service'
import {
  TpCompanyFavoritedJobseekerProfileCreateMutationInputDto,
  TpCompanyFavoritedJobseekerProfileCreateMutationOutputDto,
} from './dtos/tp-company-favorited-jobseeker-profile-create.mutation-dtos'
import {
  TpCompanyFavoritedJobseekerProfileDeleteMutationInputDto,
  TpCompanyFavoritedJobseekerProfileDeleteMutationOutputDto,
} from './dtos/tp-company-favorited-jobseeker-profile-delete.mutation-dtos'
import { TpCompanyFavoritedJobseekerProfileEntityProps } from './tp-company-favorited-jobseeker-profile.entityprops'
import { TpCompanyFavoritedJobseekerProfilesService } from './tp-company-favorited-jobseeker-profiles.service'

@UseGuards(GqlJwtAuthGuard)
@Resolver(() => TpCompanyFavoritedJobseekerProfileEntityProps)
export class TpCompanyFavoritedJobseekerProfilesResolver {
  constructor(
    private readonly tpCompanyRepresentativeRelationshipsService: TpCompanyRepresentativeRelationshipsService,
    private readonly service: TpCompanyFavoritedJobseekerProfilesService
  ) {}

  @Mutation(() => TpCompanyFavoritedJobseekerProfileCreateMutationOutputDto, {
    name: 'tpCompanyFavoritedJobseekerProfileCreate',
  })
  async createTpCompanyFavoritedJobseekerProfile(
    @CurrentUser() currentUser: CurrentUserInfo,
    @Args('input')
    input: TpCompanyFavoritedJobseekerProfileCreateMutationInputDto
  ) {
    await this.service.create(input, currentUser)

    return { ok: true }
  }

  @Mutation(() => TpCompanyFavoritedJobseekerProfileDeleteMutationOutputDto, {
    name: 'tpCompanyFavoritedJobseekerProfileDelete',
  })
  async deleteTpCompanyFavoritedJobseekerProfile(
    @CurrentUser() currentUser: CurrentUserInfo,
    @Args('input')
    input: TpCompanyFavoritedJobseekerProfileDeleteMutationInputDto
  ) {
    await this.service.delete(input, currentUser)

    return { ok: true }
  }

  @Query(() => [TpCompanyFavoritedJobseekerProfileEntityProps], {
    name: 'tpCompanyFavoritedJobseekerProfiles',
  })
  async findAll(@CurrentUser() currentUser: CurrentUserInfo) {
    const currentUserTpCompanyRepresentativeRelationship =
      await this.tpCompanyRepresentativeRelationshipsService.findCompanyRepresentativeRelationshipByUser(
        currentUser.userId
      )

    const entities = await this.service.findAllByTpCompanyProfileId(
      currentUserTpCompanyRepresentativeRelationship.props.tpCompanyProfileId
    )
    const props = entities.map((entity) => entity.props)

    return props
  }
}
