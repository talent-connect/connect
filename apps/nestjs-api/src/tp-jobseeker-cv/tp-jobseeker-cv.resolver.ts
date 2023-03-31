import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import {
  OkIdResponseMutationOutputDto,
  OkResponseMutationOutputDto,
  TpJobseekerCvEntityProps,
} from '@talent-connect/common-types'
import { CurrentUser } from '../auth/current-user.decorator'
import { CurrentUserInfo } from '../auth/current-user.interface'
import { GqlJwtAuthGuard } from '../auth/gql-jwt-auth.guard'
import { FindOneTpJobseekerCvArgs } from './args/find-one-tp-jobseeker-cv.args'
import { TpJobseekerCvCreateFromCurrentUserJobseekerProfileInput } from './dto/tp-jobseeker-cv-create-from-current-user-jobseeker-profile.entityinput'
import { TpJobseekerCvCreateInput } from './dto/tp-jobseeker-cv-create.entityinput'
import { TpJobseekerCvDeleteInput } from './dto/tp-jobseeker-cv-delete.entityinput'
import { TpJobseekerCvPatchInput } from './dto/tp-jobseeker-cv-patch.entityinput'
import { TpJobseekerCvReadService } from './tp-jobseeker-cv.read.service'
import { TpJobseekerCvWriteService } from './tp-jobseeker-cv.write.service'

@UseGuards(GqlJwtAuthGuard)
@Resolver(() => TpJobseekerCvEntityProps)
export class TpJobseekerCvResolver {
  constructor(
    private readonly writeService: TpJobseekerCvWriteService,
    private readonly readService: TpJobseekerCvReadService
  ) {}

  @Query(() => [TpJobseekerCvEntityProps], {
    name: 'tpJobseekerCvs',
  })
  async findAll(@CurrentUser() currentUser: CurrentUserInfo) {
    const filter = {
      Contact__c: currentUser.userId,
    }
    const entities = await this.readService.findAll(filter)
    const props = entities.map((entity) => entity.props)
    return props
  }

  // //! TODO: Add auth
  @Query(() => TpJobseekerCvEntityProps, {
    name: 'tpJobseekerCv',
  })
  async findOne(@Args() args: FindOneTpJobseekerCvArgs) {
    const entity = await this.readService.findOne(args.id)
    const props = entity.props
    return props
  }

  //! TODO: Add auth
  @Mutation(() => OkIdResponseMutationOutputDto, {
    name: 'tpJobseekerCvCreate',
  })
  async create(
    @Args('tpJobseekerCvCreateInput')
    input: TpJobseekerCvCreateInput,
    @CurrentUser() currentUser: CurrentUserInfo
  ) {
    const result = await this.writeService.create(input, currentUser)
    return { ok: true, id: result.id }
  }

  //! TODO: Add auth
  @Mutation(() => OkIdResponseMutationOutputDto, {
    name: 'tpJobseekerCreateFromCurrentUserJobseekerProfile',
  })
  async createFromCurrentUserJobseekerProfile(
    @Args('input')
    input: TpJobseekerCvCreateFromCurrentUserJobseekerProfileInput,
    @CurrentUser() currentUser: CurrentUserInfo
  ) {
    const result =
      await this.writeService.createFromCurrentUserJobseekerProfile(
        input,
        currentUser
      )
    return { ok: true, id: result.id }
  }

  //! TODO: Add auth
  @Mutation(() => OkResponseMutationOutputDto, {
    name: 'tpJobseekerCvPatch',
  })
  async patch(
    @Args('tpJobseekerCvPatchInput') input: TpJobseekerCvPatchInput,
    @CurrentUser() currentUser: CurrentUserInfo
  ) {
    await this.writeService.patch(input, currentUser)
    return { ok: true }
  }

  //! TODO: Add auth
  @Mutation(() => OkResponseMutationOutputDto, {
    name: 'tpJobseekerCvDelete',
  })
  async delete(
    @Args('tpJobseekerCvDeleteInput')
    input: TpJobseekerCvDeleteInput
  ) {
    await this.writeService.delete(input)
    return { ok: true }
  }
}
