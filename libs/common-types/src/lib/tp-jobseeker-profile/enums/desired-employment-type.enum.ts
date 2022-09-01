import { registerEnumType } from '@nestjs/graphql'

export enum TpDesiredEmploymentType {
  partTime = 'partTime',
  fullTime = 'fullTime',
  werkstudium = 'werkstudium',
  Internship = 'Internship',
  apprenticeshipAusbildung = 'apprenticeshipAusbildung',
  traineeship = 'traineeship',
  dualStudyBachelor = 'dualStudyBachelor',
  dualStudyMaster = 'dualStudyMaster',
}

registerEnumType(TpDesiredEmploymentType, { name: 'TpDesiredEmploymentType' })
