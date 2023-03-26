import { ArgsType, Field, ID, InputType } from '@nestjs/graphql'

@ArgsType()
export class FindOneTpJobListingArgs {
  filter: FindOneTpJobListingArgsFilter
}

@InputType('FindOneTpJobListingArgsFilter')
class FindOneTpJobListingArgsFilter {
  @Field((of) => ID)
  id: string
}
