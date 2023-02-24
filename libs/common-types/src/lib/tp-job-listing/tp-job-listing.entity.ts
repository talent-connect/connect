import { Entity } from '../base-interfaces-types-classes'
import { TpJobListingEntityProps } from './tp-job-listing.entityprops'

export class TpJobListingEntity extends Entity<TpJobListingEntityProps> {
  private constructor(props: TpJobListingEntityProps) {
    super(props)
  }

  public static create(props: TpJobListingEntityProps) {
    return new TpJobListingEntity(props)
  }
}
