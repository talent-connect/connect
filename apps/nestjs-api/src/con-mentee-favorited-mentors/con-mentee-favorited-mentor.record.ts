import { Record, RecordMetadata } from '@talent-connect/common-types'
import { ConMenteeFavoritedMentorRecordProps } from './con-mentee-favorited-mentor.recordprops'

export class ConMenteeFavoritedMentorRecord extends Record<ConMenteeFavoritedMentorRecordProps> {
  props: ConMenteeFavoritedMentorRecordProps

  private constructor(props: ConMenteeFavoritedMentorRecordProps) {
    super(props)
  }

  public static create(rawProps: ConMenteeFavoritedMentorRecordProps) {
    const props = ConMenteeFavoritedMentorRecordProps.create(rawProps)
    return new ConMenteeFavoritedMentorRecord(props)
  }

  public static metadata: RecordMetadata = {
    SALESFORCE_OBJECT_NAME: 'Mentee_Favorited_Mentor_Profile__c',
    SALESFORCE_OBJECT_FIELDS: [
      'Id',
      'Favoritee_ReDI_Connect_Profile__c',
      'Favoriter_ReDI_Connect_Profile__c',
      'CreatedDate',
      'LastModifiedDate',
    ],
  }
}
