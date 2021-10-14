const { DateTime } = require('luxon')
const app = require('../server/server.js')
const Rx = require('rxjs')
const { reminderEmailLogger } = require('../lib/logger.js')

const { bindNodeCallback, from } = Rx
const {
  map,
  mapTo,
  switchMap,
  mergeMap,
  filter,
  take,
  tap,
} = require('rxjs/operators')

const {
  sendPendingMentorshipApplicationReminderEmailToMentor,
} = require('../lib/email/daily-cronjob-reminder-email')

module.exports = {
  // Find mentorships that are 6 days old and pending
  pendingMentorshipApplicationReminder: function () {
    return redMatchFind({
      where: {
        status: 'applied',
      },
      include: ['mentor', 'mentee'],
    }).pipe(
      switchMap((redMatches) => from(redMatches)),
      map((redMatch) => redMatch.toJSON()),
      filterForExistingMentorOrMentee(),
      filterOnlyXDayOldMatches(6),
      doSendPendingMentorshipApplicationReminderEmailToMentor(),
      tap((redMatch) =>
        reminderEmailLogger.info(
          `pendingMentorshipApplicationReminder: sent email to mentor ${redMatch.mentor.contactEmail} for match #${redMatch.id}`
        )
      )
    )
  },
}

const redMatchFind = (q) =>
  bindNodeCallback(app.models.RedMatch.find.bind(app.models.RedMatch))(q)

function filterOnlyXDayOldMatches(days) {
  return filter((match) => {
    const now = DateTime.now()
    const createdAt = DateTime.fromISO(match.createdAt.toISOString())
    const diff = now.diff(createdAt, 'days')
    return Math.floor(diff.toObject().days) === days
  })
}

function filterForExistingMentorOrMentee() {
  return filter((redMatch) => redMatch.mentor && redMatch.mentee)
}

function doSendPendingMentorshipApplicationReminderEmailToMentor(
  concurrency = 10
) {
  return mergeMap(
    (redMatch) =>
      sendPendingMentorshipApplicationReminderEmailToMentor({
        recipient: redMatch.mentee.contactEmail,
        mentorFirstName: redMatch.mentor.firstName,
        menteeFirstName: redMatch.mentee.firstName,
        menteeLastName: redMatch.mentee.lastName,
        matchRequestedOn: DateTime.fromISO(redMatch.createdAt.toISOString()),
      }).pipe(mapTo(redMatch)),
    concurrency
  )
}
