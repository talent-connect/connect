import { Record, RecordMetadata } from '../base-interfaces-types-classes'
import { AccountRecordProps } from './account.recordprops'

export class AccountRecord extends Record<AccountRecordProps> {
  props: AccountRecordProps

  private constructor(props: AccountRecordProps) {
    super(props)
  }

  public static create(rawProps: AccountRecordProps) {
    const props = AccountRecordProps.create(rawProps)
    return new AccountRecord(props)
  }

  public static metadata: RecordMetadata = {
    SALESFORCE_OBJECT_NAME: 'Account',
    SALESFORCE_OBJECT_FIELDS: [
      'Id',
      'CreatedDate',
      'LastModifiedDate',

      'ReDI_Avatar_Image_URL__c',
      'Name',
      'Location__c',
      'ReDI_Tagline__c',
      'Industry',
      'Website',
      'ReDI_LinkedIn_Page__c',
      'Phone',
      'Description',
      'ReDI_Talent_Pool_State__c',
      'ReDI_Visible_to_Jobseekers__c',
      'ReDI_Is_Job_Fair_2023_Participant__c',
      'ReDI_Joins_Berlin_23_Summer_Job_Fair__c',
      'ReDI_Joins_Munich_23_Summer_Job_Fair__c',
    ],
  }
}
