import { ArgsType, Field, ID } from '@nestjs/graphql'

@ArgsType()
export class FindOneConProfileArgs {
  @Field((of) => ID)
  loopbackUserId?: string

  @Field((of) => ID)
  id?: string
}
