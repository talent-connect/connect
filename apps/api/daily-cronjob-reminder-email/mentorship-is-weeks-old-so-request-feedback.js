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
  sendMentorshipIsWeeksOldSoRequestFeedbackEmailToMentor,
  sendMentorshipIsWeeksOldSoRequestFeedbackEmailToMentee,
} = require('../lib/email/daily-cronjob-reminder-email')

module.exports = {
  // Find mentorships that are 6 weeks old (6*7 = 42 days)
  mentorshipIsWeeksOldSoRequestFeedback: (isDryRun) => () => {
    return redMatchFind({
      where: { status: 'accepted' },
      include: ['mentor', 'mentee'],
    }).pipe(
      switchMap((redMatches) => from(redMatches)),
      map((redMatch) => redMatch.toJSON()),
      filterForActiveMentors(),
      filterForExistingMentorOrMentee(),
      filterOnlyXDayOldMatches(6 * 7),
      isDryRun === false
        ? doSendMentorshipIsWeeksOldSoRequestFeedbackEmailToMentor()
        : tap(),
      isDryRun === false
        ? doSendMentorshipIsWeeksOldSoRequestFeedbackEmailToMentee()
        : tap(),
      tap((redMatch) =>
        reminderEmailLogger.info(
          `mentorshipIsWeeksOldSoRequestFeedback: sent email to mentor ${redMatch.mentor.contactEmail} and mentee ${redMatch.mentee.contactEmail} for match #${redMatch.id}`
        )
      )
    )
  },
}

const redMatchFind = (q) =>
  bindNodeCallback(app.models.RedMatch.find.bind(app.models.RedMatch))(q)

function filterForActiveMentors() {
  return filter((redMatch) => redMatch.mentor && redMatch.mentor.userActivated)
}

function filterOnlyXDayOldMatches(days) {
  return filter((match) => {
    const now = DateTime.now()
    const matchMadeActiveOn = DateTime.fromISO(match.matchMadeActiveOn)
    const diff = now.diff(matchMadeActiveOn, 'days')
    return Math.floor(diff.toObject().days) === days
  })
}

function filterForExistingMentorOrMentee() {
  return filter((redMatch) => redMatch.mentor && redMatch.mentee)
}

function doSendMentorshipIsWeeksOldSoRequestFeedbackEmailToMentor(
  concurrency = 10
) {
  return mergeMap(
    (redMatch) =>
      sendMentorshipIsWeeksOldSoRequestFeedbackEmailToMentor({
        recipient: redMatch.mentor.contactEmail,
        mentorFirstName: redMatch.mentor.firstName,
        menteeFirstName: redMatch.mentee.firstName,
        matchMadeActiveOn: DateTime.fromISO(redMatch.matchMadeActiveOn),
      }).pipe(mapTo(redMatch)),
    concurrency
  )
}
function doSendMentorshipIsWeeksOldSoRequestFeedbackEmailToMentee(
  concurrency = 10
) {
  return mergeMap(
    (redMatch) =>
      sendMentorshipIsWeeksOldSoRequestFeedbackEmailToMentee({
        recipient: redMatch.mentee.contactEmail,
        mentorFirstName: redMatch.mentor.firstName,
        menteeFirstName: redMatch.mentee.firstName,
        matchMadeActiveOn: DateTime.fromISO(redMatch.matchMadeActiveOn),
      }).pipe(mapTo(redMatch)),
    concurrency
  )
}
