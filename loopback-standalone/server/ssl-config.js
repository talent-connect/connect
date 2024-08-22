var path = require('path')
var fs = require('fs')

if (process.env.USE_HTTPS) {
  let environmentFolder
  switch (process.env.NODE_ENV) {
    case 'production':
      environmentFolder = 'production'
      break

    case 'staging':
      environmentFolder = 'staging'
      break

    case 'demonstration':
    default:
      environmentFolder = 'demonstration'
      break
  }
  exports.privateKey = fs
    .readFileSync(
      path.join(__dirname, './ssl/' + environmentFolder + '/privkey.pem')
    )
    .toString()
  exports.certificate = fs
    .readFileSync(
      path.join(__dirname, './ssl/' + environmentFolder + '/cert.pem')
    )
    .toString()
} else {
  exports = {}
}
