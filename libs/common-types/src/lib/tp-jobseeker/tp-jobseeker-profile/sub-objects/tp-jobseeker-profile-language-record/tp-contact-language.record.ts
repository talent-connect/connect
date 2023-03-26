import {
  Record,
  RecordMetadata,
} from '../../../../base-interfaces-types-classes'
import { TpContactLanguageRecordProps } from './tp-contact-language.recordprops'

export class TpContactLanguageRecord extends Record<TpContactLanguageRecordProps> {
  props: TpContactLanguageRecordProps

  private constructor(props: TpContactLanguageRecordProps) {
    super(props)
  }

  public static create(rawProps: TpContactLanguageRecordProps) {
    const props = TpContactLanguageRecordProps.create(rawProps)
    return new TpContactLanguageRecord(props)
  }

  public static metadata: RecordMetadata = {
    SALESFORCE_OBJECT_NAME: 'hed__Contact_Language__c',
    SALESFORCE_OBJECT_FIELDS: [
      'Id',
      'hed__Contact__c',
      'hed__Fluency__c',
      'hed__Language__c',
      'hed__Language__r.Slug__c',
      'CreatedDate',
      'LastModifiedDate',
    ],
  }
}
