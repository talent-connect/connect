const _ = require('lodash')
const moment = require('moment')

const app = require('../server/server')

const RedProfile = app.models.RedProfile

async function doStuff() {
  const allProfiles = await RedProfile.find({ include: 'redUser' })
  allProfiles.forEach(async (profile) => {
    const age = profile.age
    await profile.updateAttribute('age', null)

    if (age) {
      const toDay = moment(new Date())
      const birthDate = moment(
        toDay.format('DD.MM.') + (toDay.year() - age).toString(),
        'DD.MM.YYYY'
      )
      console.log('this RedProfile :')
      console.log(`${profile.firstName} ${profile.lastName}`)
      console.log('birthDate calculated:')
      console.log(`${birthDate} from age ${age}`)
      await profile.updateAttribute('birthDate', birthDate)
    } else {
      await profile.updateAttribute('birthDate', null)
    }
  })
}

doStuff()
