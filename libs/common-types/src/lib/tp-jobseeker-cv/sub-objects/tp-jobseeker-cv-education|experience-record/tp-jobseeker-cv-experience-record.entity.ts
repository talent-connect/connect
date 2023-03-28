import { Entity } from '../../../base-interfaces-types-classes'
import { TpJobseekerCvExperienceRecordEntityProps } from './tp-jobseeker-cv-experience-record.entityprops'

export class TpJobseekerCvExperienceRecordEntity extends Entity<TpJobseekerCvExperienceRecordEntityProps> {
  private constructor(props: TpJobseekerCvExperienceRecordEntityProps) {
    super(props)
  }

  public static create(props: TpJobseekerCvExperienceRecordEntityProps) {
    return new TpJobseekerCvExperienceRecordEntity(props)
  }
}
