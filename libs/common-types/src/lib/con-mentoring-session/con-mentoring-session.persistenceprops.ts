import { plainToClass, Type } from 'class-transformer'
import { PersistenceProps } from '../base-interfaces-types-classes'

export class ConMentoringSessionPersistenceProps implements PersistenceProps {
  Id: string

  @Type(() => Date)
  Date__c: Date
  Durations_in_Minutes__c: number

  @Type(() => Date)
  CreatedDate?: Date
  @Type(() => Date)
  LastModifiedDate: Date

  public static create(rawProps: any) {
    return plainToClass(ConMentoringSessionPersistenceProps, rawProps, {})
  }
}
