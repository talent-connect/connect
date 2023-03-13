import { Injectable } from '@nestjs/common'
import { Mapper } from '../../../../base-interfaces-types-classes'
import { TpJobseekerProfileEducationRecordEntityProps } from '../../../common-objects'
import { TpJobseekerProfileEducationRecordEntity } from '../../../common-objects/tp-jobseeker-profile-education-record.entity'
import { TpJobseekerLineItemRecord } from './tp-jobseeker-line-item.record'
import { TpJobseekerLineItemRecordProps } from './tp-jobseeker-line-item.recordprops'

@Injectable()
export class TpJobseekerProfileEducationRecordMapper
  implements
    Mapper<TpJobseekerProfileEducationRecordEntity, TpJobseekerLineItemRecord>
{
  fromPersistence(
    raw: TpJobseekerLineItemRecord
  ): TpJobseekerProfileEducationRecordEntity {
    const props = new TpJobseekerProfileEducationRecordEntityProps()

    props.id = raw.props.Id

    props.uuid = String(raw.props.Frontend_View_Index__c)
    props.userId = raw.props.Contact__c
    props.tpJobseekerProfileId = raw.props.Jobseeker_Profile__c
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

    const entity = TpJobseekerProfileEducationRecordEntity.create(props)

    return entity
  }

  public toPersistence(
    source: TpJobseekerProfileEducationRecordEntity
  ): TpJobseekerLineItemRecord {
    const props = new TpJobseekerLineItemRecordProps()

    props.Id = source.props.id

    props.Id = source.props.id
    props.Frontend_View_Index__c = parseInt(source.props.uuid)
    props.Contact__c = source.props.userId
    props.Jobseeker_Profile__c = source.props.tpJobseekerProfileId
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

    const record = TpJobseekerLineItemRecord.create(props)

    return record
  }
}
