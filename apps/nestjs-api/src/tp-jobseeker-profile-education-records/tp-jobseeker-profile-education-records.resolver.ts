import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import {
  OkResponseMutationOutputDto,
  TpJobseekerProfileEducationRecordEntityProps,
} from '@talent-connect/common-types'
import { CurrentUser } from '../auth/current-user.decorator'
import { CurrentUserInfo } from '../auth/current-user.interface'
import { GqlJwtAuthGuard } from '../auth/gql-jwt-auth.guard'
import { TpJobseekerProfileEducationRecordCreateInput } from './dtos/tp-jobseeker-profile-education-record-create.entityinput'
import { TpJobseekerProfileEducationRecordDeleteInput } from './dtos/tp-jobseeker-profile-education-record-delete.entityinput'
import { TpJobseekerProfileEducationRecordPatchInput } from './dtos/tp-jobseeker-profile-education-record-patch.entityinput'
import { TpJobseekerProfileEducationRecordsService } from './tp-jobseeker-profile-education-records.service'

@UseGuards(GqlJwtAuthGuard)
@Resolver(() => TpJobseekerProfileEducationRecordEntityProps)
export class TpJobseekerProfileEducationRecordResolver {
  constructor(
    private readonly service: TpJobseekerProfileEducationRecordsService
  ) {}

  @Query(() => [TpJobseekerProfileEducationRecordEntityProps], {
    name: 'tpJobseekerProfileEducationRecords',
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
    name: 'tpJobseekerProfileEducationRecordCreate',
  })
  async create(
    @Args('tpJobseekerProfileEducationRecordCreateInput')
    input: TpJobseekerProfileEducationRecordCreateInput,
    @CurrentUser() currentUser: CurrentUserInfo
  ) {
    await this.service.create(input, currentUser)
    return { ok: true }
  }

  //! TODO: Add auth
  @Mutation(() => OkResponseMutationOutputDto, {
    name: 'tpJobseekerProfileEducationRecordPatch',
  })
  async patch(
    @Args('tpJobseekerProfileEducationRecordPatchInput')
    input: TpJobseekerProfileEducationRecordPatchInput,
    @CurrentUser() currentUser: CurrentUserInfo
  ) {
    await this.service.patch(input, currentUser)
    return { ok: true }
  }

  //! TODO: Add auth
  @Mutation(() => OkResponseMutationOutputDto, {
    name: 'tpJobseekerProfileEducationRecordDelete',
  })
  async delete(
    @Args('tpJobseekerProfileEducationRecordDeleteInput')
    input: TpJobseekerProfileEducationRecordDeleteInput,
    @CurrentUser() currentUser: CurrentUserInfo
  ) {
    await this.service.delete(input, currentUser)
    return { ok: true }
  }
}
