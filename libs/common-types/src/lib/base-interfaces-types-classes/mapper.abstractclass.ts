import { EntityProps } from './entity-props.interface'
import { Entity } from './entity.abstractclass'
import { RecordProps } from './record-props.interface'
import { Record } from './record.abstractclass'

export abstract class Mapper<
  SpecificEntity extends Entity<EntityProps>,
  SpecificRecord extends Record<RecordProps>
> {
  public abstract fromRecord(source: SpecificRecord): SpecificEntity
  // public abstract toRecord(source: SpecificEntity): SpecificRecord
}
