import { ConnectProfileStatus } from '@talent-connect/common-types'

export interface ConProfileStatusChangedExternalEventDto {
  schema: string
  payload: {
    CreatedById: string
    CreatedDate: string
    ReDI_Connect_Profile_ID__c: string
    Old_Status__c: string
    New_Status__c: string
  }
  event: { replayId: number }
}
