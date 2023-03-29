import { Entity } from '../../base-interfaces-types-classes'
import { TpJobseekerProfileExperienceRecordEntityProps } from './tp-jobseeker-profile-experience-record.entityprops'

export class TpJobseekerProfileExperienceRecordEntity extends Entity<TpJobseekerProfileExperienceRecordEntityProps> {
  private constructor(props: TpJobseekerProfileExperienceRecordEntityProps) {
    super(props)
  }

  public static create(props: TpJobseekerProfileExperienceRecordEntityProps) {
    return new TpJobseekerProfileExperienceRecordEntity(props)
  }
}
