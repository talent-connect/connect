import { plainToClass, Type } from 'class-transformer'
import { PicklistValue, RecordProps } from '../base-interfaces-types-classes'

export class ConMentorshipMatchRecordProps implements RecordProps {
  Id: string
  @Type(() => Boolean)
  Acceptance_Notification_Dismissed__c?: boolean
  @Type(() => Date)
  Application_Accepted_On__c?: Date
  Application_Text__c?: string
  Decline_Message__c?: string
  Decline_Reason__c?: string
  Decline_Reason_Other__c?: PicklistValue
  @Type(() => Date)
  Declined_On__c?: Date
  Expectations__c?: string
  Mentor_Acceptance_Message__c?: string
  Mentor_Completion_Message__c?: string
  Status__c: PicklistValue
  Mentee__c: string
  Mentor__c: string

  @Type(() => Date)
  CreatedDate: Date
  @Type(() => Date)
  LastModifiedDate: Date

  public static create(rawProps: any) {
    return plainToClass(ConMentorshipMatchRecordProps, rawProps, {})
  }
}
