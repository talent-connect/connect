import { Entity } from '../base-interfaces-types-classes'
import { ConMentorshipMatchEntityProps } from './con-mentorship-match.entityprops'

export class ConMentorshipMatchEntity extends Entity<ConMentorshipMatchEntityProps> {
  props: ConMentorshipMatchEntityProps

  private constructor(props: ConMentorshipMatchEntityProps) {
    super(props)
  }

  public static create(props: ConMentorshipMatchEntityProps) {
    return new ConMentorshipMatchEntity(props)
  }
}
