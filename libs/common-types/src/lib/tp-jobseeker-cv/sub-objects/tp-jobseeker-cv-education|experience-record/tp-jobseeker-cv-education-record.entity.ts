import { Entity } from '../../../base-interfaces-types-classes'
import { TpJobseekerCvEducationRecordEntityProps } from './tp-jobseeker-cv-education-record.entityprops'

export class TpJobseekerCvEducationRecordEntity extends Entity<TpJobseekerCvEducationRecordEntityProps> {
  private constructor(props: TpJobseekerCvEducationRecordEntityProps) {
    super(props)
  }

  public static create(props: TpJobseekerCvEducationRecordEntityProps) {
    return new TpJobseekerCvEducationRecordEntity(props)
  }
}
