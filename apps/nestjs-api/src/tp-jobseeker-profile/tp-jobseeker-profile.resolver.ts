import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import {
  OkResponseMutationOutputDto,
  TpJobseekerProfileEntityProps,
} from '@talent-connect/common-types'
import { CurrentUser } from '../auth/current-user.decorator'
import { CurrentUserInfo } from '../auth/current-user.interface'
import { GqlJwtAuthGuard } from '../auth/gql-jwt-auth.guard'
import { FindOneTpJobseekerProfileArgs } from './args/find-one-tp-jobseeker-profile.args'
import { TpJobseekerProfilePatchInput } from './dto/tp-jobseeker-profile-patch.entityinput'
import { TpJobseekerProfileSignUpMutationDto } from './dto/tp-jobseeker-profile-sign-up.mutation-dtos'
import { TpJobseekerProfileService } from './tp-jobseeker-profile.service'

@UseGuards(GqlJwtAuthGuard)
@Resolver(() => TpJobseekerProfileEntityProps)
export class TpJobseekerProfileResolver {
  constructor(private readonly service: TpJobseekerProfileService) {}

  // //! TODO: Add auth
  @Query(() => TpJobseekerProfileEntityProps, {
    name: 'tpJobseekerProfile',
  })
  async findOne(@Args() args: FindOneTpJobseekerProfileArgs) {
    const entity = await this.service.findOne(args.id)
    const props = entity.props
    return props
  }

  @Mutation(() => OkResponseMutationOutputDto, {
    name: 'tpJobseekerProfileSignUp',
  })
  async createTpJobseekerProfile(
    @Args('input') createConProfileInput: TpJobseekerProfileSignUpMutationDto,
    @CurrentUser() currentUser: CurrentUserInfo
  ) {
    await this.service.signUp(createConProfileInput, currentUser)
    return { ok: true }
  }

  //! TODO: Add auth
  @Mutation(() => OkResponseMutationOutputDto, {
    name: 'tpJobseekerProfilePatch',
  })
  async patch(
    @Args('tpJobseekerProfilePatchInput') input: TpJobseekerProfilePatchInput,
    @CurrentUser() currentUser: CurrentUserInfo
  ) {
    await this.service.patch(input, currentUser)
    return { ok: true }
  }
}
