import { Injectable } from '@nestjs/common'
import { Mapper } from '../../../../base-interfaces-types-classes'
import { Language, LanguageProficiencyLevel } from '../../../../common-objects'
import { TpJobseekerProfileLanguageRecordEntityProps } from '../../../common-objects'
import { TpJobseekerProfileLanguageRecordEntity } from '../../../common-objects/tp-jobseeker-profile-language-record.entity'
import { TpContactLanguageRecord } from './tp-contact-language.record'
import { TpContactLanguageRecordProps } from './tp-contact-language.recordprops'

@Injectable()
export class TpJobseekerProfileLanguageRecordMapper
  implements
    Mapper<TpJobseekerProfileLanguageRecordEntity, TpContactLanguageRecord>
{
  fromPersistence(
    raw: TpContactLanguageRecord
  ): TpJobseekerProfileLanguageRecordEntity {
    const props = new TpJobseekerProfileLanguageRecordEntityProps()

    props.id = raw.props.Id

    props.userId = raw.props.hed__Contact__c
    props.language = raw.props.hed__Language__r.Slug__c as Language
    props.proficiencyLevelId = raw.props
      .hed__Fluency__c as LanguageProficiencyLevel

    const entity = TpJobseekerProfileLanguageRecordEntity.create(props)

    return entity
  }

  public toPersistence(
    source: TpJobseekerProfileLanguageRecordEntity
  ): TpContactLanguageRecord {
    const props = new TpContactLanguageRecordProps()

    props.Id = source.props.id

    props.hed__Contact__c = source.props.userId
    props.hed__Language__r = { Slug__c: source.props.language }
    props.hed__Fluency__c = source.props.proficiencyLevelId

    const record = TpContactLanguageRecord.create(props)

    return record
  }
}
