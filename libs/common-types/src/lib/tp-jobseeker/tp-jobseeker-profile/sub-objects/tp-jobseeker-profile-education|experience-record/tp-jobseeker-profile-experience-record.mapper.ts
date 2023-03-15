import { Injectable } from '@nestjs/common'
import { Mapper } from '../../../../base-interfaces-types-classes'
import { TpJobseekerProfileExperienceRecordEntityProps } from '../../../common-objects'
import { TpJobseekerProfileExperienceRecordEntity } from '../../../common-objects/tp-jobseeker-profile-experience-record.entity'
import { TpJobseekerLineItemRecord } from './tp-jobseeker-line-item.record'
import { TpJobseekerLineItemRecordProps } from './tp-jobseeker-line-item.recordprops'

@Injectable()
export class TpJobseekerProfileExperienceRecordMapper
  implements
    Mapper<TpJobseekerProfileExperienceRecordEntity, TpJobseekerLineItemRecord>
{
  fromPersistence(
    raw: TpJobseekerLineItemRecord
  ): TpJobseekerProfileExperienceRecordEntity {
    const props = new TpJobseekerProfileExperienceRecordEntityProps()

    props.id = raw.props.Id

    props.sortIndex = raw.props.Frontend_View_Index__c
    props.userId = raw.props.Contact__c
    props.tpJobseekerProfileId = raw.props.Jobseeker_Profile__c
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

    const entity = TpJobseekerProfileExperienceRecordEntity.create(props)

    return entity
  }

  public toPersistence(
    source: TpJobseekerProfileExperienceRecordEntity
  ): TpJobseekerLineItemRecord {
    const props = new TpJobseekerLineItemRecordProps()

    props.Id = source.props.id

    props.Id = source.props.id
    props.Frontend_View_Index__c = source.props.sortIndex
    props.Contact__c = source.props.userId
    props.Jobseeker_Profile__c = source.props.tpJobseekerProfileId
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

    const record = TpJobseekerLineItemRecord.create(props)

    return record
  }
}
