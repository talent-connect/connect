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

  var channel = '/event/ReDI_Connect_Profile_Statuc_Change_Event__e'
  var replayId = 8 // -1 = Only New messages | -2 = All Window and New

  var client = conn.streaming.createClient([
    new jsforce.StreamingExtension.Replay(channel, replayId),
    new jsforce.StreamingExtension.AuthFailure(function () {
      return process.exit(1)
    }),
  ])

  var subscription = client.subscribe(channel, function (data) {
    console.log('received data', JSON.stringify(data))
  })
})()
