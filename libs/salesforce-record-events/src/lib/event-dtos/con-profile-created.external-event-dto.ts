export interface ConProfileCreatedExternalEventDto {
  schema: string
  payload: {
    CreatedById: string
    CreatedDate: string
    ReDI_Connect_Profile_ID__c: string
  }
  event: { replayId: number }
}
