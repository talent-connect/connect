import { Entity } from '../../base-interfaces-types-classes'
import { TpJobseekerProfileEntityProps } from './tp-jobseeker-profile.entityprops'

export class TpJobseekerProfileEntity extends Entity<TpJobseekerProfileEntityProps> {
  private constructor(props: TpJobseekerProfileEntityProps) {
    super(props)
  }

  public static create(props: TpJobseekerProfileEntityProps) {
    return new TpJobseekerProfileEntity(props)
  }
}
