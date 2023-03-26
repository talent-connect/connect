import { Field, ID, ObjectType } from '@nestjs/graphql'
import { EntityProps } from '@talent-connect/common-types'

@ObjectType('ConMenteeFavoritedMentor')
export class ConMenteeFavoritedMentorEntityProps implements EntityProps {
  @Field((type) => ID)
  id: string //* DONE

  @Field((type) => ID)
  mentorId: string
  @Field((type) => ID)
  menteeId: string

  createdAt: Date
  updatedAt: Date
}
