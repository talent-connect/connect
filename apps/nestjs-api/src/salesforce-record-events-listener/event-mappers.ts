import {
  CompanyTalentPoolState,
  ConnectProfileStatus,
  JobseekerProfileStatus,
} from '@talent-connect/common-types'
import {
  ConProfileCreatedExternalEventDto,
  ConProfileCreatedInternalEventDto,
  ConProfileStatusChangedExternalEventDto,
  ConProfileStatusChangedInternalEventDto,
  SalesforceRecordEvents,
  TpCompanyProfileStatusChangedExternalEventDto,
  TpCompanyProfileStatusChangedInternalEventDto,
  TpJobseekerProfileStatusChangedExternalEventDto,
  TpJobseekerProfileStatusChangedInternalEventDto,
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
  [SalesforceRecordEvents.TpAccountTalentPoolStatusChanged]: (
    payload: TpCompanyProfileStatusChangedExternalEventDto
  ): TpCompanyProfileStatusChangedInternalEventDto => ({
    tpCompanyProfileId: payload.payload.Account_ID__c,
    oldStatus: payload.payload.Old_Status__c as CompanyTalentPoolState,
    newStatus: payload.payload.New_Status__c as CompanyTalentPoolState,
  }),
  [SalesforceRecordEvents.TpJobseekerProfileStatusChanged]: (
    payload: TpJobseekerProfileStatusChangedExternalEventDto
  ): TpJobseekerProfileStatusChangedInternalEventDto => ({
    tpJobseekerProfileId: payload.payload.TP_Jobseeker_Profile_ID__c,
    oldStatus: payload.payload.Old_Status__c as JobseekerProfileStatus,
    newStatus: payload.payload.New_Status__c as JobseekerProfileStatus,
  }),
}
