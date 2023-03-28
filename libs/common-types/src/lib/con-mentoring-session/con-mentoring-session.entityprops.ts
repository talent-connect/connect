import { Field, ID, ObjectType } from '@nestjs/graphql'
import { EntityProps } from '../base-interfaces-types-classes'
import { MentoringSessionDuration } from './enums'

@ObjectType('ConMentoringSession')
export class ConMentoringSessionEntityProps implements EntityProps {
  @Field((type) => ID)
  id: string

  date: Date
  @Field((type) => MentoringSessionDuration)
  minuteDuration: MentoringSessionDuration

  @Field((type) => ID)
  mentorId: string
  @Field((type) => ID)
  menteeId: string

  createdAt: Date
  updatedAt: Date
}
