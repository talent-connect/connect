import { Injectable } from '@nestjs/common'
import {
  Mapper,
  TpDesiredPosition,
  TpEmploymentType,
  TpJobListingEntity,
  TpJobListingEntityProps,
  TpJobListingRecord,
  TpJobListingRecordProps,
  TpTechnicalSkill,
} from '@talent-connect/common-types'

@Injectable()
export class TpJobListingMapper
  implements Mapper<TpJobListingEntity, TpJobListingRecord>
{
  fromPersistence(raw: TpJobListingRecord): TpJobListingEntity {
    const props = new TpJobListingEntityProps()

    console.log(raw)

    props.id = raw.props.Id

    props.title = raw.props.Title__c
    props.location = raw.props.Location__c
    props.summary = raw.props.Summary__c
    props.idealTechnicalSkills =
      (raw.props.Ideal_Technical_Skills__c?.split(';') as TpTechnicalSkill[]) ??
      undefined
    props.relatesToPositions =
      (raw.props.Relates_to_Positions__c?.split(';') as TpDesiredPosition[]) ??
      undefined
    props.employmentType = raw.props.Employment_Type__c as TpEmploymentType
    props.languageRequirements = raw.props.Language_Requirements__c
    props.salaryRange = raw.props.Salary_Range__c
    props.isRemotePossible = raw.props.Remote_Possible__c

    props.companyProfileId = raw.props.Account__c

    props.createdAt = raw.props.CreatedDate
    props.updatedAt = raw.props.LastModifiedDate

    props.companyName = raw.props.Account__r.Name
    props.profileAvatarImageS3Key =
      raw.props.Account__r.ReDI_Avatar_Image_URL__c

    const entity = TpJobListingEntity.create(props)

    return entity
  }

  public toPersistence(source: TpJobListingEntity): TpJobListingRecord {
    const props = new TpJobListingRecordProps()
    const srcProps = source.props

    props.Id = srcProps.id

    props.Title__c = srcProps.title
    props.Location__c = srcProps.location
    props.Summary__c = srcProps.summary
    props.Ideal_Technical_Skills__c = srcProps.idealTechnicalSkills?.join(';')
    props.Relates_to_Positions__c = srcProps.relatesToPositions?.join(';')
    props.Employment_Type__c = srcProps.employmentType
    props.Language_Requirements__c = srcProps.languageRequirements
    props.Salary_Range__c = srcProps.salaryRange
    props.Remote_Possible__c = Boolean(srcProps.isRemotePossible)

    props.Account__c = srcProps.companyProfileId

    const record = TpJobListingRecord.create(props)

    return record
  }
}
