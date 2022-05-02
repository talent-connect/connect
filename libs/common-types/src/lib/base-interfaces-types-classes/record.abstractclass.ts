import { RecordProps as IRecordProps } from './record-props.interface'

export abstract class Record<RecordProps extends IRecordProps> {
  props: RecordProps

  protected constructor(props: RecordProps) {
    this.props = props
  }
}
