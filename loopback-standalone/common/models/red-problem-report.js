'use strict'

const {
  sendReportProblemEmail,
  sendMentorCancelledMentorshipNotificationEmail,
  sendToMentorConfirmationOfMentorshipCancelled,
} = require('../../lib/email/email')
const Rx = require('rxjs')
const { tap } = require('rxjs/operators')
const { switchMap } = require('rxjs/operators')

const app = require('../../server/server')

module.exports = function (RedProblemReport) {}
