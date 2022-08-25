import { plainToClass, Type } from 'class-transformer'
import { RecordProps } from '../base-interfaces-types-classes'
import { ContactRecordProps } from '../common-objects'

export class TpJobseekerProfileRecordProps implements RecordProps {
  Id: string
  Email: string
  @Type(() => Date)
  CreatedDate: Date
  LastModifiedDate: Date
  Name: string

  @Type(() => ContactRecordProps)
  Contact__r: ContactRecordProps

  // props: {
  //   Email: string
  //   Id: string
  //   FirstName: string
  //   LastName: string
  //   redi_Contact_Gender__c: Gender
  //   ReDI_Birth_Date__c: Date
  //   LinkedIn_Profile__c: string
  //   ReDI_GitHub_Profile__c: string
  //   ReDI_Slack_Username__c: string
  //   MobilePhone: string
  //   Loopback_User_ID__c: string
  //   ReDI_Age__c: number
  // }

  public static create(rawProps: any) {
    return plainToClass(TpJobseekerProfileRecordProps, rawProps, {})
  }
}
