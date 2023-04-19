import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import {
  ConMentoringSessionEntityProps,
  CreateConMentoringSessionInput,
} from '@talent-connect/common-types'
import { CurrentUser } from '../auth/current-user.decorator'
import { CurrentUserInfo } from '../auth/current-user.interface'
import { GqlJwtAuthGuard } from '../auth/gql-jwt-auth.guard'
import { ConMentoringSessionsService } from './con-mentoring-sessions.service'

@UseGuards(GqlJwtAuthGuard)
@Resolver(() => ConMentoringSessionEntityProps)
export class ConMentoringSessionsResolver {
  constructor(
    private readonly conMentoringSessionsService: ConMentoringSessionsService
  ) {}

  @Mutation(() => ConMentoringSessionEntityProps, {
    name: 'createConMentoringSession',
  })
  async createConMentoringSession(
    @CurrentUser() currentUser: CurrentUserInfo,
    @Args('createConMentoringSessionInput')
    input: CreateConMentoringSessionInput
  ) {
    const result = await this.conMentoringSessionsService.create(
      input,
      currentUser
    )

    return {
      ok: true,
      id: result.id,
    }
  }
}
