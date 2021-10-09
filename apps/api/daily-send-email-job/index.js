const { DateTime } = require('luxon')
const app = require('../server/server.js')
const Rx = require('rxjs')

const { bindNodeCallback, from } = Rx
const {
  map,
  mapTo,
  switchMap,
  mergeMap,
  tap,
  filter,
} = require('rxjs/operators')

const {
  noMentoringSessionLoggedYet,
  noMentoringSessionLoggedYetSecondReminder,
} = require('./no-mentoring-session-logged-yet')

// I'll be triggered once a day by Autocode contacting
// my endpoint.
module.exports = async function sendAllJobs() {
  // menteeNotSentApplicationAfterActivation()

  // noMentoringSessionLoggedYet().subscribe()
  noMentoringSessionLoggedYetSecondReminder().subscribe()
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
