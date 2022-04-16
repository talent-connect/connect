import { EntityProps } from './entity-props.interface'
import { Entity } from './entity.abstractclass'
import { PersistenceProps } from './persistence-props.interface'
import { Persistence } from './persistence.abstractclass'

export abstract class Mapper<
  SpecificEntity extends Entity<EntityProps>,
  SpecificPersistence extends Persistence<PersistenceProps>
> {
  public abstract fromPersistence(source: SpecificPersistence): SpecificEntity
}
