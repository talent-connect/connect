import { Query, Resolver } from '@nestjs/graphql'
import { ConMentoringSessionEntityProps } from '@talent-connect/common-types'
import { ConMentoringSessionsService } from './con-mentoring-sessions.service'

@Resolver(() => ConMentoringSessionEntityProps)
export class ConMentoringSessionsResolver {
  constructor(
    private readonly conMentoringSessionsService: ConMentoringSessionsService
  ) {}

  // @Mutation(() => ConMentoringSession)
  // createConMentoringSession(
  //   @Args('createConMentoringSessionInput')
  //   createConMentoringSessionInput: CreateConMentoringSessionInput
  // ) {
  //   return this.conMentoringSessionsService.create(
  //     createConMentoringSessionInput
  //   )
  // }

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
