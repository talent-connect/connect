'use strict'
const fs = require('fs')
const app = require('../server/server.js')
const nodemailer = require('nodemailer')
const Rx = require('rxjs')
const path = require('path')
const mjml2html = require('mjml')
const { bindNodeCallback, from } = Rx
const aws = require('aws-sdk')
const jsforce = require('jsforce')
const _ = require('lodash')
const { ConsoleLogger } = require('@nestjs/common')
const { connect } = require('http2')

const USERNAME = 'eric@redi-school.org.local'
const PASSWORD = 'P;JR2d.KmqzM$~Q,B.hzw6EJ9NU7Q^'
const SECURITY_TOKEN = 'KwGRXbhpAXpH2rv9LpnFDwrs'
const LOGIN_URL = 'https://redischool--local.my.salesforce.com'
const CLIENT_ID =
  '3MVG9r_yMkYxwhkhe93YHPwED2H06d8Z1zYgRHAgkljlSq2x8XtnqpP4GdpS4.GDeqEgOVLfi2E1YNLxk4WaZ'
const CLIENT_SECRET =
  'C41F3552AA09D4F8E375E3854D9C73A5EE769B8476915022FC68436523C6CA9A'

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

const conn = new jsforce.Connection({
  loginUrl: LOGIN_URL,
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
})

const REDPROFILE_SFCONTACT = {}
const REDPROFILE_SFCONNECTPROFILE = {}

const MENTOR = '0129X0000001EXBQA2'
const MENTEE = '0129X0000001EYnQAM'

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

const LANGUAGES = require('./languages')
const { merge } = require('lodash')

function retryWithDelay(delayTime, count = 1) {
  return (input) =>
    input.pipe(
      retryWhen((errors) =>
        errors.pipe(
          scan((acc, error) => ({ count: acc.count + 1, error }), {
            count: 0,
            error: undefined,
          }),
          tap((current) => {
            if (current.count > count) {
              throw current.error
            }
          }),
          delay(delayTime)
        )
      )
    )
}

async function insertContactFn(p) {
  const result = await conn.sobject('Contact').create({
    // AccountId: '0019X000002URWKQA4',
    RecordTypeId: '0121i000000HMq9AAG',
    FirstName: `${p.firstName}`,
    LastName: `${p.lastName}`,
    redi_Contact_Gender__c: p.gender ? p.gender.toUpperCase() : 'OTHER',
    ReDI_Birth_Date__c: p.birthDate,
    LinkedIn_Profile__c: p.linkedInProfileUrl,
    ReDI_GitHub_Profile__c: p.githubProfileUrl,
    ReDI_Slack_Username__c: p.slackUsername,
    MobilePhone: p.telephoneNumber,
    // Name: `${p.firstName} ${p.lastName}`,
  })
  return { ...p, sfContactId: result.id }
}

const DELAY = 2500
const RETRIES = 10

function insertContact(p) {
  return of(p).pipe(
    switchMap((x) => from(insertContactFn(p))),
    retryWithDelay(DELAY, RETRIES)
  )
}
async function insertConnectProfileFn(p) {
  const result = await conn.sobject('ReDI_Connect_Profile__c').create({
    Contact__c: p.sfContactId,
    RecordTypeId: p.userType.indexOf('mentor') !== -1 ? MENTOR : MENTEE,
    Profile_Status__c: redProfileToProfileStatus(p),
    ReDI_Location__c: p.rediLocation,
    Occupation__c: p.mentor_occupation,

    Work_Place__c: p.mentor_workPlace,
    Expectations__c: p.expectations
      ? p.expectations.substr(0, 1000)
      : undefined,
    Occupation_Category__c: p.mentee_occupationCategoryId,
    Place_of_Employment__c: p.mentee_occupationJob_placeOfEmployment,
    Job_Title__c: p.mentee_occupationJob_position,
    Study_Place__c: p.mentee_occupationStudent_studyPlace,
    Study_Name__c: p.mentee_occupationStudent_studyName,
    Desired_Job__c: p.mentee_occupationLookingForJob_what,
    Main_Occupation_Other__c: p.mentee_occupationOther_description,
    Education__c: p.mentee_highestEducationLevel,
    ReDI_Course__c: p.mentee_currentlyEnrolledInCourse || 'alumni',
    Avatar_Image_URL__c: p.profileAvatarImageS3Key,
    Personal_Description__c: p.personalDescription
      ? p.personalDescription.substr(0, 600)
      : undefined,
    Languages__c: p.languages
      ? p.languages.map((langLabel) => LANGUAGES[langLabel]).join(';')
      : undefined,
    Opt_Out_Mentees_From_Other_Locations__c:
      p.optOutOfMenteesFromOtherRediLocation,
    Profile_First_Approved_At__c: p.userActivatedAt,
    // CreatedDate: p.createdAt, //! Use Jonida trick
    // LastModifiedDate: p.updatedAt, //! Use Jonida trick
  })
  return { ...p, sfConnectProfileId: result.id }
}
function insertConnectProfile(p) {
  return of(p).pipe(
    switchMap((x) => from(insertConnectProfileFn(p))),
    retryWithDelay(DELAY, RETRIES)
  )
}

