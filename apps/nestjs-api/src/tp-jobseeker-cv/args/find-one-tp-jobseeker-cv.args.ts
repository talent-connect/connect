import { ArgsType, Field, ID } from '@nestjs/graphql'

@ArgsType()
export class FindOneTpJobseekerCvArgs {
  @Field((of) => ID)
  id?: string
}
