import { plainToClass, Type } from 'class-transformer'
import { RecordProps } from '../../../../base-interfaces-types-classes'

export class TpContactLanguageRecordProps implements RecordProps {
  Id: string
  hed__Contact__c: string

  hed__Language__r: {
    Slug__c: string
  }
  hed__Language__c: string
  hed__Fluency__c: string

  @Type(() => Date)
  CreatedDate: Date
  @Type(() => Date)
  LastModifiedDate: Date

  static create(rawProps: any) {
    return plainToClass(TpContactLanguageRecordProps, rawProps, {})
  }
}
