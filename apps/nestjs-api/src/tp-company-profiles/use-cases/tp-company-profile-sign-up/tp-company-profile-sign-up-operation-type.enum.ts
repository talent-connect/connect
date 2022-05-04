import { registerEnumType } from '@nestjs/graphql'

export enum TpCompanyProfileSignUpOperationType {
  NEW_COMPANY = 'NEW_COMPANY',
  EXISTING_COMPANY = 'EXISTING_COMPANY',
}
registerEnumType(TpCompanyProfileSignUpOperationType, {
  name: 'TpCompanyProfileSignUpOperationType',
})
