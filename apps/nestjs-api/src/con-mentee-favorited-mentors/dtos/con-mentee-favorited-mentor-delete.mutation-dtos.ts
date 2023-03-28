import { InputType, ObjectType } from '@nestjs/graphql'

@InputType('ConMenteeFavoritedMentorDeleteMutationInputDto')
export class ConMenteeFavoritedMentorDeleteMutationInputDto {
  mentorId: string
}

@ObjectType('ConMenteeFavoritedMentorDeleteMutationOutputDto')
export class ConMenteeFavoritedMentorDeleteMutationOutputDto {
  ok: boolean
}
