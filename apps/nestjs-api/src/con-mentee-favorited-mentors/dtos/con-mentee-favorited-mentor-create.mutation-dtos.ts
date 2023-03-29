import { InputType, ObjectType } from '@nestjs/graphql'

@InputType('ConMenteeFavoritedMentorCreateMutationInputDto')
export class ConMenteeFavoritedMentorCreateMutationInputDto {
  mentorId: string
}

@ObjectType('ConMenteeFavoritedMentorCreateMutationOutputDto')
export class ConMenteeFavoritedMentorCreateMutationOutputDto {
  ok: boolean
}
