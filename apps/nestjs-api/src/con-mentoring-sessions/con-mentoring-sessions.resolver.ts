import { UnauthorizedException, UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
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
    console.log('input', input)
    const insertedEntity = await this.conMentoringSessionsService.create(
      input,
      currentUser
    )

    return insertedEntity.props
  }

  //! TODO: Add auth
  @Query(() => [ConMentoringSessionEntityProps], {
    name: 'conMentoringSessions',
  })
  async findAll() {
    const entities = await this.conMentoringSessionsService.findAll()
    const props = entities.map((entity) => entity.props)
    return props
  }

  // @Query(() => ConMentoringSession, { name: 'conMentoringSession' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.conMentoringSessionsService.findOne(id)
  // }

  // @Mutation(() => ConMentoringSession)
  // updateConMentoringSession(
  //   @Args('updateConMentoringSessionInput')
  //   updateConMentoringSessionInput: UpdateConMentoringSessionInput
  // ) {
  //   return this.conMentoringSessionsService.update(
  //     updateConMentoringSessionInput.id,
  //     updateConMentoringSessionInput
  //   )
  // }

  // @Mutation(() => ConMentoringSession)
  // removeConMentoringSession(@Args('id', { type: () => Int }) id: number) {
  //   return this.conMentoringSessionsService.remove(id)
  // }
}
