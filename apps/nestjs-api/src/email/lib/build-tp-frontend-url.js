/* Keep me in sync with redi-connect-front/src/lib/build-frontend-url.ts */

export function buildTpFrontendUrl(env, rediLocation) {
  if (env === 'production') {
    return 'https://talent-pool.redi-school.org'
  } else if (env === 'demonstration') {
    return 'https://app.demo.talent-pool.redi-school.org'
  } else if (env === 'staging') {
    return 'https://app.staging.talent-pool.redi-school.org'
  } else if (env === 'development') {
    return 'http://localhost:2999'
  } else {
    return 'http://localhost:2999'
  }
}
