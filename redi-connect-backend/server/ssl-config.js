var path = require('path'),
  fs = require('fs');

if (!process.env.HTTP) {
  exports.privateKey = fs
    .readFileSync(path.join(__dirname, './ssl/privkey.pem'))
    .toString();
  exports.certificate = fs
    .readFileSync(path.join(__dirname, './ssl/cert.pem'))
    .toString();
} else {
  exports = {};
}
