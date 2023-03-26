export interface TpJobseekerProfileStatusChangedExternalEventDto {
  schema: string
  payload: {
    CreatedById: string
    CreatedDate: string
    TP_Jobseeker_Profile_ID__c: string
    Old_Status__c: string
    New_Status__c: string
  }
  event: { replayId: number }
}
