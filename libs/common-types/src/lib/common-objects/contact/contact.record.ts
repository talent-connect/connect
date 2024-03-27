import { ContactRecordProps, Record, RecordMetadata } from '../../..'

export class ContactRecord extends Record<ContactRecordProps> {
  props: ContactRecordProps

  private constructor(props: ContactRecordProps) {
    super(props)
  }

  public static create(rawProps: ContactRecordProps) {
    const props = ContactRecordProps.create(rawProps)
    return new ContactRecord(props)
  }

  public static metadata: RecordMetadata = {
    SALESFORCE_OBJECT_NAME: 'Contact',
    SALESFORCE_OBJECT_FIELDS: [
      'Id',
      'Loopback_User_ID__c',
      'ReDI_Email_Address__c',
      'FirstName',
      'LastName',
      'ReDI_Behance_URL__c',
      'ReDI_Birth_Date__c',
      'ReDI_Dribbble_URL__c',
      'ReDI_Gender_Pronouns__c',
      'ReDI_Slack_Username__c',
      'ReDI_Stack_Overflow_URL__c',
      'ReDI_Website_Portfolio__c',
      'LinkedIn_Profile__c',
      'ReDI_GitHub_Profile__c',
      'MobilePhone',
      'redi_Contact_Gender__c',
      'ReDI_First_Point_of_Contact_Talent_Pool__c',
      'ReDI_First_Point_of_Contact_Other_TP__c',
      'CON_TP_Mailing_Address__c',
      'CreatedDate',
      'LastModifiedDate',
      'AccountId',
    ],
  }
}