async function insertMentoringSessionFn(p) {
  const result = conn.sobject('Mentoring_Session__c').create({
    Date__c: p.date,
    Mentee__c: REDPROFILE_SFCONTACT[p.menteeId],
    Mentor__c: REDPROFILE_SFCONTACT[p.mentorId],
    Durations_in_Minutes__c: p.minuteDuration,
  })
  return { ...p, sfId: result.id }
}
function insertMentoringSession(p) {
  return of(p).pipe(
    switchMap((x) => from(insertMentoringSessionFn(p))),
    retryWithDelay(DELAY, RETRIES)
  )
}

;(async () => {
  const allUsers = await RedUser.find().map((p) => p.toJSON())
  const allConProfiles = await RedProfile.find().map((p) => p.toJSON())
  const allConMatches = await RedMatch.find().map((p) => p.toJSON())
  const allConMentoringSessions = await RedMentoringSession.find().map((p) =>
    p.toJSON()
  )

  const allTpCompanyProfiles = await TpCompanyProfile.find().map((p) =>
    p.toJSON()
  )
  const allTpJobListings = await TpJobListing.find().map((p) => p.toJSON())
  const allTpJobseekerProfiles = await TpJobseekerProfile.find().map((p) =>
    p.toJSON()
  )
  const allTpJobseekerCvs = await TpJobseekerCv.find().map((p) => p.toJSON())

  console.log('We have:')
  console.log('users', allUsers.length)
  console.log('conProfiles', allConProfiles.length)
  // console.log('conMatches', allConMatches.length)
  console.log('conMentoringSessions', allConMentoringSessions.length)
  // console.log('tpCompanyProfiles', allTpCompanyProfiles.length)
  // console.log('tpJobListings', allTpJobListings.length)
  // console.log('tpJobsekeerProfiles', allTpJobseekerProfiles.length)
  // console.log('tpJobseekerCvs', allTpJobseekerCvs.length)

  const someConProfiles = _.take(allConProfiles, 50)

  await conn.login(USERNAME, `${PASSWORD}${SECURITY_TOKEN}`)

  await from(allConProfiles)
    .pipe(
      filter((p) => p['signup-source'] != 'manual-import-via-script'),
      map((p) => {
        if (
          p.mentee_currentlyEnrolledInCourse === 'munich_frontendDevelopment'
        ) {
          p.mentee_currentlyEnrolledInCourse = 'munich_frontend1'
        }
        return p
      }),
      mergeMap((p) => insertContact(p), 15),
      tap((p) => console.log('Inserted Contact #', p.sfContactId)),
      mergeMap((p) => insertConnectProfile(p), 15),
      tap((p) => console.log('Inserted ConProfile #', p.sfConnectProfileId)),
      tap(({ id, sfContactId, sfConnectProfileId }) => {
        REDPROFILE_SFCONTACT[id] = sfContactId
        REDPROFILE_SFCONNECTPROFILE[id] = sfConnectProfileId
      }),
      scan((acc, curr) => acc + 1, 0),
      tap(console.log)
    )
    .toPromise()

  await from(allConMentoringSessions)
    .pipe(
      mergeMap((p) => insertMentoringSession(p), 15),
      tap((p) => console.log('Inserted Mentoring Session #', p.sfId)),
      scan((acc, curr) => acc + 1, 0),
      tap(console.log)
    )
    .toPromise()
})()

function redProfileToProfileStatus(redProfile) {
  const userType = redProfile.userType
  if (userType.indexOf('pending') !== -1) return 'PENDING'

  if (userType.indexOf('rejected') !== -1) return 'REJECTED'

  if (!redProfile.userActivated) return 'DEACTIVATED'

  return 'APPROVED'
}

/*



const redUserFind = (q) => bindNodeCallback(RedUser.find.bind(RedUser))(q)

redUserFind({ include: 'redProfile' })
  .pipe(
    delay(1000),
    switchMap((users) => from(users)),
    map((data) => {
      const pojo = JSON.parse(JSON.stringify(data))
      return {
        redUser: pojo,
        redProfile: pojo.redProfile,
        redUserInst: data,
        redProfileInst: data.redProfile,
      }
    }),
    filter(({ redProfile }) => !!redProfile),
    filter(({ redProfile }) => redProfile.userType === 'mentor'),
    filter(({ redProfile }) => redProfile.userActivated),

    // take(2),
    // map((data, index) => {
    //   data.redProfile.contactEmail =
    //     index === 0 ? 'miriam@redi-school.org' : 'johanna@redi-school.org'
    //   return data
    // }),
    concatMap(
      (userData) =>
        sendEmail({
          recipient: userData.redProfile.contactEmail,
          firstName: userData.redProfile.firstName,
        }).pipe(delay(500)),

      (userData, sendResult) => ({ ...userData, sendResult })
    ),

    tap((userData) => console.log(userData.redProfile.contactEmail)),
    count()
  )
  .subscribe(
    (count) => console.log('did this ' + count + ' times'),
    (e) => console.log('Error: ', e),
    () => console.log('done')
  )
*/
