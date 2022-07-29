import { ConnectProfileStatus } from '@talent-connect/common-types'
import {
  ConProfileCreatedExternalEventDto,
  ConProfileCreatedInternalEventDto,
  ConProfileStatusChangedExternalEventDto,
  ConProfileStatusChangedInternalEventDto,
  SalesforceRecordEvents,
} from '@talent-connect/salesforce-record-events'

export const EventMappers = {
  [SalesforceRecordEvents.ConProfileStatusChanged]: (
    payload: ConProfileStatusChangedExternalEventDto
  ): ConProfileStatusChangedInternalEventDto => ({
    conProfileId: payload.payload.ReDI_Connect_Profile_ID__c,
    oldStatus: payload.payload.Old_Status__c as ConnectProfileStatus,
    newStatus: payload.payload.New_Status__c as ConnectProfileStatus,
  }),
  [SalesforceRecordEvents.ConProfileCreated]: (
    payload: ConProfileCreatedExternalEventDto
  ): ConProfileCreatedInternalEventDto => ({
    conProfileId: payload.payload.ReDI_Connect_Profile_ID__c,
  }),
}
