import { registerEnumType } from '@nestjs/graphql'

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}
registerEnumType(Gender, { name: 'Gender' })
