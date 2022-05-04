import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { OkResponseMutationOutputDto } from '@talent-connect/common-types'
import { GqlJwtAuthGuard } from '../auth/gql-jwt-auth.guard'
import { ConProblemReportService } from './con-problem-report.service'
import { CreateConProblemReportInput } from './dto/create-con-problem-report.entityinput'
import { ConProblemReport } from './entities/con-problem-report.entity'

@UseGuards(GqlJwtAuthGuard)
@Resolver(() => ConProblemReport)
export class ConProblemReportResolver {
  constructor(
    private readonly conProblemReportService: ConProblemReportService
  ) {}

  @Mutation(() => OkResponseMutationOutputDto, {
    name: 'conProblemReportCreate',
  })
  async createConProblemReport(
    @Args('input')
    createConProblemReportInput: CreateConProblemReportInput
  ) {
    await this.conProblemReportService.create(createConProblemReportInput)

    return { ok: true }
  }
}
