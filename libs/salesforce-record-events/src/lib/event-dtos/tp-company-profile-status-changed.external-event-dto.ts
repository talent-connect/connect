export interface TpCompanyProfileStatusChangedExternalEventDto {
  schema: string
  payload: {
    CreatedById: string
    CreatedDate: string
    Account_ID__c: string
    Old_Status__c: string
    New_Status__c: string
  }
  event: { replayId: number }
}
