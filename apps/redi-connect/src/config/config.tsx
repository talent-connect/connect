import {
  COURSES as allCourses,
  REDI_LOCATION_NAMES as configRediLocationNames,
} from '@talent-connect/shared-config'
import { RediLocation } from '@talent-connect/shared-types'

const rediLocationNames = {
  ...configRediLocationNames,
  'location-picker': 'Location Picker',
}

const rediLocation = process.env.NX_REDI_CONNECT_REDI_LOCATION as RediLocation
const validRediLocations = Object.keys(rediLocationNames)

if (!validRediLocations.includes(rediLocation))
  throw new Error('Invalid RediLocation')

export const courses = allCourses.filter((c) => c.location === rediLocation)
