'use strict'
const Rx = require('rxjs')
const fs = require('fs')
const { bindNodeCallback, from } = Rx
const jsforce = require('jsforce')
const _ = require('lodash')
const { first } = require('lodash')
const e = require('cors')

const USERNAME = process.env.USERNAME
const PASSWORD = process.env.PASSWORD
const SECURITY_TOKEN = process.env.SECURITY_TOKEN
const LOGIN_URL = process.env.LOGIN_URL
const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET

const conn = new jsforce.Connection({
  loginUrl: LOGIN_URL,
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
})
;(async () => {
  await conn.login(USERNAME, `${PASSWORD}${SECURITY_TOKEN}`)

  const res = await conn.sobject('Account').find({
    ReDI_Talent_Pool_State__c: {
      $in: ['DRAFTING_PROFILE', 'SUBMITTED_FOR_REVIEW', 'PROFILE_APPROVED'],
    },
  })
  console.log(res)
})()
