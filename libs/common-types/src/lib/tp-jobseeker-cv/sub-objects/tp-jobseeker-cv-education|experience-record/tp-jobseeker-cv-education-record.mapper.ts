import { Injectable } from '@nestjs/common'
import { Mapper } from '../../../base-interfaces-types-classes'
import { TpJobseekerCvEducationRecordEntity } from './tp-jobseeker-cv-education-record.entity'
import { TpJobseekerCvEducationRecordEntityProps } from './tp-jobseeker-cv-education-record.entityprops'
import { TpJobseekerCvLineItemRecord } from './tp-jobseeker-cv-line-item.record'
import { TpJobseekerCvLineItemRecordProps } from './tp-jobseeker-cv-line-item.recordprops'

@Injectable()
export class TpJobseekerCvEducationRecordMapper
  implements
    Mapper<TpJobseekerCvEducationRecordEntity, TpJobseekerCvLineItemRecord>
{
  fromPersistence(
    raw: TpJobseekerCvLineItemRecord
  ): TpJobseekerCvEducationRecordEntity {
    const props = new TpJobseekerCvEducationRecordEntityProps()

    props.id = raw.props.Id

    props.sortIndex = raw.props.Frontend_View_Index__c
    props.tpJobseekerCvId = raw.props.Jobseeker_CV__c
    props.title = raw.props.Title__c
    props.description = raw.props.Description__c
    props.startDateMonth = raw.props.Start_Date_Month__c
    props.startDateYear = raw.props.Start_Date_Year__c
    props.endDateMonth = raw.props.End_Date_Month__c
    props.endDateYear = raw.props.End_Date_Year__c
    props.current = raw.props.Current__c
    props.institutionCity = raw.props.Institution_City__c
    props.institutionCountry = raw.props.Institution_Country__c
    props.institutionName = raw.props.Institution_Name__c
    props.certificationType = raw.props.Certification_Type__c

    props.updatedAt = raw.props.LastModifiedDate
    props.createdAt = raw.props.CreatedDate

    const entity = TpJobseekerCvEducationRecordEntity.create(props)

    return entity
  }

  public toPersistence(
    source: TpJobseekerCvEducationRecordEntity
  ): TpJobseekerCvLineItemRecord {
    const props = new TpJobseekerCvLineItemRecordProps()

    props.Id = source.props.id

    props.RecordType = {
      DeveloperName: 'Education',
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
    props.Institution_City__c = source.props.institutionCity
    props.Institution_Country__c = source.props.institutionCountry
    props.Institution_Name__c = source.props.institutionName
    props.Certification_Type__c = source.props.certificationType

    const record = TpJobseekerCvLineItemRecord.create(props)

    return record
  }
}
