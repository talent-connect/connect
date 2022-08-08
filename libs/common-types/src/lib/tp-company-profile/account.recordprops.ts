import { plainToClass, Type } from 'class-transformer'
import { RecordProps } from '../base-interfaces-types-classes'

export class AccountRecordProps implements RecordProps {
  Id: string

  ReDI_Avatar_Image_URL__c?: string
  Name: string
  Location__c?: string
  ReDI_Tagline__c?: string
  Industry?: string
  Website?: string
  ReDI_LinkedIn_Page__c?: string
  Phone?: string
  Description?: string
  ReDI_Talent_Pool_State__c: string
  ReDI_Visible_to_Jobseekers__c: boolean

  @Type(() => Date)
  CreatedDate: Date
  @Type(() => Date)
  LastModifiedDate: Date

  public static create(rawProps: any) {
    return plainToClass(AccountRecordProps, rawProps, {})
  }
}
