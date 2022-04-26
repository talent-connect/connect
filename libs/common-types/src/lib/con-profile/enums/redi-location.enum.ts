import { registerEnumType } from '@nestjs/graphql'

export enum RediLocation {
  BERLIN = 'berlin',
  HAMBURG = 'hamburg',
  MUNICH = 'munich',
  NRW = 'nrw',
}
registerEnumType(RediLocation, { name: 'RediLocation' })
