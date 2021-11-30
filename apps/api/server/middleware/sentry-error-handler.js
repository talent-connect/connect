const app = require('../server.js')

const Raven = require('raven')

const Sentry = require('@sentry/node')
const Tracing = require('@sentry/tracing')

module.exports = function () {
  Raven.config(process.env.SENTRY_DSN_KEY).install()

  Sentry.init({
    dsn: process.env.SENTRY_DSN_KEY,
    integrations: [
      // enable HTTP calls tracing
      new Sentry.Integrations.Http({ tracing: true }),
      // enable Express.js middleware tracing
      new Tracing.Integrations.Express({ app }),
    ],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  })

  app.use(Sentry.Handlers.requestHandler())
  app.use(Sentry.Handlers.tracingHandler())

  return function logError(err, req, res, next) {
    next()
  }
}
