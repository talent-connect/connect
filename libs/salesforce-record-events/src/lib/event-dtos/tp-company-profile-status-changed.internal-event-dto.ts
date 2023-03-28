import { CompanyTalentPoolState } from '@talent-connect/common-types'

export interface TpCompanyProfileStatusChangedInternalEventDto {
  tpCompanyProfileId: string
  oldStatus: CompanyTalentPoolState
  newStatus: CompanyTalentPoolState
}
