/* Keep me in sync with redi-connect-front/src/lib/build-frontend-url.ts */

module.exports = {
  buildBackendUrl: function (env) {
    if (env === 'production') {
      return 'https://connect-api.redi-school.org'
    } else if (env === 'demonstration') {
      return 'https://api.demo.connect.redi-school.org'
    } else if (env === 'staging') {
      return 'https://api.staging.connect.redi-school.org'
    } else if (env === 'development') {
      return 'http://127.0.0.1:3003'
    } else if (env === 'prod') {
      return 'https://app-staging-redi.azurewebsites.net'
    } else {
      return 'http://127.0.0.1:3003'
    }
  }
}
