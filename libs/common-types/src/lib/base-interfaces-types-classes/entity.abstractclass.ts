import { EntityProps as IEntityProps } from './entity-props.interface'

export abstract class Entity<EntityProps extends IEntityProps> {
  props: EntityProps

  protected constructor(props: EntityProps) {
    this.props = props
  }
}
