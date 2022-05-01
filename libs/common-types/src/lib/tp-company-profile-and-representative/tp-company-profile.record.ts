import { Entity } from '../base-interfaces-types-classes'
import { TpCompanyProfileEntityProps } from './tp-company-profile.recordprops'

export class TpCompanyProfileEntity extends Entity<TpCompanyProfileEntityProps> {
  props: TpCompanyProfileEntityProps

  private constructor(props: TpCompanyProfileEntityProps) {
    super(props)
  }

  public static create(props: TpCompanyProfileEntityProps) {
    return new TpCompanyProfileEntity(props)
  }
}
