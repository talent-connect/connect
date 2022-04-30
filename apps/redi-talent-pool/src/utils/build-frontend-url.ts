/* Keep me in sync with redi-connect-backend/lib/build-frontend-url.js */

import { RediLocation } from '@talent-connect/shared-types'

export function buildFrontendUrl(env: string, rediLocation: RediLocation) {
  if (env === 'production' && rediLocation === 'BERLIN') {
    return 'https://connect.berlin.redi-school.org'
  } else if (env === 'production' && rediLocation === 'HAMBURG') {
    return 'https://connect.hamburg.redi-school.org'
  } else if (env === 'production' && rediLocation === 'MUNICH') {
    return 'https://connect.munich.redi-school.org'
  } else if (env === 'production' && rediLocation === 'NRW') {
    return 'https://connect.nrw.redi-school.org'
  } else if (env === 'demonstration') {
    return 'https://app.demo.connect.redi-school.org'
  } else if (env === 'staging') {
    return 'https://app.staging.connect.redi-school.org'
  } else if (env === 'development') {
    return 'http://127.0.0.1:3000'
  } else {
    return 'http://127.0.0.1:3000'
  }
}
