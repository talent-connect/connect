import { registerEnumType } from '@nestjs/graphql'

export enum EducationLevel {
  middleSchool = 'middleSchool',
  highSchool = 'highSchool',
  apprenticeship = 'apprenticeship',
  universityBachelor = 'universityBachelor',
  universityMaster = 'universityMaster',
  universityPhd = 'universityPhd',
}
registerEnumType(EducationLevel, { name: 'EducationLevel' })
