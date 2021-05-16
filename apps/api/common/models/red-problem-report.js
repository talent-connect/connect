'use strict'

const {
  sendReportProblemEmail,
  sendMentorCancelledMentorshipNotificationEmail,
  sendToMentorConfirmationOfMentorshipCancelled
} = require('../../lib/email/email')
const Rx = require('rxjs')
const { tap } = require('rxjs/operators')
const { switchMap } = require('rxjs/operators')

const app = require('../../server/server')

module.exports = function (RedProblemReport) {
  RedProblemReport.observe('before save', function updateTimestamp (ctx, next) {
    if (ctx.instance) {
      if (ctx.isNewInstance) ctx.instance.createdAt = new Date()
      ctx.instance.updatedAt = new Date()
    } else {
      ctx.data.updatedAt = new Date()
    }
    next()
  })
  RedProblemReport.observe('before save', function sendEmailReport (ctx, next) {
    if (ctx.instance) {
      // TODO: validate that the mentee is actually a mentee of the mentor
      if (ctx.instance.ifFromMentor_cancelMentorshipImmediately) {
        const RedProfile = app.models.RedProfile
        const RedMatch = app.models.RedMatch
        const findOneRedMatch = filter =>
          Rx.bindNodeCallback(RedMatch.findOne.bind(RedMatch))(filter)
        const findRedProfileById = id =>
          Rx.bindNodeCallback(RedProfile.findById.bind(RedProfile))(id)
        Rx.zip(
          findOneRedMatch({
            where: {
              mentorId: ctx.options.currentUser.redProfile.id,
              menteeId: ctx.instance.reporteeId
            }
          }),
          findRedProfileById(ctx.instance.reporteeId)
        )

          .pipe(
            switchMap(([redMatchInst, menteeProfile]) =>
              Rx.of({
                redMatchInst,
                menteeProfile
              })
            ),
            tap(({ menteeProfile }) => {
              sendMentorCancelledMentorshipNotificationEmail({
                recipient: menteeProfile.contactEmail,
                firstName: menteeProfile.firstName,
                rediLocation: ctx.options.currentUser.redProfile.rediLocation
              })
                .pipe(
                  switchMap(() =>
                    sendToMentorConfirmationOfMentorshipCancelled({
                      recipient: ctx.options.currentUser.redProfile.contactEmail,
                      mentorFirstName: ctx.options.currentUser.redProfile.firstName,
                      menteeFullName: `${menteeProfile.firstName} ${menteeProfile.lastName}`,
                      rediLocation: ctx.options.currentUser.redProfile.rediLocation
                    })
                  )
                )
                .subscribe()
            }),
            switchMap(({ redMatchInst }) =>
              Rx.bindNodeCallback(
                redMatchInst.updateAttributes.bind(redMatchInst)
              )({ status: 'cancelled', rediLocation: ctx.options.currentUser.redProfile.id })
            )
          )
          .subscribe(
            redMatchInst => null,
            err => {
              console.log('Error occured: ' + err)
            }
          )
      }
      sendReportProblemEmail({
        sendingUserEmail: ctx.options.currentUser.email,
        message: ctx.instance.problemDescription
      }).subscribe(null, err => console.log('Sending email error: ', err))
      ctx.instance.redProfileId = ctx.options.currentUser.redProfile.id
      ctx.instance.createdAt = new Date()
    }
    next()
  })
}
