const { DateTime } = require('luxon')
const app = require('../server/server.js')
const Rx = require('rxjs')
const { reminderEmailLogger } = require('../lib/logger.js')

const { bindNodeCallback, from, concat, EMPTY } = Rx
const {
  map,
  mapTo,
  switchMap,
  exhaustMap,
  switchMapTo,
  mergeMap,
  tap,
  filter,
} = require('rxjs/operators')

const {
  noMentoringSessionLoggedYet,
  noMentoringSessionLoggedYetSecondReminder,
} = require('./no-mentoring-session-logged-yet')

const {
  mentorshipIsWeeksOldSoRequestFeedback,
} = require('./mentorship-is-weeks-old-so-request-feedback')

const {
  pendingMentorshipApplicationReminder,
} = require('./pending-mentorship-application-reminder.js')

// I'll be triggered once a day by Autocode contacting
// my endpoint.
module.exports = async function sendAllReminderEmails(isDryRun) {
  // menteeNotSentApplicationAfterActivation()

  reminderEmailLogger.info('sendAllReminderEmails called')
  if (isDryRun) {
    reminderEmailLogger.info('[DRY RUN]')
  }

  // TODO: remove me
  const shouldSecondReminderBeSent =
    DateTime.now() >= DateTime.fromISO('2021-11-11')

  concat(
    noMentoringSessionLoggedYet(isDryRun)(),
    shouldSecondReminderBeSent
      ? noMentoringSessionLoggedYetSecondReminder(isDryRun)()
      : EMPTY,
    mentorshipIsWeeksOldSoRequestFeedback(isDryRun)(),
    pendingMentorshipApplicationReminder(isDryRun)()
  ).subscribe(null, null, () =>
    reminderEmailLogger.info('sendAllReminderEmails done')
  )
}

// What triggers me?
// Mentee user has _not_ sent a mentorship application to a mentor within 7 days after activation
async function menteeNotSentApplicationAfterActivation() {
  const { RedProfile, RedMentoringSession } = app.models

  const now = DateTime.now()

  const mentees = await RedProfile.find({
    include: 'matchesForMentee',
    where: { userType: 'mentee', userActivated: true },
  })
    .map((profile) => profile.toJSON())
    .filter((profile) => profile.matchesForMentee.length === 0)
    .filter((profile) => !!profile.userActivatedAt)
    .filter((profile) => {
      const activationDate = DateTime.fromISO(profile.userActivatedAt)
      const diff = now.diff(activationDate, 'days')
      return Math.floor(diff.toObject().days) === 7
    })

  mentees.forEach()
}
