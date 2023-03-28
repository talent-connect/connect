import { plainToClass, Type } from 'class-transformer'
import { RecordProps } from '../../../base-interfaces-types-classes'

export class TpJobseekerCvLanguageRecordProps implements RecordProps {
  Id: string
  Jobseeker_CV__c: string

  Language__r: {
    Slug__c: string
  }
  Language__c: string
  Fluency__c: string

  @Type(() => Date)
  CreatedDate: Date
  @Type(() => Date)
  LastModifiedDate: Date

  static create(rawProps: any) {
    return plainToClass(TpJobseekerCvLanguageRecordProps, rawProps, {})
  }
}
