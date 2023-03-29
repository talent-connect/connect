import { plainToClass, Type } from 'class-transformer'
import { RecordProps } from '../base-interfaces-types-classes'

export class ConMentoringSessionRecordProps implements RecordProps {
  Id: string

  @Type(() => Date)
  Date__c: Date
  Durations_in_Minutes__c: number

  Mentor__c: string
  Mentee__c: string

  @Type(() => Date)
  CreatedDate: Date
  @Type(() => Date)
  LastModifiedDate: Date

  public static create(rawProps: any) {
    return plainToClass(ConMentoringSessionRecordProps, rawProps, {})
  }
}
