/* Keep me in sync with redi-connect-backend/lib/build-frontend-url.js */

import { RediLocation } from '../types/RediLocation';

export function buildFrontendUrl(env: string, rediLocation: RediLocation) {
  if (env === 'production' && rediLocation === 'berlin') {
    return 'https://connect.berlin.redi-school.org';
  } else if (env === 'production' && rediLocation === 'munich') {
    return 'https://connect.munich.redi-school.org';
  } else if (env === 'production' && rediLocation === 'nrw') {
    return 'https://connect.nrw.redi-school.org';
  } else if (env === 'demonstration') {
    return 'https://app.demo.connect.redi-school.org';
  } else if (env === 'staging') {
    return 'https://app.staging.connect.redi-school.org';
  } else if (env === 'development') {
    return 'http://127.0.0.1:3000';
  } else if (env === 'development') {
    return 'http://127.0.0.1:3000';
  } else {
    return 'http://127.0.0.1:3000';
  }
}
