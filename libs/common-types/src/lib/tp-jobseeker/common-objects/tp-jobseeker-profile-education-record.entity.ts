import { Entity } from '../../base-interfaces-types-classes'
import { TpJobseekerProfileEducationRecordEntityProps } from './tp-jobseeker-profile-education-record.entityprops'

export class TpJobseekerProfileEducationRecordEntity extends Entity<TpJobseekerProfileEducationRecordEntityProps> {
  private constructor(props: TpJobseekerProfileEducationRecordEntityProps) {
    super(props)
  }

  public static create(props: TpJobseekerProfileEducationRecordEntityProps) {
    return new TpJobseekerProfileEducationRecordEntity(props)
  }
}
