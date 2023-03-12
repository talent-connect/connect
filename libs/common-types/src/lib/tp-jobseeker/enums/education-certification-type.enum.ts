import { registerEnumType } from '@nestjs/graphql'

export enum TpEducationCertificationType {
  confirmationOfAttendance = 'confirmationOfAttendance',
  professionalCertification = 'professionalCertification',
  rediSchoolCourse = 'rediSchoolCourse',
  universityDegreeDiploma = 'universityDegreeDiploma',
  other = 'other',
}

registerEnumType(TpEducationCertificationType, {
  name: 'TpEducationCertificationType',
})
