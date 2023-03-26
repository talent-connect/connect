import { registerEnumType } from '@nestjs/graphql'

export enum MentoringSessionDuration {
  'MIN15' = 'MIN15',
  'MIN30' = 'MIN30',
  'MIN45' = 'MIN45',
  'MIN60' = 'MIN60',
  'MIN75' = 'MIN75',
  'MIN90' = 'MIN90',
  'MIN105' = 'MIN105',
  'MIN120' = 'MIN120',
  'MIN135' = 'MIN135',
  'MIN150' = 'MIN150',
  'MIN165' = 'MIN165',
  'MIN180' = 'MIN180',
}
registerEnumType(MentoringSessionDuration, { name: 'MentoringSessionDuration' })
