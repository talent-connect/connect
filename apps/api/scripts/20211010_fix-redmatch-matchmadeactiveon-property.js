const _ = require('lodash')
const { DateTime } = require('luxon')
const moment = require('moment')

const app = require('../server/server')

const RedMatch = app.models.RedMatch

async function doStuff() {
  const matches = await RedMatch.find()

  for (const match of matches) {
    console.log(match)
    const p = match.toJSON()
    if (p.matchMadeActiveOn) {
      const corrected = correctDate(p.matchMadeActiveOn)
      const asUtcIso = corrected.toUTC().toISO()
      p.matchMadeActiveOn = asUtcIso
      await RedMatch.replaceById(p.id, p)
    }
  }
}

function correctDate(date) {
  if (date === 'matched 2018') {
    return DateTime.fromISO('2018-01-01')
  } else if (date.length === 10) return DateTime.fromFormat(date, 'dd.LL.y')
  else if (date.length === 62) {
    return DateTime.fromFormat(
      date.replace(' GMT+0000 (Coordinated Universal Time)', ''),
      'ccc LLL dd yyyy TT'
    )
  } else {
    return DateTime.fromISO(date)
  }
}

doStuff()
