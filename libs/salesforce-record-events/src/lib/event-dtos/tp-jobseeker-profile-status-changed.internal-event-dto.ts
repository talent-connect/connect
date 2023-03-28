import { JobseekerProfileStatus } from '@talent-connect/common-types'

export interface TpJobseekerProfileStatusChangedInternalEventDto {
  tpJobseekerProfileId: string
  oldStatus: JobseekerProfileStatus
  newStatus: JobseekerProfileStatus
}
