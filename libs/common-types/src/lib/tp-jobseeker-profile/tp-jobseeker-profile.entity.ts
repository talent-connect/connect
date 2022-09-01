import { TpJobseekerProfileEntityProps } from '.'
import { Entity } from '../base-interfaces-types-classes'

export class TpJobseekerProfileEntity extends Entity<TpJobseekerProfileEntityProps> {
  private constructor(props: TpJobseekerProfileEntityProps) {
    super(props)
  }

  public static create(props: TpJobseekerProfileEntityProps) {
    return new TpJobseekerProfileEntity(props)
  }
}
