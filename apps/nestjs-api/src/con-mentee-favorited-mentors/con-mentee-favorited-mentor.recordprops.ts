import { RecordProps } from '@talent-connect/common-types'
import { plainToClass, Type } from 'class-transformer'

export class ConMenteeFavoritedMentorRecordProps implements RecordProps {
  Id: string

  Favoritee_ReDI_Connect_Profile__c: string
  Favoriter_ReDI_Connect_Profile__c: string

  @Type(() => Date)
  CreatedDate: Date
  @Type(() => Date)
  LastModifiedDate: Date

  public static create(rawProps: any) {
    return plainToClass(ConMenteeFavoritedMentorRecordProps, rawProps, {})
  }
}
