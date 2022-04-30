import { registerEnumType } from '@nestjs/graphql'

export enum RediLocation {
  BERLIN = 'BERLIN',
  HAMBURG = 'HAMBURG',
  MUNICH = 'MUNICH',
  NRW = 'NRW',
}
registerEnumType(RediLocation, { name: 'RediLocation' })
