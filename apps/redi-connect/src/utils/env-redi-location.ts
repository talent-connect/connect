// Utility function to return the current REDI_LOCATION and bind it to its
// Typescript type. The variable is determined at build-time via package.json.
// The front-end can be in either "Berlin mode" or "Munich mode". Other
// "ReDI locations" may be included in the future as ReDI School opens up in
// more places

import { RediLocation } from '../types/RediLocation';

export function envRediLocation(): RediLocation {
  return process.env.NX_REDI_CONNECT_REDI_LOCATION as RediLocation;
}
