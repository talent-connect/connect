import {
  Persistence,
  PersistenceMetadata,
} from '../base-interfaces-types-classes'
import { ConMentorshipMatchPersistenceProps } from './con-mentorship-match.persistenceprops'

export class ConMentorshipMatchPersistence extends Persistence<ConMentorshipMatchPersistenceProps> {
  props: ConMentorshipMatchPersistenceProps

  private constructor(props: ConMentorshipMatchPersistenceProps) {
    super(props)
  }

  public static create(rawProps: ConMentorshipMatchPersistenceProps) {
    const props = ConMentorshipMatchPersistenceProps.create(rawProps)
    return new ConMentorshipMatchPersistence(props)
  }

  public static metadata: PersistenceMetadata = {
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
