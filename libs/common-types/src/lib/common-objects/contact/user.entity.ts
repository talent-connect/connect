import { Entity } from '../../base-interfaces-types-classes'
import { UserEntityProps } from './user.entityprops'

export class UserEntity extends Entity<UserEntityProps> {
  props: UserEntityProps

  private constructor(props: UserEntityProps) {
    super(props)
  }

  public static create(props: UserEntityProps) {
    return new UserEntity(props)
  }
}
