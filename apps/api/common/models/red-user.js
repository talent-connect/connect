'use strict'

const {
  sendResetPasswordEmail,
  sendVerificationEmail,
  sendMenteeRequestAppointmentEmail,
  sendMentorRequestAppointmentEmail,
} = require('../../lib/email/email')

const {
  sendTpJobseekerEmailVerificationSuccessfulEmail,
} = require('../../lib/email/tp-email')

module.exports = function (RedUser) {
  RedUser.observe('before save', function updateTimestamp(ctx, next) {
    if (ctx.instance) {
      if (ctx.isNewInstance) ctx.instance.createdAt = new Date()
      ctx.instance.updatedAt = new Date()
    } else {
      ctx.data.updatedAt = new Date()
    }
    next()
  })

  RedUser.afterRemote('confirm', async function (ctx, inst, next) {
    const redUserInst = await RedUser.findById(ctx.args.uid, {
      include: ['redProfile', 'tpJobseekerProfile'],
    })
    const redUser = redUserInst.toJSON()

    const userSignedUpWithCon = !!redUser.redProfile
    const userSignedUpWithTp = !!redUser.tpJobseekerProfile

    if (userSignedUpWithCon) {
      const userType = redUser.redProfile.userType

      switch (userType) {
        case 'public-sign-up-mentee-pending-review':
          await sendMenteeRequestAppointmentEmail({
            recipient: redUser.email,
            firstName: redUser.redProfile.firstName,
            rediLocation: redUser.redProfile.rediLocation,
          }).toPromise()
          return

        case 'public-sign-up-mentor-pending-review':
          await sendMentorRequestAppointmentEmail({
            recipient: redUser.email,
            firstName: redUser.redProfile.firstName,
            rediLocation: redUser.redProfile.rediLocation,
          }).toPromise()
          return

        default:
          throw new Error('Invalid user type')
      }
    }

    if (userSignedUpWithTp) {
      await sendTpJobseekerEmailVerificationSuccessfulEmail({
        recipient: redUser.email,
        firstName: redUser.tpJobseekerProfile.firstName,
      }).toPromise()
    }
  })

  RedUser.requestResetPasswordEmail = function (body, cb) {
    console.log('i am actually working...')
    const email = body.email
    RedUser.resetPassword(
      {
        email: email,
      },
      function (err) {
        if (err) return cb(err)
        cb(null)
      }
    )
  }

  RedUser.remoteMethod('requestResetPasswordEmail', {
    accepts: { arg: 'data', type: 'object', http: { source: 'body' } },
    returns: { arg: 'resp', type: 'object', root: true },
  })

  RedUser.on('resetPasswordRequest', function (info) {
    const accessToken = encodeURIComponent(JSON.stringify(info.accessToken))
    const email = info.user.email
    info.user.redProfile(function getRedProfile(err, redProfileInst) {
      const { rediLocation, firstName } = redProfileInst.toJSON()
      sendResetPasswordEmail({
        recipient: email,
        firstName,
        accessToken,
        rediLocation,
      }).subscribe()
    })
  })

  /******************
   * Special post-login hook built for Talent Pool built on 6 June 2021.
   *
   * We'll have many users signing up for TP who've been using CON for a while. We can
   * determine what products a RedUser has signed up to by checking for existence of:
   * - RedProfile (means they've signed up for CON)
   * - TpJobseekerProfile (means they've signed up for TP jobseeker)
   *
   * This hook is designed to work like this:
   * - Identify whether the logging-in RedUser is a CON user but not a TP user. Otherwise, proceed
   * - Load their RedProfile
   * - Create a TpJobseekerProfile by copying some info over
   */
  RedUser.afterRemote('login', async function (ctx, loginOutput, next) {
    const redProduct = ctx.req.headers.redproduct // either CON or TP
    if (redProduct !== 'TP') return next()

    const redUserId = ctx.result.toJSON().userId.toString()
    const redUserInst = await RedUser.findById(redUserId, {
      include: ['redProfile', 'tpJobseekerProfile'],
    })
    const redUser = redUserInst.toJSON()

    if (redUser.tpJobseekerProfile) return next()
    if (!redUser.redProfile) return next()

    const redProfile = redUser.redProfile

    const tpJobseekerProfile = {
      firstName: redProfile.firstName,
      lastName: redProfile.lastName,
      contactEmail: redProfile.contactEmail,
      currentlyEnrolledInCourse: redProfile.mentee_currentlyEnrolledInCourse,
      state: 'drafting-profile',
      gaveGdprConsentAt: redProfile.gaveGdprConsentAt,
    }

    const res = await redUserInst.tpJobseekerProfile.create(tpJobseekerProfile)

    return next()
  })
}
