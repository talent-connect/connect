import { Entity } from '../../base-interfaces-types-classes'
import { TpJobseekerProfileLanguageRecordEntityProps } from './tp-jobseeker-profile-language-record.entityprops'

export class TpJobseekerProfileLanguageRecordEntity extends Entity<TpJobseekerProfileLanguageRecordEntityProps> {
  private constructor(props: TpJobseekerProfileLanguageRecordEntityProps) {
    super(props)
  }

  public static create(props: TpJobseekerProfileLanguageRecordEntityProps) {
    return new TpJobseekerProfileLanguageRecordEntity(props)
  }
}
