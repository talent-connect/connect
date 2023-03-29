import { registerEnumType } from '@nestjs/graphql'

export enum ConnectProfileStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  DEACTIVATED = 'DEACTIVATED',
}

registerEnumType(ConnectProfileStatus, { name: 'ConnectProfileStatus' })
