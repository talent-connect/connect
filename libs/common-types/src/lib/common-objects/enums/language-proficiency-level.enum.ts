import { registerEnumType } from '@nestjs/graphql'

export enum LanguageProficiencyLevel {
  'elementaryProficiency' = 'elementaryProficiency',
  'limitedWorkingProficiency' = 'limitedWorkingProficiency',
  'fullWorkingProficiency' = 'fullWorkingProficiency',
  'nativeOrBilingualProficiency' = 'nativeOrBilingualProficiency',
}

registerEnumType(LanguageProficiencyLevel, { name: 'LanguageProficiencyLevel' })
