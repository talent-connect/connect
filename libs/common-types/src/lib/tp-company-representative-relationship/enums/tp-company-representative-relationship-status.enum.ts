import { registerEnumType } from '@nestjs/graphql'

export enum TpCompanyRepresentativeRelationshipStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  DEACTIVATED = 'DEACTIVATED',
}
registerEnumType(TpCompanyRepresentativeRelationshipStatus, {
  name: 'TpCompanyRepresentativeRelationshipStatus',
})
