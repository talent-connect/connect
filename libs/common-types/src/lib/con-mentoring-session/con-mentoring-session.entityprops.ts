import { Field, ID, ObjectType } from '@nestjs/graphql'
import { EntityProps } from '../base-interfaces-types-classes'
import { MentoringSessionDuration } from './enums'

@ObjectType('ConMentoringSession')
export class ConMentoringSessionEntityProps implements EntityProps {
  @Field((type) => ID)
  id: string //* DONE

  date: Date
  @Field((type) => MentoringSessionDuration)
  minuteDuration: MentoringSessionDuration

  createdAt: Date
  updatedAt: Date
}
