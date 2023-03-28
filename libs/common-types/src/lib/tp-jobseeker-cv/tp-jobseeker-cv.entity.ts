import { Entity } from '../base-interfaces-types-classes'
import { TpJobseekerCvEntityProps } from './tp-jobseeker-cv.entityprops'

export class TpJobseekerCvEntity extends Entity<TpJobseekerCvEntityProps> {
  private constructor(props: TpJobseekerCvEntityProps) {
    super(props)
  }

  public static create(props: TpJobseekerCvEntityProps) {
    return new TpJobseekerCvEntity(props)
  }
}
