import { Entity } from '../../base-interfaces-types-classes'
import { ContactEntityProps } from './contact.entityprops'

export class ContactEntity extends Entity<ContactEntityProps> {
  props: ContactEntityProps

  private constructor(props: ContactEntityProps) {
    super(props)
  }

  public static create(props: ContactEntityProps) {
    return new ContactEntity(props)
  }
}
