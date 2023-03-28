import { Injectable } from '@nestjs/common'
import { Mapper } from '../../../base-interfaces-types-classes'
import { TpJobseekerCvExperienceRecordEntity } from './tp-jobseeker-cv-experience-record.entity'
import { TpJobseekerCvExperienceRecordEntityProps } from './tp-jobseeker-cv-experience-record.entityprops'
import { TpJobseekerCvLineItemRecord } from './tp-jobseeker-cv-line-item.record'
import { TpJobseekerCvLineItemRecordProps } from './tp-jobseeker-cv-line-item.recordprops'

@Injectable()
export class TpJobseekerCvExperienceRecordMapper
  implements
    Mapper<TpJobseekerCvExperienceRecordEntity, TpJobseekerCvLineItemRecord>
{
  fromPersistence(
    raw: TpJobseekerCvLineItemRecord
  ): TpJobseekerCvExperienceRecordEntity {
    const props = new TpJobseekerCvExperienceRecordEntityProps()

    props.id = raw.props.Id

    props.sortIndex = raw.props.Frontend_View_Index__c
    props
    props.tpJobseekerCvId = raw.props.Jobseeker_CV__c
    props.title = raw.props.Title__c
    props.description = raw.props.Description__c
    props.startDateMonth = raw.props.Start_Date_Month__c
    props.startDateYear = raw.props.Start_Date_Year__c
    props.endDateMonth = raw.props.End_Date_Month__c
    props.endDateYear = raw.props.End_Date_Year__c
    props.current = raw.props.Current__c
    props.city = raw.props.City__c
    props.country = raw.props.Country__c
    props.company = raw.props.Company__c

    props.updatedAt = raw.props.LastModifiedDate
    props.createdAt = raw.props.CreatedDate

    const entity = TpJobseekerCvExperienceRecordEntity.create(props)

    return entity
  }

  public toPersistence(
    source: TpJobseekerCvExperienceRecordEntity
  ): TpJobseekerCvLineItemRecord {
    const props = new TpJobseekerCvLineItemRecordProps()

    props.Id = source.props.id

    props.RecordType = {
      DeveloperName: 'Experience',
    }

    props.Frontend_View_Index__c = source.props.sortIndex
    props.Jobseeker_CV__c = source.props.tpJobseekerCvId
    props.Title__c = source.props.title
    props.Description__c = source.props.description
    props.Start_Date_Month__c = source.props.startDateMonth
    props.Start_Date_Year__c = source.props.startDateYear
    props.End_Date_Month__c = source.props.endDateMonth
    props.End_Date_Year__c = source.props.endDateYear
    props.Current__c = Boolean(source.props.current)
    props.City__c = source.props.city
    props.Country__c = source.props.country
    props.Company__c = source.props.company

    const record = TpJobseekerCvLineItemRecord.create(props)

    return record
  }
}
