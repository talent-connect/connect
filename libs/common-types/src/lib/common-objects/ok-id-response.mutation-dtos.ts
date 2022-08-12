import { ObjectType } from '@nestjs/graphql'

@ObjectType('OkIdResponseMutationOutputDto')
export class OkIdResponseMutationOutputDto {
  ok: boolean
  id: string
}
