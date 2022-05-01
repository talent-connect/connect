import { EntityProps } from './entity-props.interface'
import { Entity } from './entity.abstractclass'
import { PersistenceProps } from './record-props.interface'
import { Persistence } from './record.abstractclass'

export abstract class Mapper<
  SpecificEntity extends Entity<EntityProps>,
  SpecificPersistence extends Persistence<PersistenceProps>
> {
  public abstract fromPersistence(source: SpecificPersistence): SpecificEntity
  // public abstract toPersistence(source: SpecificEntity): SpecificPersistence
}
