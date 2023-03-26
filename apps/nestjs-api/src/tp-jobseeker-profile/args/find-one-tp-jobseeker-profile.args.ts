import { ArgsType, Field, ID } from '@nestjs/graphql'

@ArgsType()
export class FindOneTpJobseekerProfileArgs {
  @Field((of) => ID)
  id?: string
}
