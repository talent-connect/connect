/* Keep me in sync with redi-connect-backend/lib/build-frontend-url.js */

import { RediLocation } from '@talent-connect/shared-types'

export function buildFrontendUrl (env: string, rediLocation: RediLocation) {
  switch (env) {
    case 'production':
      switch (rediLocation) {
        case 'berlin': return 'https://connect.berlin.redi-school.org';
        case 'munich': return 'https://connect.munich.redi-school.org';
        case 'nrw': return 'https://connect.nrw.redi-school.org';
      }
      break;
    case 'demonstration': return 'https://app.demo.connect.redi-school.org'
    case 'staging': return 'https://app.staging.connect.redi-school.org'
    case 'development': return 'http://127.0.0.1:3000'
    default: return 'http://127.0.0.1:3000'
  }
}
