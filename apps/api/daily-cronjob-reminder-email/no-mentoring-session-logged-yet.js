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
  sendNoMentoringSessionLoggedYetEmailToMentee,
  sendNoMentoringSessionLoggedYetEmailToMentor,
  sendNoMentoringSessionLoggedYetSecondReminderEmailToMentee,
  sendNoMentoringSessionLoggedYetSecondReminderEmailToMentor,
} = require('../lib/email/daily-cronjob-reminder-email')

module.exports = {
  // No sessions logged within 10 days
  noMentoringSessionLoggedYet: function () {
    return redMatchFind({
      where: { status: 'accepted' },
      include: ['mentor', 'mentee'],
    }).pipe(
      switchMap((redMatches) => from(redMatches)),
      map((redMatch) => redMatch.toJSON()),
      filterForExistingMentorOrMentee(),
      filterOnlyXDayOldMatches(10),
      fetchAssignRelatedMentoringSessions(),
      filter((match) => match.mentoringSessions.length === 0),
      doSendNoMentoringSessionLoggedYetEmailToMentee(),
      doSendNoMentoringSessionLoggedYetEmailToMentor(),
      tap((redMatch) =>
        reminderEmailLogger.info(
          `noMentoringSessionLoggedYet: sent email to mentor ${redMatch.mentor.contactEmail} and mentee ${redMatch.mentee.contactEmail} for match #${redMatch.id}`
        )
      )
    )
  },
  // No sessions logged within 30 days
  noMentoringSessionLoggedYetSecondReminder: function () {
    return redMatchFind({
      where: { status: 'accepted' },
      include: ['mentor', 'mentee'],
    }).pipe(
      switchMap((redMatches) => from(redMatches)),
      map((redMatch) => redMatch.toJSON()),
      filterForExistingMentorOrMentee(),
      filterOnlyXDayOldMatches(30),
      fetchAssignRelatedMentoringSessions(),
      filter((match) => match.mentoringSessions.length === 0),
      doSendNoMentoringSessionLoggedYetSecondReminderEmailToMentee(),
      doSendNoMentoringSessionLoggedYetSecondReminderEmailToMentor(),
      tap((redMatch) =>
        reminderEmailLogger.info(
          `noMentoringSessionLoggedYetSecondReminder: sent email to mentor ${redMatch.mentor.contactEmail} and mentee ${redMatch.mentee.contactEmail} for match #${redMatch.id}`
        )
      )
    )
  },
}

const redMatchFind = (q) =>
  bindNodeCallback(app.models.RedMatch.find.bind(app.models.RedMatch))(q)
const redMentoringSessionFind = (q) =>
  bindNodeCallback(
    app.models.RedMentoringSession.find.bind(app.models.RedMentoringSession)
  )(q)

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

function fetchAssignRelatedMentoringSessions(concurrency = 25) {
  return mergeMap(
    (match) =>
      redMentoringSessionFind({
        where: { mentorId: match.mentorId, menteeId: match.menteeId },
      }).pipe(
        map((mentoringSessions) => ({
          ...match,
          mentoringSessions: mentoringSessions.map((m) => m.toJSON()),
        }))
      ),
    concurrency
  )
}

function doSendNoMentoringSessionLoggedYetEmailToMentee(concurrency = 10) {
  return mergeMap(
    (redMatch) =>
      sendNoMentoringSessionLoggedYetEmailToMentee({
        recipient: redMatch.mentee.contactEmail,
        mentorFirstName: redMatch.mentor.firstName,
        menteeFirstName: redMatch.mentee.firstName,
        matchMadeActiveOn: DateTime.fromISO(redMatch.matchMadeActiveOn),
        redMatchId: redMatch.id,
        mentorRediLocation: redMatch.mentor.rediLocation,
      }).pipe(mapTo(redMatch)),
    concurrency
  )
}
function doSendNoMentoringSessionLoggedYetEmailToMentor(concurrency = 10) {
  return mergeMap(
    (redMatch) =>
      sendNoMentoringSessionLoggedYetEmailToMentor({
        recipient: redMatch.mentor.contactEmail,
        mentorFirstName: redMatch.mentor.firstName,
        menteeFirstName: redMatch.mentee.firstName,
        matchMadeActiveOn: DateTime.fromISO(redMatch.matchMadeActiveOn),
        redMatchId: redMatch.id,
        mentorRediLocation: redMatch.mentor.rediLocation,
      }).pipe(mapTo(redMatch)),
    concurrency
  )
}

function doSendNoMentoringSessionLoggedYetSecondReminderEmailToMentee(
  concurrency = 10
) {
  return mergeMap((redMatch) => {
    return sendNoMentoringSessionLoggedYetSecondReminderEmailToMentee({
      recipient: redMatch.mentee.contactEmail,
      mentorFirstName: redMatch.mentor.firstName,
      menteeFirstName: redMatch.mentee.firstName,
      matchMadeActiveOn: DateTime.fromISO(redMatch.matchMadeActiveOn),
      redMatchId: redMatch.id,
      mentorRediLocation: redMatch.mentor.rediLocation,
    }).pipe(mapTo(redMatch))
  }, concurrency)
}
function doSendNoMentoringSessionLoggedYetSecondReminderEmailToMentor(
  concurrency = 10
) {
  return mergeMap(
    (redMatch) =>
      sendNoMentoringSessionLoggedYetSecondReminderEmailToMentor({
        recipient: redMatch.mentor.contactEmail,
        mentorFirstName: redMatch.mentor.firstName,
        menteeFirstName: redMatch.mentee.firstName,
        matchMadeActiveOn: DateTime.fromISO(redMatch.matchMadeActiveOn),
        redMatchId: redMatch.id,
        mentorRediLocation: redMatch.mentor.rediLocation,
      }).pipe(mapTo(redMatch)),
    concurrency
  )
}
