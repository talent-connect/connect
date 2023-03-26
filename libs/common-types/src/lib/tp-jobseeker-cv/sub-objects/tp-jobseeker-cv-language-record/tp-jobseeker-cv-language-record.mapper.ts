import { Injectable } from '@nestjs/common'
import { Mapper } from '../../../base-interfaces-types-classes'
import { Language, LanguageProficiencyLevel } from '../../../common-objects'
import { TpJobseekerCvLanguageRecordEntity } from './tp-jobseeker-cv-language-record.entity'
import { TpJobseekerCvLanguageRecordEntityProps } from './tp-jobseeker-cv-language-record.entityprops'
import { TpJobseekerCvLanguageRecord } from './tp-jobseeker-cv-language.record'
import { TpJobseekerCvLanguageRecordProps } from './tp-jobseeker-cv-language.recordprops'

@Injectable()
export class TpJobseekerCvLanguageRecordMapper
  implements
    Mapper<TpJobseekerCvLanguageRecordEntity, TpJobseekerCvLanguageRecord>
{
  fromPersistence(
    raw: TpJobseekerCvLanguageRecord
  ): TpJobseekerCvLanguageRecordEntity {
    const props = new TpJobseekerCvLanguageRecordEntityProps()

    props.id = raw.props.Id

    props.tpJobseekerCvId = raw.props.Jobseeker_CV__c
    props.language = raw.props.Language__r.Slug__c as Language
    props.proficiencyLevelId = raw.props.Fluency__c as LanguageProficiencyLevel

    const entity = TpJobseekerCvLanguageRecordEntity.create(props)

    return entity
  }

  public toPersistence(
    source: TpJobseekerCvLanguageRecordEntity
  ): TpJobseekerCvLanguageRecord {
    const props = new TpJobseekerCvLanguageRecordProps()

    props.Id = source.props.id

    props.Jobseeker_CV__c = source.props.tpJobseekerCvId
    props.Language__r = { Slug__c: source.props.language }
    props.Fluency__c = source.props.proficiencyLevelId

    const record = TpJobseekerCvLanguageRecord.create(props)

    return record
  }
}
