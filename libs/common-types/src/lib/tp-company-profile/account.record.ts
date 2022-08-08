import { Record, RecordMetadata } from '../base-interfaces-types-classes'
import { AccountRecordProps } from './account.recordprops'

/**
 * The Entity equivalent of this Record is TpCompanyRepresentativeRelationshipEntity.
 * In the Salesforce domain, this object/record simply represents any relationship
 * between an Account and a Contact. In the context of the core/TP domain, where
 * each Contact is a user, and each Account is a TpCompanyProfile, this object
 * is mapped to a TpCompanyRepresentativeRelationshipEntity. That entity tracks the
 * relationship between a Contact and a TpCompanyProfile, and what status that
 * relationship has.
 */

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
    ],
  }
}
