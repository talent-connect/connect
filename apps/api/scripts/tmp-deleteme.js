'use strict'
const app = require('../server/server.js')
const Rx = require('rxjs')
const fs = require('fs')
const { bindNodeCallback, from } = Rx
const jsforce = require('jsforce')
const _ = require('lodash')

const USERNAME = process.env.USERNAME
const PASSWORD = process.env.PASSWORD
const SECURITY_TOKEN = process.env.SECURITY_TOKEN
const LOGIN_URL = 'https://redischool--local.my.salesforce.com'
const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET

const conn = new jsforce.Connection({
  loginUrl: LOGIN_URL,
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
})
;(async () => {
  await conn.login(USERNAME, `${PASSWORD}${SECURITY_TOKEN}`)

  const res = await conn.sobject('Contact').upsert(
    {
      ReDI_Preferred_Pronouns__c: 'test',
      Email: 'aakashgenani@gmail.com',
    },
    'Email'
  )

  console.log(res)
})()
