var path = require('path'),
  fs = require('fs');

if (!process.env.HTTP) {
  let environmentFolder;
  switch (process.env.NODE_ENV) {
    case 'production':
      environmentFolder = 'production';
      break;

    case 'demonstration':
    default:
      environmentFolder = 'demonstration';
      break;
  }
  exports.privateKey = fs
    .readFileSync(
      path.join(__dirname, './' + environmentFolder + '/ssl/privkey.pem')
    )
    .toString();
  exports.certificate = fs
    .readFileSync(
      path.join(__dirname, './' + environmentFolder + '/ssl/cert.pem')
    )
    .toString();
} else {
  exports = {};
}
