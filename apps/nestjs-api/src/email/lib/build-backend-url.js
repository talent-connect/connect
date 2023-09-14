/* Keep me in sync with redi-connect-front/src/lib/build-frontend-url.ts */

export function buildBackendUrl(env) {
  if (env === 'production') {
    return 'https://connect-api.redi-school.org'
  } else if (env === 'demonstration') {
    return 'https://api.demo.connect.redi-school.org'
  } else if (env === 'staging') {
    return 'https://api.staging.connect.redi-school.org'
  } else if (env === 'development') {
    return 'http://localhost:3003'
  } else {
    return 'http://localhost:3003'
  }
}
