import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import {
  OkResponseMutationOutputDto,
  TpJobseekerCvLanguageRecordEntityProps,
} from '@talent-connect/common-types'
import { GqlJwtAuthGuard } from '../auth/gql-jwt-auth.guard'
import { FindAllTpJobseekerCvLanguageRecordsArgs } from '../tp-jobseeker-cv-experience-records/args/find-all-tp-jobseeker-cv-experience-records.args'
import { TpJobseekerCvLanguageRecordCreateInput } from './dtos/tp-jobseeker-cv-language-record-create.entityinput'
import { TpJobseekerCvLanguageRecordDeleteInput } from './dtos/tp-jobseeker-cv-language-record-delete.entityinput'
import { TpJobseekerCvLanguageRecordPatchInput } from './dtos/tp-jobseeker-cv-language-record-patch.entityinput'
import { TpJobseekerCvLanguageRecordsService } from './tp-jobseeker-cv-language-records.service'

@UseGuards(GqlJwtAuthGuard)
@Resolver(() => TpJobseekerCvLanguageRecordEntityProps)
export class TpJobseekerCvLanguageRecordResolver {
  constructor(private readonly service: TpJobseekerCvLanguageRecordsService) {}

  @Query(() => [TpJobseekerCvLanguageRecordEntityProps], {
    name: 'tpJobseekerCvLanguageRecords',
  })
  async findAll(@Args() args: FindAllTpJobseekerCvLanguageRecordsArgs) {
    const entities = await this.service.findAll({
      Jobseeker_CV__c: args.tpJobseekerCvId,
    })
    const props = entities.map((entity) => entity.props)
    return props
  }

  //! TODO: Add auth
  @Mutation(() => OkResponseMutationOutputDto, {
    name: 'tpJobseekerCvLanguageRecordCreate',
  })
  async create(
    @Args('tpJobseekerCvLanguageRecordCreateInput')
    input: TpJobseekerCvLanguageRecordCreateInput
  ) {
    await this.service.createFromInput(input)
    return { ok: true }
  }

  //! TODO: Add auth
  @Mutation(() => OkResponseMutationOutputDto, {
    name: 'tpJobseekerCvLanguageRecordPatch',
  })
  async patch(
    @Args('tpJobseekerCvLanguageRecordPatchInput')
    input: TpJobseekerCvLanguageRecordPatchInput
  ) {
    await this.service.patch(input)
    return { ok: true }
  }

  //! TODO: Add auth
  @Mutation(() => OkResponseMutationOutputDto, {
    name: 'tpJobseekerCvLanguageRecordDelete',
  })
  async delete(
    @Args('tpJobseekerCvLanguageRecordDeleteInput')
    input: TpJobseekerCvLanguageRecordDeleteInput
  ) {
    await this.service.delete(input)
    return { ok: true }
  }
}
