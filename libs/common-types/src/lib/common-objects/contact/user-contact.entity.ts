import { Entity } from '../../base-interfaces-types-classes'
import { UserContactEntityProps } from './user-contact.entityprops'

export class UserContactEntity extends Entity<UserContactEntityProps> {
  props: UserContactEntityProps

  private constructor(props: UserContactEntityProps) {
    super(props)
  }

  public static create(props: UserContactEntityProps) {
    return new UserContactEntity(props)
  }
}
