'use strict'
const path = require('path')
const res = require('dotenv').config({
  path: path.resolve(process.cwd(), '.env.' + process.env.NODE_ENV),
})

var loopback = require('loopback')
var boot = require('loopback-boot')

var http = require('http')
var https = require('https')
var sslConfig = require('./ssl-config')

var app = (module.exports = loopback())
/*
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
*/
require('../lib/email/email')
require('../lib/email/tp-email')

app.start = function () {
  // start the web server
  return app.listen(function () {
    app.emit('started')
    var baseUrl = app.get('url').replace(/\/$/, '')
    console.log('Web server listening at: %s', baseUrl)
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath)
    }
  })
}

app.get('/yalla', async (req, res) => {
  res.send('hello')
})

// Inject current user into context
app
  .remotes()
  .phases.addBefore('invoke', 'options-from-request')
  .use(function (ctx, next) {
    if (!ctx.args || !ctx.args.options || !ctx.args.options.accessToken) {
      return next()
    }
    const RedUser = app.models.RedUser
    RedUser.findById(
      ctx.args.options.accessToken.userId,
      { include: 'redProfile' },
      function (err, user) {
        if (err) return next(err)
        ctx.args.options.currentUser = user.toJSON()
        next()
      }
    )
  })

app.use(
  '/s3',
  require('react-s3-uploader/s3router')({
    bucket: 'redi-connect-profile-avatars',
    region: 'eu-west-1', // optional
    signatureVersion: 'v4', // optional (use for some amazon regions: frankfurt and others)
    headers: { 'Access-Control-Allow-Origin': '*' }, // optional
    ACL: 'public-read', // this is default
    uniquePrefix: true, // (4.0.2 and above) default is true, setting the attribute to false preserves the original filename in S3
  })
)

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname)

app.start = function () {
  const server = (function buildHttpOrHttpsServer() {
    if (process.env.USE_HTTPS) {
      return https.createServer(
        {
          key: sslConfig.privateKey,
          cert: sslConfig.certificate,
        },
        app
      )
    } else {
      return http.createServer(app)
    }
  })()
  server.listen(app.get('port'), function () {
    var baseUrl =
      (process.env.USE_HTTPS ? 'https://' : 'http://') +
      app.get('host') +
      ':' +
      app.get('port')
    app.emit('started', baseUrl)
    console.log('LoopBack server listening @ %s%s', baseUrl, '/')
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath)
    }
  })
  return server
}

// start the server if `$ node server.js`
if (require.main === module) {
  app.start()
}
