'use strict'
const app = require('../server/server.js')
const Rx = require('rxjs')
const fs = require('fs')
const { bindNodeCallback, from } = Rx
const jsforce = require('jsforce')
const _ = require('lodash')

const {
  RedUser,
  RedProfile,
  RedMatch,
  RedMentoringSession,
  TpCompanyProfile,
  TpJobListing,
  TpJobseekerProfile,
  TpJobseekerCv,
} = app.models

const {
  scan,
  concatMap,
  take,
  skip,
  map,
  switchMap,
  retry,
  tap,
  throwError,
  filter,
  retryWhen,
  delay,
  mergeMap,
  startWith,
  count,
} = require('rxjs/operators')

const { of } = require('rxjs')

;(async () => {
  const allUsers = await RedUser.find({
    include: [
      'redProfile',
      'tpJobseekerProfile',
      'tpJobseekerCv',
      'tpCompanyProfile',
      'tpJobListings',
    ],
  })
    .map((u) => u.toJSON())
    .filter((u) => u.redProfile || u.tpJobseekerProfile || u.tpCompanyProfile)

  allUsers.forEach((user) => {
    const emails = []
    ;['redProfile', 'tpJobseekerProfile', 'tpCompanyProfile'].forEach((key) => {
      if (user[key] && user[key].contactEmail)
        emails.push(user[key].contactEmail)
    })
    if (emails.length > 1) {
      const areAllEmailsSame = emails.every((e) => e === emails[0])
      console.log(areAllEmailsSame, emails)
    }
  })
})()
