import { registerEnumType } from '@nestjs/graphql'

export enum RediLocation {
  BERLIN = 'BERLIN',
  HAMBURG = 'HAMBURG',
  MALMO = 'MALMO',
  MUNICH = 'MUNICH',
  NRW = 'NRW',
  CYBERSPACE = 'CYBERSPACE',
}
registerEnumType(RediLocation, { name: 'RediLocation' })
