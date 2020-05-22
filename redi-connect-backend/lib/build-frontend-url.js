/* Keep me in sync with redi-connect-front/src/lib/build-frontend-url.ts */

module.exports = { 
  buildFrontendUrl: function (env, rediLocation) {
    if (env === 'production' && rediLocation === 'berlin') {
      return 'https://connect.redi-school.org'
    } else if (env === 'production' && rediLocation === 'munich') {
      return 'https://connect.munich.redi-school.org'
    } else if (env === 'demonstration') {
      return 'https://app.demo.connect.redi-school.org'
    } else if (env === 'development') {
      return 'http://127.0.0.1:3000'
    } else if (env === 'development') {
      return 'http://127.0.0.1:3000'
    } else {
      return 'http://127.0.0.1:3000'
    } 
  }
} 