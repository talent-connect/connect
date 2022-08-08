import { ArgsType, Field, InputType } from '@nestjs/graphql'
import {
  ConnectProfileLanguage,
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
  @Field((type) => [ConnectProfileLanguage])
  languages?: ConnectProfileLanguage
  @Field((type) => [RediLocation])
  locations?: RediLocation[]
}
