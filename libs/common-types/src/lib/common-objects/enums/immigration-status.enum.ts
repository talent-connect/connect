import { registerEnumType } from '@nestjs/graphql'

export enum ImmigrationStatus {
  euCitizenshipOrUnlimitedResidencePermissionNiederlassungserlaubnis = 'euCitizenshipOrUnlimitedResidencePermissionNiederlassungserlaubnis',
  euBlueCardBlaueKarte = 'euBlueCardBlaueKarte',
  temporaryResidencePermissionAufenthaltstitel = 'temporaryResidencePermissionAufenthaltstitel',
  visaNationalvisumOrJobseekerVisum = 'visaNationalvisumOrJobseekerVisum',
  studentVisa = 'studentVisa',
  schengenVisa = 'schengenVisa',
}
registerEnumType(ImmigrationStatus, { name: 'ImmigrationStatus' })
