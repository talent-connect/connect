import { ArgsType, Field, ID } from '@nestjs/graphql'

@ArgsType()
export class FindOneTpCompanyProfileArgs {
  @Field((of) => ID)
  id?: string
}
