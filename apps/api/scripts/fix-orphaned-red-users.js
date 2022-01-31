const Rx = require('rxjs')
const _ = require('lodash')

const app = require('../server/server')

const { RedProfile, RedUser } = app.models

;(async () => {
  const allUsers = await RedUser.find({
    include: ['redProfile', 'tpJobSeekerProfile', 'tpCompanyProfile'],
  })

  // Find orphaned RedUsers
  const usersWithoutProfile = allUsers.filter((u) => {
    const user = u.toJSON()
    const hasProfile =
      Boolean(user.redProfile) ||
      Boolean(user.tpJobSeekerProfile) ||
      Boolean(user.tpCompanyProfile)
    return !hasProfile
  })
  await usersWithoutProfile.forEach(async (user) => {
    const userData = user.toJSON()
    const id = userData.id.toString()
    const status =
      `redProfile? ${userData.redProfile ? '✅' : '❌'}` +
      `\ntpJobseekerProfile? ${userData.tpJobSeekerProfile ? '✅' : '❌'}` +
      `\ntpCompanyProfile? ${userData.tpCompanyProfile ? '✅' : '❌'}`
    console.log(
      `Deleting orphaned RedUser #${id} with email ${userData.email}. ${status}`
    )
  })

  console.log(usersWithoutProfile.length)
  console.log(allUsers.length)
})()
