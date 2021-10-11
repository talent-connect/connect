const { DateTime } = require('luxon')
const app = require('../server/server.js')
const Rx = require('rxjs')

const { bindNodeCallback, from } = Rx
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
module.exports = async function sendAllReminderEmails() {
  // menteeNotSentApplicationAfterActivation()

  noMentoringSessionLoggedYet()
    .pipe(
      tap(null, null, () => console.log('1 done')),
      exhaustMap(() => noMentoringSessionLoggedYetSecondReminder()),
      tap(null, null, () => console.log('2 done')),
      exhaustMap(() => mentorshipIsWeeksOldSoRequestFeedback()),
      tap(null, null, () => console.log('3 done')),
      exhaustMap(() => pendingMentorshipApplicationReminder()),
      tap(null, null, () => console.log('4 done'))
    )
    .subscribe(
      (p) => console.log('next'),
      null,
      () => console.log('complete')
    )
  // .pipe(
  //   switchMapTo(noMentoringSessionLoggedYetSecondReminder()),
  //   switchMapTo(mentorshipIsWeeksOldSoRequestFeedback()),
  //   switchMapTo(pendingMentorshipApplicationReminder())
  // )
  // .subscribe()
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
