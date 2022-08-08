import { Query, Resolver } from '@nestjs/graphql'
import { TpCurrentUserData } from './dto/find-current-user-data.dto'

@Resolver(() => TpCurrentUserData)
export class TpCurrentUserDataResolver {
  @Query(() => TpCurrentUserData, { name: 'tpCurrentUserDataGet' })
  async getCurrentUserData() {
    return new TpCurrentUserData()
  }
}
