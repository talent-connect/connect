import { Entity } from '../base-interfaces-types-classes'
import { ConProfileSimpleEntityProps } from './con-profile-simple.entityprops'

export class ConProfileEntity extends Entity<ConProfileSimpleEntityProps> {
  props: ConProfileSimpleEntityProps

  private constructor(props: ConProfileSimpleEntityProps) {
    super(props)
  }

  public static create(props: ConProfileSimpleEntityProps) {
    return new ConProfileEntity(props)
  }
}
