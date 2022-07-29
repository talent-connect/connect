import { SalesforceRecordEvents } from '@talent-connect/salesforce-record-events'

export const ChannelToEventMap = {
  '/event/ReDI_Connect_Profile_Statuc_Change_Event__e':
    SalesforceRecordEvents.ConProfileStatusChanged,
  '/event/ReDI_Connect_Profile_Creation_Event__e':
    SalesforceRecordEvents.ConProfileCreated,
}
