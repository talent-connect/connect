import { ConnectProfileStatus } from '@talent-connect/common-types'

export interface ConProfileStatusChangedInternalEventDto {
  conProfileId: string
  oldStatus: ConnectProfileStatus
  newStatus: ConnectProfileStatus
}
