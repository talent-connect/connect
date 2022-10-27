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

  const result = await conn.sobject('ReDI_Connect_Profile__c').describe()
  const result2 = result.recordTypeInfos.find(
    (recordType) => recordType.name.toLowerCase() === 'MENTEE'.toLowerCase()
  ).recordTypeId

  console.log(result2)

  // const res = await conn.sobject('hed__Language__c').find()

  // res.forEach(async (lang) => {
  //   const updatedLang = {
  //     Id: lang.Id,
  //     Name: lang.Name,
  //     Slug__c: lang.Name,
  //   }

  //   try {
  //     await conn.sobject('hed__Language__c').update(updatedLang)
  //     console.log('did update')
  //   } catch (err) {
  //     console.log(err)
  //   }
  // })

  // console.log(res)

  // var channel = '/event/ReDI_Connect_Profile_Statuc_Change_Event__e'
  // var channel2 = '/event/ReDI_Connect_Profile_Creation_Event__e'
  // var replayId = -1 // -1 = Only New messages | -2 = All Window and New

  // var client = conn.streaming.createClient([
  //   new jsforce.StreamingExtension.Replay(channel, replayId),
  //   new jsforce.StreamingExtension.Replay(channel2, replayId),
  //   new jsforce.StreamingExtension.AuthFailure(function () {
  //     return process.exit(1)
  //   }),
  // ])

  // console.log('Setup done')

  // var subscription = client.subscribe(channel, function (data) {
  //   console.log('received change data', JSON.stringify(data))
  // })
  // var subscription = client.subscribe(channel2, function (data) {
  //   console.log('received creation data', JSON.stringify(data))

  // const res = await conn.sobject('ReDI_Connect_Profile__c').describe()
  // console.log(res)
})()
