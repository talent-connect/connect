import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import {
  OkResponseMutationOutputDto,
  TpJobseekerCvEducationRecordEntityProps,
} from '@talent-connect/common-types'
import { CurrentUser } from '../auth/current-user.decorator'
import { CurrentUserInfo } from '../auth/current-user.interface'
import { GqlJwtAuthGuard } from '../auth/gql-jwt-auth.guard'
import { FindAllTpJobseekerCvEducationRecordsArgs } from './args/find-all-tp-jobseeker-cv-education-records.args'
import { TpJobseekerCvEducationRecordCreateInput } from './dtos/tp-jobseeker-cv-education-record-create.entityinput'
import { TpJobseekerCvEducationRecordDeleteInput } from './dtos/tp-jobseeker-cv-education-record-delete.entityinput'
import { TpJobseekerCvEducationRecordPatchInput } from './dtos/tp-jobseeker-cv-education-record-patch.entityinput'
import { TpJobseekerCvEducationRecordsService } from './tp-jobseeker-cv-education-records.service'

@UseGuards(GqlJwtAuthGuard)
@Resolver(() => TpJobseekerCvEducationRecordEntityProps)
export class TpJobseekerCvEducationRecordResolver {
  constructor(private readonly service: TpJobseekerCvEducationRecordsService) {}

  @Query(() => [TpJobseekerCvEducationRecordEntityProps], {
    name: 'tpJobseekerCvEducationRecords',
  })
  async findAll(
    @Args() args: FindAllTpJobseekerCvEducationRecordsArgs,
    @CurrentUser() currentUser: CurrentUserInfo
  ) {
    const entities = await this.service.findAll({
      Jobseeker_CV__c: args.tpJobseekerCvId,
      Jobseeker_CV_Contact__c: currentUser.userId,
    })
    const props = entities.map((entity) => entity.props)
    return props
  }

  //! TODO: Add auth
  @Mutation(() => OkResponseMutationOutputDto, {
    name: 'tpJobseekerCvEducationRecordCreate',
  })
  async create(
    @Args('tpJobseekerCvEducationRecordCreateInput')
    input: TpJobseekerCvEducationRecordCreateInput
  ) {
    await this.service.createFromInput(input)
    return { ok: true }
  }

  //! TODO: Add auth
  @Mutation(() => OkResponseMutationOutputDto, {
    name: 'tpJobseekerCvEducationRecordPatch',
  })
  async patch(
    @Args('tpJobseekerCvEducationRecordPatchInput')
    input: TpJobseekerCvEducationRecordPatchInput
  ) {
    await this.service.patch(input)
    return { ok: true }
  }

  //! TODO: Add auth
  @Mutation(() => OkResponseMutationOutputDto, {
    name: 'tpJobseekerCvEducationRecordDelete',
  })
  async delete(
    @Args('tpJobseekerCvEducationRecordDeleteInput')
    input: TpJobseekerCvEducationRecordDeleteInput
  ) {
    await this.service.delete(input)
    return { ok: true }
  }
}
