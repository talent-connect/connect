import { Record, RecordMetadata } from '../base-interfaces-types-classes'
import { ConMentorshipMatchRecordProps } from './con-mentorship-match.recordprops'

export class ConMentorshipMatchRecord extends Record<ConMentorshipMatchRecordProps> {
  props: ConMentorshipMatchRecordProps

  private constructor(props: ConMentorshipMatchRecordProps) {
    super(props)
  }

  public static create(rawProps: ConMentorshipMatchRecordProps) {
    const props = ConMentorshipMatchRecordProps.create(rawProps)
    return new ConMentorshipMatchRecord(props)
  }

  public static metadata: RecordMetadata = {
    SALESFORCE_OBJECT_NAME: 'Mentorship_Match__c',
    SALESFORCE_OBJECT_FIELDS: [
      'Id',
      'Acceptance_Notification_Dismissed__c',
      'Application_Accepted_On__c',
      'Application_Text__c',
      'Decline_Message__c',
      'Decline_Reason__c',
      'Decline_Reason_Other__c',
      'Declined_On__c',
      'Expectations__c',
      'Mentor_Acceptance_Message__c',
      'Mentor_Completion_Message__c',
      'Status__c',
      'Mentee__c',
      'Mentor__c',
      'CreatedDate',
      'LastModifiedDate',
    ],
  }
}
