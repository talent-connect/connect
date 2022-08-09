import { Injectable } from '@nestjs/common'
import {
  AccountContactRecord,
  AccountContactRecordProps,
  Mapper,
  TpCompanyRepresentativeRelationshipEntity,
  TpCompanyRepresentativeRelationshipEntityProps,
} from '@talent-connect/common-types'

@Injectable()
export class TpCompanyRepresentativeRelationshipMapper
  implements
    Mapper<TpCompanyRepresentativeRelationshipEntity, AccountContactRecord>
{
  fromPersistence(
    raw: AccountContactRecord
  ): TpCompanyRepresentativeRelationshipEntity {
    const props = new TpCompanyRepresentativeRelationshipEntityProps()

    props.id = raw.props.Id

    props.tpCompanyProfileId = raw.props.AccountId
    props.userId = raw.props.ContactId
    props.status = raw.props.ReDI_Company_Representative_Status__c

    props.createdAt = raw.props.CreatedDate
    props.updatedAt = raw.props.LastModifiedDate

    const entity = TpCompanyRepresentativeRelationshipEntity.create(props)

    return entity
  }

  public toPersistence(
    source: TpCompanyRepresentativeRelationshipEntity
  ): AccountContactRecord {
    const props = new AccountContactRecordProps()
    const srcProps = source.props

    props.Id = srcProps.id

    props.AccountId = source.props.tpCompanyProfileId
    props.ContactId = source.props.userId
    props.ReDI_Company_Representative_Status__c = source.props.status

    props.CreatedDate = srcProps.createdAt
    props.LastModifiedDate = srcProps.updatedAt

    const record = AccountContactRecord.create(props)

    return record
  }
}
