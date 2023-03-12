import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import {
  OkResponseMutationOutputDto,
  TpJobseekerProfileEntityProps,
} from '@talent-connect/common-types'
import { GqlJwtAuthGuard } from '../auth/gql-jwt-auth.guard'
import { FindOneTpJobseekerProfileArgs } from './args/find-one-tp-jobseeker-profile.args'
import { TpJobseekerProfilePatchInput } from './dto/tp-jobseeker-profile-patch.entityinput'
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

  //! TODO: Add auth
  @Mutation(() => OkResponseMutationOutputDto, {
    name: 'tpJobseekerProfilePatch',
  })
  async patch(
    @Args('tpJobseekerProfilePatchInput') input: TpJobseekerProfilePatchInput
  ) {
    await this.service.patch(input)
    return { ok: true }
  }
}
