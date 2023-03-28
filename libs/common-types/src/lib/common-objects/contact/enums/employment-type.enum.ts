import { registerEnumType } from '@nestjs/graphql'

export enum TpEmploymentType {
  partTime = 'partTime',
  fullTime = 'fullTime',
  werkstudium = 'werkstudium',
  Internship = 'Internship',
  apprenticeshipAusbildung = 'apprenticeshipAusbildung',
  freelance = 'contract',
  contract = 'freelance',
  traineeship = 'traineeship',
  dualStudyBachelor = 'dualStudyBachelor',
  dualStudyMaster = 'dualStudyMaster',
}

registerEnumType(TpEmploymentType, { name: 'TpEmploymentType' })
