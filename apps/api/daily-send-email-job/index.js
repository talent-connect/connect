const { profileEnd } = require('console')
const { DateTime } = require('luxon')
const app = require('../server/server.js')

// I'll be triggered once a day by Autocode contacting
// my endpoint.
module.exports = async function sendAllJobs() {
  const { RedProfile } = app.models

  const now = DateTime.now()

  const allMentees = await RedProfile.find({
    include: 'matchesForMentee',
    where: { userType: 'mentee', userActivated: true },
  })
    .map((profile) => profile.toJSON())
    .filter((profile) => profile.matchesForMentee.length === 0)
    .filter((profile) => {
      const activationDate = DateTime.fromISO(profile.userActivatedAt)
    })

  console.log(allMentees)
}
