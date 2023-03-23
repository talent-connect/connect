import { SalesforceRecordEvents } from '@talent-connect/salesforce-record-events'

export const ChannelToEventMap = {
  '/event/ReDI_Connect_Profile_Statuc_Change_Event__e':
    SalesforceRecordEvents.ConProfileStatusChanged,
  '/event/ReDI_Connect_Profile_Creation_Event__e':
    SalesforceRecordEvents.ConProfileCreated,
  '/event/TP_Jobseeker_Profile_Status_Change_Event__e':
    SalesforceRecordEvents.TpJobseekerProfileStatusChanged,
  '/event/TP_Account_TP_Status_Change_Event__e':
    SalesforceRecordEvents.TpAccountTalentPoolStatusChanged,
}
