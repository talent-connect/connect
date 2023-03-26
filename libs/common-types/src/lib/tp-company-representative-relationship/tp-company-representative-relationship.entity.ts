import { Entity } from '../base-interfaces-types-classes'
import { TpCompanyRepresentativeRelationshipEntityProps } from './tp-company-representative-relationship.entityprops'

export class TpCompanyRepresentativeRelationshipEntity extends Entity<TpCompanyRepresentativeRelationshipEntityProps> {
  private constructor(props: TpCompanyRepresentativeRelationshipEntityProps) {
    super(props)
  }

  public static create(props: TpCompanyRepresentativeRelationshipEntityProps) {
    return new TpCompanyRepresentativeRelationshipEntity(props)
  }
}
