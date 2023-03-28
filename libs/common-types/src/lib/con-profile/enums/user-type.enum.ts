import { registerEnumType } from '@nestjs/graphql'

export enum UserType {
  MENTOR = 'MENTOR',
  MENTEE = 'MENTEE',
}
registerEnumType(UserType, { name: 'UserType' })
