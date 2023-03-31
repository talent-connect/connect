import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import {
  OkResponseMutationOutputDto,
  UserContactEntityProps,
} from '@talent-connect/common-types'
import { CurrentUser } from '../auth/current-user.decorator'
import { CurrentUserInfo } from '../auth/current-user.interface'
import { GqlJwtAuthGuard } from '../auth/gql-jwt-auth.guard'
import { UserContactPatchInput } from './dtos/user-contact-patch.entityinput'
import { UserContactService } from './user-contact.service'

@UseGuards(GqlJwtAuthGuard)
@Resolver(() => UserContactEntityProps)
export class UserContactResolver {
  constructor(private readonly service: UserContactService) {}

  @Mutation(() => OkResponseMutationOutputDto, {
    name: 'userContactPatch',
  })
  async patch(
    @Args('userContactPatchInput') input: UserContactPatchInput,
    @CurrentUser() currentUser: CurrentUserInfo
  ) {
    await this.service.patch(input, currentUser)
    return { ok: true }
  }
}
