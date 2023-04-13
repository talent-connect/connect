import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import {
  OkResponseMutationOutputDto,
  TpJobseekerProfileLanguageRecordEntityProps,
} from '@talent-connect/common-types'
import { CurrentUser } from '../auth/current-user.decorator'
import { CurrentUserInfo } from '../auth/current-user.interface'
import { GqlJwtAuthGuard } from '../auth/gql-jwt-auth.guard'
import { TpJobseekerProfileLanguageRecordCreateInput } from './dtos/tp-jobseeker-profile-language-record-create.entityinput'
import { TpJobseekerProfileLanguageRecordDeleteInput } from './dtos/tp-jobseeker-profile-language-record-delete.entityinput'
import { TpJobseekerProfileLanguageRecordPatchInput } from './dtos/tp-jobseeker-profile-language-record-patch.entityinput'
import { TpJobseekerProfileLanguageRecordsService } from './tp-jobseeker-profile-language-records.service'

@UseGuards(GqlJwtAuthGuard)
@Resolver(() => TpJobseekerProfileLanguageRecordEntityProps)
export class TpJobseekerProfileLanguageRecordResolver {
  constructor(
    private readonly service: TpJobseekerProfileLanguageRecordsService
  ) {}

  @Query(() => [TpJobseekerProfileLanguageRecordEntityProps], {
    name: 'tpJobseekerProfileLanguageRecords',
  })
  async findAll(@CurrentUser() currentUser: CurrentUserInfo) {
    const entities = await this.service.findAll({
      hed__Contact__c: currentUser.userId,
    })
    const props = entities.map((entity) => entity.props)
    return props
  }

  //! TODO: Add auth
  @Mutation(() => OkResponseMutationOutputDto, {
    name: 'tpJobseekerProfileLanguageRecordCreate',
  })
  async create(
    @Args('tpJobseekerProfileLanguageRecordCreateInput')
    input: TpJobseekerProfileLanguageRecordCreateInput,
    @CurrentUser() currentUser: CurrentUserInfo
  ) {
    await this.service.create(input, currentUser)
    return { ok: true }
  }

  //! TODO: Add auth
  @Mutation(() => OkResponseMutationOutputDto, {
    name: 'tpJobseekerProfileLanguageRecordPatch',
  })
  async patch(
    @Args('tpJobseekerProfileLanguageRecordPatchInput')
    input: TpJobseekerProfileLanguageRecordPatchInput,
    @CurrentUser() currentUser: CurrentUserInfo
  ) {
    await this.service.patch(input, currentUser)
    return { ok: true }
  }

  //! TODO: Add auth
  @Mutation(() => OkResponseMutationOutputDto, {
    name: 'tpJobseekerProfileLanguageRecordDelete',
  })
  async delete(
    @Args('tpJobseekerProfileLanguageRecordDeleteInput')
    input: TpJobseekerProfileLanguageRecordDeleteInput,
    @CurrentUser() currentUser: CurrentUserInfo
  ) {
    await this.service.delete(input, currentUser)
    return { ok: true }
  }
}
