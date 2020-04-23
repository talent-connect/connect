'use strict'

const app = require('../server/server.js')
const Rx = require('rxjs')
const { bindNodeCallback, from } = Rx
const {
  mergeMap,
  switchMap,
  filter,
  map,
  count
} = require('rxjs/operators')

const {
  sendMentorSignupReminderEmail,
  sendMenteeSignupReminderEmail
} = require('../lib/email')

const {
  RedUser
} = app.models

const redUserFind = q => bindNodeCallback(RedUser.find.bind(RedUser))(q)
const ONE_MONTH = 60 * 60 * 24 * 30
const accessTokenCreateOnRedUser = redUserInst =>
  Rx.bindNodeCallback(redUserInst.createAccessToken.bind(redUserInst))(
    ONE_MONTH
  )

redUserFind({ include: 'redProfile' })
  .pipe(
    switchMap(users => from(users)),
    map(data => {
      return {
        redUser: data.toJSON(),
        redProfile: data.toJSON().redProfile,
        redUserInst: data,
        redProfileInst: data.redProfile
      }
    }),
    filter(data => !data.redProfile.userActivated),
    mergeMap(
      data => accessTokenCreateOnRedUser(data.redUserInst),
      (data, accessToken) => ({ ...data, accessToken })
    ),
    mergeMap(
      userData =>
        userData.redProfile.userType === 'mentor'
          ? sendMentorSignupReminderEmail(
            userData.redProfile.contactEmail,
            userData.redProfile.firstName,
            encodeURIComponent(JSON.stringify(userData.accessToken.toJSON()))
          )
          : sendMenteeSignupReminderEmail(
            userData.redProfile.contactEmail,
            userData.redProfile.firstName,
            encodeURIComponent(JSON.stringify(userData.accessToken.toJSON()))
          ),
      (userData, sendResult) => ({ ...userData, sendResult })
    ),
    count()
  )
  .subscribe(
    count => console.log('did this ' + count + ' times'),
    e => console.log('Error: ', e),
    () => console.log('done')
  )

/*
    mergeMap(
      userData => accessTokenCreateOnRedUser(userData.redUserInst),
      (userData, accessToken) => ({ ...userData, accessToken })
    ),
    mergeMap(
      userData =>
        userData.redProfile.userType === 'mentor'
          ? sendDataImportMentorSignupEmail(
              userData.redUser.email,
              userData.redProfile.firstName,
              encodeURIComponent(JSON.stringify(userData.accessToken.toJSON()))
            )
          : sendDataImportMenteeSignupEmail(
              userData.redUser.email,
              userData.redProfile.firstName,
              encodeURIComponent(JSON.stringify(userData.accessToken.toJSON()))
            ),
      (userData, sendResult) => ({ ...userData, sendResult })
    ),
    toArray(),
    */
