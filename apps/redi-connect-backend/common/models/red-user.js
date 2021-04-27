'use strict'

const {
  sendResetPasswordEmail,
  sendVerificationEmail,
  sendMenteeRequestAppointmentEmail,
  sendMentorRequestAppointmentEmail
} = require('../../lib/email/email')

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

  RedUser.afterRemote('confirm', async function (ctx, inst, next) {
    const redUserInst = await RedUser.findById(ctx.args.uid, { include: 'redProfile' })
    const redUser = redUserInst.toJSON()
    
    const userType = redUser.redProfile.userType

    switch(userType) {
      case 'public-sign-up-mentee-pending-review':
        await sendMenteeRequestAppointmentEmail({
          recipient: redUser.email,
          firstName: redUser.redProfile.firstName,
          rediLocation: redUser.redProfile.rediLocation
        }).toPromise()
        return

      case 'public-sign-up-mentor-pending-review':
        await sendMentorRequestAppointmentEmail({
          recipient: redUser.email,
          firstName: redUser.redProfile.firstName,
          rediLocation: redUser.redProfile.rediLocation
        }).toPromise()
        return

      default:
        throw new Error('Invalid user type')
    }
  })
  
  RedUser.requestResetPasswordEmail = function (body, cb) {
    console.log('i am actually working...')
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
