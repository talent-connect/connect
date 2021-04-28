import {
  courses as allCourses,
  rediLocationNames,
} from '@talent-connect/shared-config'
import { RediLocation } from '@talent-connect/shared-types'

const rediLocation = process.env.NX_REDI_CONNECT_REDI_LOCATION as RediLocation
const validRediLocations = Object.keys(rediLocationNames)

if (!validRediLocations.includes(rediLocation))
  throw new Error('Invalid RediLocation')

export const courses = allCourses.filter((c) => c.location === rediLocation)
