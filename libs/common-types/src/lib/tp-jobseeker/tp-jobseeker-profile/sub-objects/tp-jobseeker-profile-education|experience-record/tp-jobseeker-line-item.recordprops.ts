import { plainToClass, Type } from 'class-transformer'
import { RecordProps } from '../../../../base-interfaces-types-classes'

export class TpJobseekerLineItemRecordProps implements RecordProps {
  Id: string

  Contact__c: string
  Jobseeker_Profile__c: string

  RecordType: {
    DeveloperName: 'Experience' | 'Education'
  }
  RecordTypeId: string
  Frontend_View_Index__c: number
  Description__c?: string
  Institution_City__c?: string
  Institution_Country__c?: string
  Institution_Name__c?: string
  Title__c?: string
  Certification_Type__c?: string
  Start_Date_Month__c?: number
  Start_Date_Year__c?: number
  End_Date_Month__c?: number
  End_Date_Year__c?: number
  Current__c: boolean
  City__c?: string
  Country__c?: string
  Company__c?: string

  @Type(() => Date)
  CreatedDate: Date
  @Type(() => Date)
  LastModifiedDate: Date

  static create(rawProps: any) {
    return plainToClass(TpJobseekerLineItemRecordProps, rawProps, {})
  }
}
