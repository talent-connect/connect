import { Entity } from '../base-interfaces-types-classes'
import { ConMentoringSessionEntityProps } from './con-mentoring-session.entityprops'

export class ConMentoringSessionEntity extends Entity<ConMentoringSessionEntityProps> {
  private constructor(props: ConMentoringSessionEntityProps) {
    super(props)
  }

  public static create(props: ConMentoringSessionEntityProps) {
    return new ConMentoringSessionEntity(props)
  }
}
