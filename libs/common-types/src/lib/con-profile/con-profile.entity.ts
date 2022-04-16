import { Entity } from '../base-interfaces-types-classes'
import { ConProfileEntityProps } from './con-profile.entityprops'

export class ConProfileEntity extends Entity<ConProfileEntityProps> {
  props: ConProfileEntityProps

  private constructor(props: ConProfileEntityProps) {
    super(props)
  }

  public static create(props: ConProfileEntityProps) {
    return new ConProfileEntity(props)
  }
}
