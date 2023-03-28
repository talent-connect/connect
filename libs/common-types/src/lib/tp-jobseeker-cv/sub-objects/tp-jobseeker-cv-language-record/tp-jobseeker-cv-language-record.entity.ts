import { Entity } from '../../../base-interfaces-types-classes'
import { TpJobseekerCvLanguageRecordEntityProps } from './tp-jobseeker-cv-language-record.entityprops'

export class TpJobseekerCvLanguageRecordEntity extends Entity<TpJobseekerCvLanguageRecordEntityProps> {
  private constructor(props: TpJobseekerCvLanguageRecordEntityProps) {
    super(props)
  }

  public static create(props: TpJobseekerCvLanguageRecordEntityProps) {
    return new TpJobseekerCvLanguageRecordEntity(props)
  }
}
