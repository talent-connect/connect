import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import {
  OkResponseMutationOutputDto,
  UserContactEntityProps,
} from '@talent-connect/common-types'
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
  async patch(@Args('userContactPatchInput') input: UserContactPatchInput) {
    await this.service.patch(input)
    return { ok: true }
  }
}
