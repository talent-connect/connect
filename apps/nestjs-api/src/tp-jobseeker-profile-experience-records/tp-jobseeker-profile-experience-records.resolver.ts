import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import {
  OkResponseMutationOutputDto,
  TpJobseekerProfileExperienceRecordEntityProps,
} from '@talent-connect/common-types'
import { CurrentUser } from '../auth/current-user.decorator'
import { CurrentUserInfo } from '../auth/current-user.interface'
import { GqlJwtAuthGuard } from '../auth/gql-jwt-auth.guard'
import { TpJobseekerProfileExperienceRecordCreateInput } from './dtos/tp-jobseeker-profile-experience-record-create.entityinput'
import { TpJobseekerProfileExperienceRecordDeleteInput } from './dtos/tp-jobseeker-profile-experience-record-delete.entityinput'
import { TpJobseekerProfileExperienceRecordPatchInput } from './dtos/tp-jobseeker-profile-experience-record-patch.entityinput'
import { TpJobseekerProfileExperienceRecordsService } from './tp-jobseeker-profile-experience-records.service'

@UseGuards(GqlJwtAuthGuard)
@Resolver(() => TpJobseekerProfileExperienceRecordEntityProps)
export class TpJobseekerProfileExperienceRecordResolver {
  constructor(
    private readonly service: TpJobseekerProfileExperienceRecordsService
  ) {}

  @Query(() => [TpJobseekerProfileExperienceRecordEntityProps], {
    name: 'tpJobseekerProfileExperienceRecords',
  })
  async findAll(@CurrentUser() currentUser: CurrentUserInfo) {
    const entities = await this.service.findAll({
      Contact__c: currentUser.userId,
    })
    const props = entities.map((entity) => entity.props)
    return props
  }

  //! TODO: Add auth
  @Mutation(() => OkResponseMutationOutputDto, {
    name: 'tpJobseekerProfileExperienceRecordCreate',
  })
  async create(
    @Args('tpJobseekerProfileExperienceRecordCreateInput')
    input: TpJobseekerProfileExperienceRecordCreateInput,
    @CurrentUser() currentUser: CurrentUserInfo
  ) {
    await this.service.create(input, currentUser)
    return { ok: true }
  }

  //! TODO: Add auth
  @Mutation(() => OkResponseMutationOutputDto, {
    name: 'tpJobseekerProfileExperienceRecordPatch',
  })
  async patch(
    @Args('tpJobseekerProfileExperienceRecordPatchInput')
    input: TpJobseekerProfileExperienceRecordPatchInput,
    @CurrentUser() currentUser: CurrentUserInfo
  ) {
    await this.service.patch(input, currentUser)
    return { ok: true }
  }

  //! TODO: Add auth
  @Mutation(() => OkResponseMutationOutputDto, {
    name: 'tpJobseekerProfileExperienceRecordDelete',
  })
  async delete(
    @Args('tpJobseekerProfileExperienceRecordDeleteInput')
    input: TpJobseekerProfileExperienceRecordDeleteInput,
    @CurrentUser() currentUser: CurrentUserInfo
  ) {
    await this.service.delete(input, currentUser)
    return { ok: true }
  }
}
