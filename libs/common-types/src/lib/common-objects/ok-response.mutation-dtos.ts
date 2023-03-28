import { ObjectType } from '@nestjs/graphql'

@ObjectType('OkResponseMutationOutputDto')
export class OkResponseMutationOutputDto {
  ok: boolean
}
