import {
  Persistence,
  PersistenceMetadata,
} from '../base-interfaces-types-classes'
import { AccountPersistenceProps } from './account.persistenceprops'

export class AccountPersistence extends Persistence<AccountPersistenceProps> {
  props: AccountPersistenceProps

  private constructor(props: AccountPersistenceProps) {
    super(props)
  }

  public static create(rawProps: AccountPersistenceProps) {
    const props = AccountPersistenceProps.create(rawProps)
    return new AccountPersistence(props)
  }

  public static metadata: PersistenceMetadata = {
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
