'use strict'
const Rx = require('rxjs')
const fs = require('fs')
const { bindNodeCallback, from } = Rx
const jsforce = require('jsforce')
const _ = require('lodash')
const { first } = require('lodash')

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

  // const res = await conn
  //   .sobject('ReDI_Connect_Profile__c')
  //   .select('*, Contact__r.*')
  //   .include('Mentoring_Sessions_Mentee__r')
  //   .select('*')
  //   .end()
  // // .find({ Id: 'a2F9X0000000mrKUAQ' })
  // // .include('Contact')
  // // .select('*')
  // // .end()

  // const firstRes = res[0]
  // console.log(firstRes)

  const res = await conn
    .sobject('Contact')
    .find({})
    .include('ReDI_Connect_Profiles__r')
    .select('*')
    .end()
    .include('Mentoring_Sessions_Mentee__r')
    .select('*')
    .end()
    .include('Mentoring_Sessions__r')
    .select('*')
    .end()
    .execute({ autoFetch: true, maxFetch: 10000 })

  console.log(res[0])

  // const res2 = await conn
  //   .sobject('Contact')
  //   .find({ Id: '0039X0000007yirQAA' })
  //   .include('Mentoring_Sessions__r')
  //   .select('*')
  //   .end()

  // console.log(res2[0])
  console.log()
})()
