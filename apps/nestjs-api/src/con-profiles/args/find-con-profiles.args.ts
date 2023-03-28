import { ArgsType, Field, InputType } from '@nestjs/graphql'
import {
  Language,
  MentoringTopic,
  RediLocation,
} from '@talent-connect/common-types'

@ArgsType()
export class FindConProfilesArgs {
  filter: FindConProfilesArgsFilter
}

@InputType('FindConProfilesArgsFilter')
class FindConProfilesArgsFilter {
  name?: string
  @Field((type) => [MentoringTopic])
  categories?: MentoringTopic[]
  @Field((type) => [Language])
  languages?: Language[]
  @Field((type) => [RediLocation])
  locations?: RediLocation[]
}
