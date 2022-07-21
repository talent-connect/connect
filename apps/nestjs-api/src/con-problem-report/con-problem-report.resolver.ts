import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { OkResponseMutationOutputDto } from '@talent-connect/common-types'
import { CurrentUser } from '../auth/current-user.decorator'
import { CurrentUserInfo } from '../auth/current-user.interface'
import { GqlJwtAuthGuard } from '../auth/gql-jwt-auth.guard'
import { ConProblemReportService } from './con-problem-report.service'
import { CreateConProblemReportInput } from './dto/create-con-problem-report.entityinput'

@UseGuards(GqlJwtAuthGuard)
@Resolver(() => CreateConProblemReportInput)
export class ConProblemReportResolver {
  constructor(
    private readonly conProblemReportService: ConProblemReportService
  ) {}

  @Mutation(() => OkResponseMutationOutputDto, {
    name: 'conProblemReportCreate',
  })
  async createConProblemReport(
    @Args('input')
    createConProblemReportInput: CreateConProblemReportInput,
    @CurrentUser() currentUser: CurrentUserInfo
  ) {
    await this.conProblemReportService.create(
      createConProblemReportInput,
      currentUser
    )

    return { ok: true }
  }
}
