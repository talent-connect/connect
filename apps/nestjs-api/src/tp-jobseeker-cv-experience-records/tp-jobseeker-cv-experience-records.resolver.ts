import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import {
  OkResponseMutationOutputDto,
  TpJobseekerCvExperienceRecordEntityProps,
} from '@talent-connect/common-types'
import { CurrentUser } from '../auth/current-user.decorator'
import { CurrentUserInfo } from '../auth/current-user.interface'
import { GqlJwtAuthGuard } from '../auth/gql-jwt-auth.guard'
import { FindAllTpJobseekerCvExperienceRecordsArgs } from '../tp-jobseeker-cv-language-records/args/find-all-tp-jobseeker-cv-language-records.args'
import { TpJobseekerCvExperienceRecordCreateInput } from './dtos/tp-jobseeker-cv-experience-record-create.entityinput'
import { TpJobseekerCvExperienceRecordDeleteInput } from './dtos/tp-jobseeker-cv-experience-record-delete.entityinput'
import { TpJobseekerCvExperienceRecordPatchInput } from './dtos/tp-jobseeker-cv-experience-record-patch.entityinput'
import { TpJobseekerCvExperienceRecordsService } from './tp-jobseeker-cv-experience-records.service'

@UseGuards(GqlJwtAuthGuard)
@Resolver(() => TpJobseekerCvExperienceRecordEntityProps)
export class TpJobseekerCvExperienceRecordResolver {
  constructor(
    private readonly service: TpJobseekerCvExperienceRecordsService
  ) {}

  @Query(() => [TpJobseekerCvExperienceRecordEntityProps], {
    name: 'tpJobseekerCvExperienceRecords',
  })
  async findAll(
    @Args() args: FindAllTpJobseekerCvExperienceRecordsArgs,
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
    name: 'tpJobseekerCvExperienceRecordCreate',
  })
  async create(
    @Args('tpJobseekerCvExperienceRecordCreateInput')
    input: TpJobseekerCvExperienceRecordCreateInput
  ) {
    await this.service.createFromInput(input)
    return { ok: true }
  }

  //! TODO: Add auth
  @Mutation(() => OkResponseMutationOutputDto, {
    name: 'tpJobseekerCvExperienceRecordPatch',
  })
  async patch(
    @Args('tpJobseekerCvExperienceRecordPatchInput')
    input: TpJobseekerCvExperienceRecordPatchInput
  ) {
    await this.service.patch(input)
    return { ok: true }
  }

  //! TODO: Add auth
  @Mutation(() => OkResponseMutationOutputDto, {
    name: 'tpJobseekerCvExperienceRecordDelete',
  })
  async delete(
    @Args('tpJobseekerCvExperienceRecordDeleteInput')
    input: TpJobseekerCvExperienceRecordDeleteInput
  ) {
    await this.service.delete(input)
    return { ok: true }
  }
}
