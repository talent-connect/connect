import {
  Persistence,
  PersistenceMetadata,
} from '../base-interfaces-types-classes'
import { ConMentoringSessionPersistenceProps } from './con-mentoring-session.persistenceprops'

export class ConMentoringSessionPersistence extends Persistence<ConMentoringSessionPersistenceProps> {
  props: ConMentoringSessionPersistenceProps

  private constructor(props: ConMentoringSessionPersistenceProps) {
    super(props)
  }

  public static create(rawProps: ConMentoringSessionPersistenceProps) {
    const props = ConMentoringSessionPersistenceProps.create(rawProps)
    return new ConMentoringSessionPersistence(props)
  }

  public static metadata: PersistenceMetadata = {
    SALESFORCE_OBJECT_NAME: 'Mentoring_Session__c',
    SALESFORCE_OBJECT_FIELDS: [
      'Id',
      'Date__c',
      'Durations_in_Minutes__c',
      'CreatedDate',
      'LastModifiedDate',
    ],
  }
}
