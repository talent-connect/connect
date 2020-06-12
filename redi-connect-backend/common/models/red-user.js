'use strict'

const { sendResetPasswordEmail, sendVerificationEmail } = require('../../lib/email/email')

module.exports = function (RedUser) {
  RedUser.observe('before save', function updateTimestamp (ctx, next) {
    if (ctx.instance) {
      if (ctx.isNewInstance) ctx.instance.createdAt = new Date()
      ctx.instance.updatedAt = new Date()
    } else {
      ctx.data.updatedAt = new Date()
    }
    next()
  })

  RedUser.requestResetPasswordEmail = function (body, cb) {
    const email = body.email
    RedUser.resetPassword(
      {
        email: email
      },
      function (err) {
        if (err) return cb(err)
        cb(null)
      }
    )
  }

  RedUser.remoteMethod('requestResetPasswordEmail', {
    accepts: { arg: 'data', type: 'object', http: { source: 'body' } },
    returns: { arg: 'resp', type: 'object', root: true }
  })

  RedUser.on('resetPasswordRequest', function (info) {
    const accessToken = encodeURIComponent(JSON.stringify(info.accessToken))
    const email = info.user.email
    info.user.redProfile(function getRedProfile (err, redProfileInst) {
      const { rediLocation, firstName } = redProfileInst.toJSON()
      sendResetPasswordEmail({
        recipient: email,
        firstName,
        accessToken,
        rediLocation
      }).subscribe()
    })
  })
}
