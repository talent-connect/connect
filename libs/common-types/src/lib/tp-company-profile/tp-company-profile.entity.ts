import { Entity } from '../base-interfaces-types-classes'
import { TpCompanyProfileEntityProps } from './tp-company-profile.entityprops'

export class TpCompanyProfileEntity extends Entity<TpCompanyProfileEntityProps> {
  private constructor(props: TpCompanyProfileEntityProps) {
    super(props)
  }

  public static create(props: TpCompanyProfileEntityProps) {
    return new TpCompanyProfileEntity(props)
  }
}
