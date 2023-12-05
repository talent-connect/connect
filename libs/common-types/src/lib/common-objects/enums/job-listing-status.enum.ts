import { registerEnumType } from '@nestjs/graphql'

export enum TpJobListingStatus {
  ACTIVE = 'ACTIVE',
  EXPIRED = 'EXPIRED',
}

registerEnumType(TpJobListingStatus, { name: 'TpJobListingStatus' })
