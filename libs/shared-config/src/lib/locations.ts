import { RediLocation } from '@talent-connect/shared-types';

export const REDI_LOCATION_NAMES: Record<Exclude<RediLocation, 'location-picker'>, string> = {
  berlin: 'Berlin',
  munich: 'Munich',
  nrw: 'NRW',
} as const;

export type ReDILocationKey = keyof typeof REDI_LOCATION_NAMES