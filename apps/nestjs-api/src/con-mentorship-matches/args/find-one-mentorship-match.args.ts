import { ArgsType, Field, ID } from '@nestjs/graphql'

@ArgsType()
export class FindOneMentorshipMatchArgs {
  @Field((of) => ID!)
  id: string
}
