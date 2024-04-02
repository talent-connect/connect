/* Keep me in sync with redi-connect-front/src/lib/build-frontend-url.ts */

export function buildFrontendUrl(env) {
  if (env === 'production') {
    return 'https://connect.redi-school.org'
  } else if (env === 'demonstration') {
    return 'https://app.demo.connect.redi-school.org'
  } else if (env === 'staging') {
    return 'https://app.staging.connect.redi-school.org'
  } else if (env === 'development') {
    return 'http://localhost:3000'
  } else {
    return 'http://localhost:3000'
  }
}
