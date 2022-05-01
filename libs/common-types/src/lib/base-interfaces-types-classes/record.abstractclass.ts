import { PersistenceProps as IPersistenceProps } from './record-props.interface'

export abstract class Persistence<PersistenceProps extends IPersistenceProps> {
  props: PersistenceProps

  protected constructor(props: PersistenceProps) {
    this.props = props
  }
}
