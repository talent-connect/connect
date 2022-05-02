import { Record, RecordMetadata } from '../base-interfaces-types-classes'
import { AccountRecord } from './account.record'
import { AccountRecordProps } from './account.recordprops'

export class AccountContactRecord extends Record<AccountRecordProps> {
  props: AccountRecordProps

  private constructor(props: AccountRecordProps) {
    super(props)
  }

  public static create(rawProps: AccountRecordProps) {
    const props = AccountRecordProps.create(rawProps)
    return new AccountContactRecord(props)
  }

  public static metadata: RecordMetadata = {
    SALESFORCE_OBJECT_NAME: 'AccountContactRelation',
    SALESFORCE_OBJECT_FIELDS: [
      'Id',
      'CreatedDate',
      'LastModifiedDate',
      'AccountId',
      'ContactId',
      'Roles',
    ],
  }
}
