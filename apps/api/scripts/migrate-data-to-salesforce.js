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
const LOGIN_URL = process.env.LOGIN_URL
const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET

//? BEFORE MIGRATE:
/**
 * 1. Check that the Audit fields permissions are active (see Jonida email)
 */

console.log('USERNAME', USERNAME)
console.log('PASSWORD', PASSWORD)
console.log('SECURITY_TOKEN', SECURITY_TOKEN)
console.log('LOGIN_URL', LOGIN_URL)
console.log('CLIENT_ID', CLIENT_ID)
console.log('CLIENT_SECRET', CLIENT_SECRET)

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

const REDUSER_SFCONTACT = {}
const REDPROFILE_SFCONTACT = {}
const REDPROFILE_SFREDICONNECTPROFILE = {}
const TPCOMPANYPROFILE_SFACCOUNT = {}
const TPJOBSEEKERPROFILE_SFJOBSEEKERPROFILE = {}
const TPJOBLISTING_SFJOBLISTING = {}

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
  catchError,
  delay,
  mergeMap,
  startWith,
  count,
} = require('rxjs/operators')

const { of, EMPTY } = require('rxjs')

const LANGUAGES = require('./languages')
const { lang } = require('moment')

const DELAY = 2000
const RETRIES = 3
const CONCURRENCY = 75 // 50 generally works, with only a few (< 10) errors. For actual data migration, use a low value, such as 15.

// const LOCAL_CONTACT_RECORD_TYPE = '0121i000000HMq9AAG'
// const LOCAL_CONNECT_PROFILE_MENTOR_RECORD_TYPE = '0129X0000001EXBQA2'
// const LOCAL_CONNECT_PROFILE_MENTEE_RECORD_TYPE = '0129X0000001EYnQAM'
// const LOCAL_ACCOUNT_RECORD_TYPE_BUSINESS_ORGANIZATION = '0121i0000000LvUAAU'
// const LOCAL_CV_LINE_ITEM_RECORD_TYPE_EXPERIENCE = '0129X0000001RXdQAM'
// const LOCAL_CV_LINE_ITEM_RECORD_TYPE_EDUCATION = '0129X0000001RW1QAM'
// const LOCAL_JOBSEEKER_PROFILE_LINE_ITEM_RECORD_TYPE_EXPERIENCE = '0129X0000001RUPQA2'
// const LOCAL_JOBSEEKER_PROFILE_LINE_ITEM_RECORD_TYPE_EDUCATION = '0129X0000001RSnQAM'

//? BEFORE MIGRATE: CHECK ALL THESE CONSTANTS
const PARTIALSBX_CONTACT_RECORD_TYPE = '0121i000000HMq9AAG'
const PARTIALSBX_CONNECT_PROFILE_MENTOR_RECORD_TYPE = '0129W0000004HiqQAE'
const PARTIALSBX_CONNECT_PROFILE_MENTEE_RECORD_TYPE = '0129W0000004HipQAE'
const PARTIALSBX_ACCOUNT_RECORD_TYPE_BUSINESS_ORGANIZATION =
  '0121i0000000LvUAAU'
const PARTIALSBX_CV_LINE_ITEM_RECORD_TYPE_EXPERIENCE = '0129W0000004HimQAE'
const PARTIALSBX_CV_LINE_ITEM_RECORD_TYPE_EDUCATION = '0129W0000004HilQAE'
const PARTIALSBX_JOBSEEKER_PROFILE_LINE_ITEM_RECORD_TYPE_EXPERIENCE =
  '0129W0000004HioQAE'
const PARTIALSBX_JOBSEEKER_PROFILE_LINE_ITEM_RECORD_TYPE_EDUCATION =
  '0129W0000004HinQAE'

/* LOCAL SANDBOX */
// const LANGUAGE_TO_ID_MAP = {
//   Afrikaans: 'a0B9X0000004BPtUAM',
//   Albanian: 'a0B9X0000004BPuUAM',
//   Amharic: 'a0B9X0000004BPvUAM',
//   Arabic: 'a0B9X0000004BPwUAM',
//   Aramaic: 'a0B9X0000004BPxUAM',
//   Armenian: 'a0B9X0000004BPyUAM',
//   Assamese: 'a0B9X0000004BPzUAM',
//   Aymara: 'a0B9X0000004BQ0UAM',
//   Azerbaijani: 'a0B9X0000004BQ1UAM',
//   Balochi: 'a0B9X0000004BQ2UAM',
//   Bamanankan: 'a0B9X0000004BQ3UAM',
//   'Bashkort (Bashkir)': 'a0B9X0000004BQ4UAM',
//   Basque: 'a0B9X0000004BQ5UAM',
//   Belarusan: 'a0B9X0000004BQ6UAM',
//   Bengali: 'a0B9X0000004BQ7UAM',
//   Bhojpuri: 'a0B9X0000004BQ8UAM',
//   Bislama: 'a0B9X0000004BQ9UAM',
//   Bosnian: 'a0B9X0000004BQAUA2',
//   Brahui: 'a0B9X0000004BQBUA2',
//   Bulgarian: 'a0B9X0000004BQCUA2',
//   Burmese: 'a0B9X0000004BQDUA2',
//   Cantonese: 'a0B9X0000004BQEUA2',
//   Catalan: 'a0B9X0000004BQFUA2',
//   Cebuano: 'a0B9X0000004BQGUA2',
//   Chechen: 'a0B9X0000004BQHUA2',
//   Cherokee: 'a0B9X0000004BQIUA2',
//   Croatian: 'a0B9X0000004BQJUA2',
//   Czech: 'a0B9X0000004BQKUA2',
//   Dakota: 'a0B9X0000004BQLUA2',
//   Danish: 'a0B9X0000004BQMUA2',
//   Dari: 'a0B9X0000004BQNUA2',
//   Dholuo: 'a0B9X0000004BQOUA2',
//   Dutch: 'a0B9X0000004BQPUA2',
//   English: 'a0B9X0000004BQQUA2',
//   Esperanto: 'a0B9X0000004BQRUA2',
//   Estonian: 'a0B9X0000004BQSUA2',
//   Finnish: 'a0B9X0000004BQUUA2',
//   French: 'a0B9X0000004BQVUA2',
//   Georgian: 'a0B9X0000004BQWUA2',
//   German: 'a0B9X0000004BQXUA2',
//   Gikuyu: 'a0B9X0000004BQYUA2',
//   Greek: 'a0B9X0000004BQZUA2',
//   Guarani: 'a0B9X0000004BQaUAM',
//   Gujarati: 'a0B9X0000004BQbUAM',
//   'Haitian Creole': 'a0B9X0000004BQcUAM',
//   Hausa: 'a0B9X0000004BQdUAM',
//   Hawaiian: 'a0B9X0000004BQeUAM',
//   'Hawaiian Creole': 'a0B9X0000004BQfUAM',
//   Hebrew: 'a0B9X0000004BQgUAM',
//   Hiligaynon: 'a0B9X0000004BQhUAM',
//   Hindi: 'a0B9X0000004BQiUAM',
//   Hungarian: 'a0B9X0000004BQjUAM',
//   Icelandic: 'a0B9X0000004BQkUAM',
//   Igbo: 'a0B9X0000004BQlUAM',
//   Ilocano: 'a0B9X0000004BQmUAM',
//   'Indonesian (Bahasa Indonesia)': 'a0B9X0000004BQnUAM',
//   'Inuit/Inupiaq': 'a0B9X0000004BQoUAM',
//   'Irish Gaelic': 'a0B9X0000004BQpUAM',
//   Italian: 'a0B9X0000004BQqUAM',
//   Japanese: 'a0B9X0000004BQrUAM',
//   Jarai: 'a0B9X0000004BQsUAM',
//   Javanese: 'a0B9X0000004BQtUAM',
//   'Kâicheâ': 'a0B9X0000004BQuUAM',
//   Kabyle: 'a0B9X0000004BQvUAM',
//   Kannada: 'a0B9X0000004BQwUAM',
//   Kashmiri: 'a0B9X0000004BQxUAM',
//   Kazakh: 'a0B9X0000004BQyUAM',
//   Khmer: 'a0B9X0000004BQzUAM',
//   Khoekhoe: 'a0B9X0000004BR0UAM',
//   Korean: 'a0B9X0000004BR1UAM',
//   Kurdish: 'a0B9X0000004BR2UAM',
//   Kyrgyz: 'a0B9X0000004BR3UAM',
//   Lao: 'a0B9X0000004BR4UAM',
//   Latin: 'a0B9X0000004BR5UAM',
//   Latvian: 'a0B9X0000004BR6UAM',
//   Lingala: 'a0B9X0000004BR7UAM',
//   Lithuanian: 'a0B9X0000004BR8UAM',
//   Macedonian: 'a0B9X0000004BR9UAM',
//   Maithili: 'a0B9X0000004BRAUA2',
//   Malagasy: 'a0B9X0000004BRBUA2',
//   'Malay (Bahasa Melayu)': 'a0B9X0000004BRCUA2',
//   Malayalam: 'a0B9X0000004BRDUA2',
//   'Mandarin (Chinese)': 'a0B9X0000004BREUA2',
//   Marathi: 'a0B9X0000004BRFUA2',
//   Mende: 'a0B9X0000004BRGUA2',
//   Mongolian: 'a0B9X0000004BRHUA2',
//   Nahuatl: 'a0B9X0000004BRIUA2',
//   Navajo: 'a0B9X0000004BRJUA2',
//   Nepali: 'a0B9X0000004BRKUA2',
//   Norwegian: 'a0B9X0000004BRLUA2',
//   Ojibwa: 'a0B9X0000004BRMUA2',
//   Oriya: 'a0B9X0000004BRNUA2',
//   Oromo: 'a0B9X0000004BROUA2',
//   Pashto: 'a0B9X0000004BRPUA2',
//   Persian: 'a0B9X0000004BRQUA2',
//   Polish: 'a0B9X0000004BRRUA2',
//   Portuguese: 'a0B9X0000004BRSUA2',
//   Punjabi: 'a0B9X0000004BRTUA2',
//   Quechua: 'a0B9X0000004BRUUA2',
//   Romani: 'a0B9X0000004BRVUA2',
//   Romanian: 'a0B9X0000004BRWUA2',
//   Russian: 'a0B9X0000004BRXUA2',
//   Rwanda: 'a0B9X0000004BRYUA2',
//   Samoan: 'a0B9X0000004BRZUA2',
//   Sanskrit: 'a0B9X0000004BRaUAM',
//   Serbian: 'a0B9X0000004BRbUAM',
//   Shona: 'a0B9X0000004BRcUAM',
//   Sindhi: 'a0B9X0000004BRdUAM',
//   Sinhala: 'a0B9X0000004BReUAM',
//   Slovak: 'a0B9X0000004BRfUAM',
//   Slovene: 'a0B9X0000004BRgUAM',
//   Somali: 'a0B9X0000004BRhUAM',
//   Spanish: 'a0B9X0000004BRiUAM',
//   Swahili: 'a0B9X0000004BRjUAM',
//   Swedish: 'a0B9X0000004BRkUAM',
//   Tachelhit: 'a0B9X0000004BRlUAM',
//   Tagalog: 'a0B9X0000004BRmUAM',
//   Tajiki: 'a0B9X0000004BRnUAM',
//   Tamil: 'a0B9X0000004BRoUAM',
//   Tatar: 'a0B9X0000004BRpUAM',
//   Telugu: 'a0B9X0000004BRqUAM',
//   Thai: 'a0B9X0000004BRrUAM',
//   'Tibetic languages': 'a0B9X0000004BRsUAM',
//   Tigrigna: 'a0B9X0000004BRtUAM',
//   'Tok Pisin': 'a0B9X0000004BRuUAM',
//   Turkish: 'a0B9X0000004BRvUAM',
//   Turkmen: 'a0B9X0000004BRwUAM',
//   Ukrainian: 'a0B9X0000004BRxUAM',
//   Urdu: 'a0B9X0000004BRyUAM',
//   Uyghur: 'a0B9X0000004BRzUAM',
//   Uzbek: 'a0B9X0000004BS0UAM',
//   Vietnamese: 'a0B9X0000004BS1UAM',
//   Warlpiri: 'a0B9X0000004BS2UAM',
//   Welsh: 'a0B9X0000004BS3UAM',
//   Wolof: 'a0B9X0000004BS4UAM',
//   Xhosa: 'a0B9X0000004BS5UAM',
//   Yakut: 'a0B9X0000004BS6UAM',
//   Yiddish: 'a0B9X0000004BS7UAM',
//   Yoruba: 'a0B9X0000004BS8UAM',
//   Yucatec: 'a0B9X0000004BS9UAM',
//   Zapotec: 'a0B9X0000004BSAUA2',
//   Zulu: 'a0B9X0000004BSBUA2',
// }

//? BEFORE MIGRATE: run a "Languages" report in SF. Ensure filters set to show ALL 142 languages.
const PARTIALSBX_LANGUAGE_TO_ID_MAP = {
  Afrikaans: 'a0B9W000000CQr7',
  Albanian: 'a0B9W000000CQr8',
  Amharic: 'a0B9W000000CQr9',
  Arabic: 'a0B9W000000CQrA',
  Aramaic: 'a0B9W000000CQrB',
  Armenian: 'a0B9W000000CQrC',
  Assamese: 'a0B9W000000CQrD',
  Aymara: 'a0B9W000000CQrE',
  Azerbaijani: 'a0B9W000000CQrF',
  Balochi: 'a0B9W000000CQrG',
  Bamanankan: 'a0B9W000000CQrH',
  'Bashkort (Bashkir)': 'a0B9W000000CQrI',
  Basque: 'a0B9W000000CQrJ',
  Belarusan: 'a0B9W000000CQrK',
  Bengali: 'a0B9W000000CQrL',
  Bhojpuri: 'a0B9W000000CQrM',
  Bislama: 'a0B9W000000CQrN',
  Bosnian: 'a0B9W000000CQrO',
  Brahui: 'a0B9W000000CQrP',
  Bulgarian: 'a0B9W000000CQrQ',
  Burmese: 'a0B9W000000CQrR',
  Cantonese: 'a0B9W000000CQrS',
  Catalan: 'a0B9W000000CQrT',
  Cebuano: 'a0B9W000000CQrU',
  Chechen: 'a0B9W000000CQrV',
  Cherokee: 'a0B9W000000CQrW',
  Croatian: 'a0B9W000000CQrX',
  Czech: 'a0B9W000000CQrY',
  Dakota: 'a0B9W000000CQrZ',
  Danish: 'a0B9W000000CQra',
  Dari: 'a0B9W000000CQrb',
  Dholuo: 'a0B9W000000CQrc',
  Dutch: 'a0B9W000000CQrd',
  English: 'a0B9W000000CQre',
  Esperanto: 'a0B9W000000CQrf',
  Estonian: 'a0B9W000000CQrg',
  Finnish: 'a0B9W000000CQri',
  French: 'a0B9W000000CQrj',
  Georgian: 'a0B9W000000CQrk',
  German: 'a0B1i000001KVpG',
  Gikuyu: 'a0B9W000000CQrl',
  Greek: 'a0B9W000000CQrm',
  Guarani: 'a0B9W000000CQrn',
  Gujarati: 'a0B9W000000CQro',
  'Haitian Creole': 'a0B9W000000CQrp',
  Hausa: 'a0B9W000000CQrq',
  Hawaiian: 'a0B9W000000CQrr',
  'Hawaiian Creole': 'a0B9W000000CQrs',
  Hebrew: 'a0B9W000000CQrt',
  Hiligaynon: 'a0B9W000000CQru',
  Hindi: 'a0B9W000000CQrv',
  Hungarian: 'a0B9W000000CQrw',
  Icelandic: 'a0B9W000000CQrx',
  Igbo: 'a0B9W000000CQry',
  Ilocano: 'a0B9W000000CQrz',
  'Indonesian (Bahasa Indonesia)': 'a0B9W000000CQs0',
  'Inuit/Inupiaq': 'a0B9W000000CQs1',
  'Irish Gaelic': 'a0B9W000000CQs2',
  Italian: 'a0B9W000000CQs3',
  Japanese: 'a0B9W000000CQs4',
  Jarai: 'a0B9W000000CQs5',
  Javanese: 'a0B9W000000CQs6',
  'Kâicheâ': 'a0B9W000000CQs7',
  Kabyle: 'a0B9W000000CQs8',
  Kannada: 'a0B9W000000CQs9',
  Kashmiri: 'a0B9W000000CQsA',
  Kazakh: 'a0B9W000000CQsB',
  Khmer: 'a0B9W000000CQsC',
  Khoekhoe: 'a0B9W000000CQsD',
  Korean: 'a0B9W000000CQsE',
  Kurdish: 'a0B9W000000CQsF',
  Kyrgyz: 'a0B9W000000CQsG',
  Lao: 'a0B9W000000CQsH',
  Latin: 'a0B9W000000CQsI',
  Latvian: 'a0B9W000000CQsJ',
  Lingala: 'a0B9W000000CQsK',
  Lithuanian: 'a0B9W000000CQsL',
  Macedonian: 'a0B9W000000CQsM',
  Maithili: 'a0B9W000000CQsN',
  Malagasy: 'a0B9W000000CQsO',
  'Malay (Bahasa Melayu)': 'a0B9W000000CQsP',
  Malayalam: 'a0B9W000000CQsQ',
  'Mandarin (Chinese)': 'a0B9W000000CQsR',
  Marathi: 'a0B9W000000CQsS',
  Mende: 'a0B9W000000CQsT',
  Mongolian: 'a0B9W000000CQsU',
  Nahuatl: 'a0B9W000000CQsV',
  Navajo: 'a0B9W000000CQsW',
  Nepali: 'a0B9W000000CQsX',
  Norwegian: 'a0B9W000000CQsY',
  Ojibwa: 'a0B9W000000CQsZ',
  Oriya: 'a0B9W000000CQsa',
  Oromo: 'a0B9W000000CQsb',
  Pashto: 'a0B9W000000CQsc',
  Persian: 'a0B9W000000CQsd',
  Polish: 'a0B9W000000CQse',
  Portuguese: 'a0B9W000000CQsf',
  Punjabi: 'a0B9W000000CQsg',
  Quechua: 'a0B9W000000CQsh',
  Romani: 'a0B9W000000CQsi',
  Romanian: 'a0B9W000000CQsj',
  Russian: 'a0B9W000000CQsk',
  Rwanda: 'a0B9W000000CQsl',
  Samoan: 'a0B9W000000CQsm',
  Sanskrit: 'a0B9W000000CQsn',
  Serbian: 'a0B9W000000CQso',
  Shona: 'a0B9W000000CQsp',
  Sindhi: 'a0B9W000000CQsq',
  Sinhala: 'a0B9W000000CQsr',
  Slovak: 'a0B9W000000CQss',
  Slovene: 'a0B9W000000CQst',
  Somali: 'a0B9W000000CQsu',
  Spanish: 'a0B9W000000CQsv',
  Swahili: 'a0B9W000000CQsw',
  Swedish: 'a0B9W000000CQsx',
  Tachelhit: 'a0B9W000000CQsy',
  Tagalog: 'a0B9W000000CQsz',
  Tajiki: 'a0B9W000000CQt0',
  Tamil: 'a0B9W000000CQt1',
  Tatar: 'a0B9W000000CQt2',
  Telugu: 'a0B9W000000CQt3',
  Thai: 'a0B9W000000CQt4',
  'Tibetic languages': 'a0B9W000000CQt5',
  Tigrigna: 'a0B9W000000CQt6',
  'Tok Pisin': 'a0B9W000000CQt7',
  Turkish: 'a0B9W000000CQt8',
  Turkmen: 'a0B9W000000CQt9',
  Ukrainian: 'a0B9W000000CQtA',
  Urdu: 'a0B9W000000CQtB',
  Uyghur: 'a0B9W000000CQtC',
  Uzbek: 'a0B9W000000CQtD',
  Vietnamese: 'a0B9W000000CQtE',
  Warlpiri: 'a0B9W000000CQtF',
  Welsh: 'a0B9W000000CQtG',
  Wolof: 'a0B9W000000CQtH',
  Xhosa: 'a0B9W000000CQtI',
  Yakut: 'a0B9W000000CQtJ',
  Yiddish: 'a0B9W000000CQtK',
  Yoruba: 'a0B9W000000CQtL',
  Yucatec: 'a0B9W000000CQtM',
  Zapotec: 'a0B9W000000CQtN',
  Zulu: 'a0B9W000000CQtO',
}

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
function onErrorLogAndResumeNext(logFormatter = defaultErrorFormatter) {
  return catchError((err) => {
    console.log(logFormatter(err))
    return EMPTY
  })
}
function defaultErrorFormatter(value) {
  return 'Gave up trying to retry handling this error: ' + value
}

function deleteFalsyProperties(obj) {
  for (const property in obj) {
    if (!obj[property]) {
      delete obj[property]
    }
  }

  return obj
}

async function insertContactFn(p) {
  const existingContacts1 = await conn
    .sobject('Contact')
    .find({ ReDI_Email_Address__c: p.email.toLocaleLowerCase() })
  const existingContacts2 = await conn
    .sobject('Contact')
    .find({ Email: p.email.toLocaleLowerCase() })
  const existingContacts3 = await conn
    .sobject('Contact')
    .find({ Loopback_User_ID__c: String(p.id) })
  const existingContacts = []

  if (existingContacts1.length > 0) {
    existingContacts.push(existingContacts1[0])
  } else if (existingContacts2.length > 0) {
    existingContacts.push(existingContacts2[0])
  } else if (existingContacts3.length > 0) {
    existingContacts.push(existingContacts3[0])
  }

  const existingContactCount = existingContacts.length
  let newOrExisting
  let contactIdUpdatedOrInserted

  if (existingContactCount === 0) {
    newOrExisting = 'new'
    let insertResult
    const insertThis = deleteFalsyProperties({
      Email: p.email,
      ReDI_Email_Address__c: p.email,
      RecordTypeId: PARTIALSBX_CONTACT_RECORD_TYPE,
      Loopback_User_ID__c: String(p.id), // USED TO BE .sfId ... why?
      FirstName: `${
        p.contact.firstName
          ? p.contact.firstName
              .toLocaleLowerCase()
              .replace(/(^\w|\s\w)/g, (m) => m.toUpperCase())
          : ''
      }`,
      LastName: `${
        p.contact.lastName
          ? p.contact.lastName
              .toLocaleLowerCase()
              .replace(/(^\w|\s\w)/g, (m) => m.toUpperCase())
          : ''
      }`,
      redi_Contact_Gender__c: p.contact.gender
        ? p.contact.gender
            .toLocaleLowerCase()
            .replace(/(^\w|\s\w)/g, (m) => m.toUpperCase())
        : undefined,
      ReDI_Birth_Date__c: p.contact.birthDate,
      LinkedIn_Profile__c: p.contact.linkedInProfileUrl,
      ReDI_Website_Portfolio__c: p.contact.personalWebsite,
      ReDI_GitHub_Profile__c: p.contact.githubProfileUrl,
      ReDI_Slack_Username__c: p.contact.slackUsername,
      ReDI_Behance_URL__c: p.contact.behanceUrl,
      ReDI_Dribbble_URL__c: p.contact.dribbbleUrl,
      ReDI_Stack_Overflow_URL__c: p.contact.stackOverflowUrl,
      CON_TP_Mailing_Address__c: p.contact.postalMailingAddress,
      MobilePhone: p.contact.telephoneNumber,
      Upserted_by_CON_TP_data_migration__c: true,
      ReDI_First_Point_of_Contact_Talent_Pool__c: p.contact
        .howDidHearAboutRediKey
        ? p.contact.howDidHearAboutRediKey.toUpperCase().replace(/-/g, '_')
        : undefined,
      ReDI_First_Point_of_Contact_Other_TP__c:
        p.contact.howDidHearAboutRediOtherText,
      ReDI_Gender_Pronouns__c: p.contact.genderPronouns,
    })
    try {
      insertResult = await conn.sobject('Contact').create(insertThis)
      contactIdUpdatedOrInserted = insertResult.id
    } catch (err) {
      // INSERTION EXCEPTION CAUGHT
      console.log('Contact insertion error:', err)
      console.log(insertThis)
      throw err
    }
  } else if (existingContactCount === 1) {
    newOrExisting = 'existing'
    contactIdUpdatedOrInserted = existingContacts[0].Id
    const insertThis = deleteFalsyProperties({
      Id: existingContacts[0].Id,
      Email: p.email,
      ReDI_Email_Address__c: p.email,
      RecordTypeId: PARTIALSBX_CONTACT_RECORD_TYPE,
      Loopback_User_ID__c: String(p.id),
      FirstName: `${
        p.contact.firstName
          ? p.contact.firstName
              .toLocaleLowerCase()
              .replace(/(^\w|\s\w)/g, (m) => m.toUpperCase())
          : ''
      }`,
      LastName: `${
        p.contact.lastName
          ? p.contact.lastName
              .toLocaleLowerCase()
              .replace(/(^\w|\s\w)/g, (m) => m.toUpperCase())
          : ''
      }`,
      redi_Contact_Gender__c: p.contact.gender
        ? p.contact.gender
            .toLocaleLowerCase()
            .replace(/(^\w|\s\w)/g, (m) => m.toUpperCase())
        : undefined,
      ReDI_Birth_Date__c: p.contact.birthDate,
      LinkedIn_Profile__c: p.contact.linkedInProfileUrl,
      ReDI_Website_Portfolio__c: p.contact.personalWebsite,
      ReDI_GitHub_Profile__c: p.contact.githubProfileUrl,
      ReDI_Slack_Username__c: p.contact.slackUsername,
      ReDI_Behance_URL__c: p.contact.behanceUrl,
      ReDI_Dribbble_URL__c: p.contact.dribbbleUrl,
      ReDI_Stack_Overflow_URL__c: p.contact.stackOverflowUrl,
      CON_TP_Mailing_Address__c: p.contact.postalMailingAddress,
      MobilePhone: p.contact.telephoneNumber,
      Upserted_by_CON_TP_data_migration__c: true,
      ReDI_First_Point_of_Contact_Talent_Pool__c: p.contact
        .howDidHearAboutRediKey
        ? p.contact.howDidHearAboutRediKey.toUpperCase().replace(/-/g, '_')
        : undefined,
      ReDI_First_Point_of_Contact_Other_TP__c:
        p.contact.howDidHearAboutRediOtherText,
    })
    let result
    try {
      result = await conn.sobject('Contact').update(insertThis)
    } catch (err) {
      // INSERTION EXCEPTION CAUGHT
      console.log('Contact insertion error:', err)
      console.log(insertThis)
      throw err
    }
  }

  return {
    ...p.contact,
    newOrExisting,
    sfContactId: contactIdUpdatedOrInserted,
    existingContactCount,
  }
}

function insertContact(p) {
  return of(p).pipe(
    mergeMap(
      (x) => from(insertContactFn(p)),
      (outer, inner) => ({ ...outer, contact: inner })
    ),
    retryWithDelay(DELAY, RETRIES),
    onErrorLogAndResumeNext()
  )
}
async function insertConnectProfileFn(p) {
  if (!p.redProfile.id) {
    console.log('WARNING: NO ID')
  }
  const insertThis = {
    Loopback_Original_ID__c: p.redProfile.id,
    Contact__c: p.contact.sfContactId,
    RecordTypeId:
      p.redProfile.userType.indexOf('mentor') !== -1
        ? PARTIALSBX_CONNECT_PROFILE_MENTOR_RECORD_TYPE
        : PARTIALSBX_CONNECT_PROFILE_MENTEE_RECORD_TYPE,
    Profile_Status__c: redProfileToProfileStatus(p.redProfile),
    ReDI_Location__c: p.redProfile.rediLocation,
    Occupation__c: p.redProfile.mentor_occupation,

    Work_Place__c: p.redProfile.mentor_workPlace,
    Expectations__c: p.redProfile.expectations
      ? p.redProfile.expectations.substr(0, 1000)
      : undefined,
    Mentoring_Topics__c: p.redProfile.categories
      ? p.redProfile.categories.join(';')
      : undefined,
    Occupation_Category__c: p.redProfile.mentee_occupationCategoryId,
    Place_of_Employment__c: p.redProfile.mentee_occupationJob_placeOfEmployment,
    Job_Title__c: p.redProfile.mentee_occupationJob_position,
    Study_Place__c: p.redProfile.mentee_occupationStudent_studyPlace,
    Study_Name__c: p.redProfile.mentee_occupationStudent_studyName,
    Desired_Job__c: p.redProfile.mentee_occupationLookingForJob_what,
    Main_Occupation_Other__c: p.redProfile.mentee_occupationOther_description,
    Education__c: p.redProfile.mentee_highestEducationLevel,
    ReDI_Course__c: p.redProfile.mentee_currentlyEnrolledInCourse,
    Avatar_Image_URL__c: p.redProfile.profileAvatarImageS3Key
      ? 'https://s3-eu-west-1.amazonaws.com/redi-connect-profile-avatars/' +
        p.redProfile.profileAvatarImageS3Key
      : undefined,
    Personal_Description__c: p.redProfile.personalDescription
      ? p.redProfile.personalDescription.substr(0, 600)
      : undefined,
    Languages__c: p.redProfile.languages
      ? p.redProfile.languages
          .map((langLabel) => LANGUAGES[langLabel])
          .join(';')
      : undefined,
    Opt_Out_Mentees_From_Other_Locations__c:
      p.redProfile.optOutOfMenteesFromOtherRediLocation,
    Profile_First_Approved_At__c: p.redProfile.userActivatedAt,
    Administrator_Internal_Comment__c:
      p.redProfile.administratorInternalComment,
    total_mentee_capacity__c: p.redProfile.menteeCountCapacity,
    CreatedDate: p.redProfile.createdAt,
    LastModifiedDate: p.redProfile.updatedAt,
  }
  let result
  try {
    result = await conn.sobject('ReDI_Connect_Profile__c').create(
      insertThis

      // 'Loopback_Original_ID__c'
    )
  } catch (err) {
    // INSERTION EXCEPTION CAUGHT
    const idMatch = err.message.match(/([a-zA-Z0-9]{15})/g)
    if (idMatch && idMatch[0]) {
      result = { id: idMatch[0] }
    } else {
      console.log('ConProfile insertion error:', err)
      console.log(insertThis)
      throw err
    }
  }
  return { ...p.redProfile, sfConnectProfileId: result.id }
}
function insertConnectProfile(p) {
  return of(p).pipe(
    switchMap(
      (x) => from(insertConnectProfileFn(p)),
      (outer, inner) => ({ ...outer, redProfile: inner })
    ),
    retryWithDelay(DELAY, RETRIES),
    onErrorLogAndResumeNext()
  )
}

async function insertMentoringSessionFn(p) {
  let result
  const insertThis = {
    Loopback_Original_ID__c: p.id,
    Date__c: p.date,
    Mentee__c: REDPROFILE_SFCONTACT[p.menteeId],
    Mentor__c: REDPROFILE_SFCONTACT[p.mentorId],
    Durations_in_Minutes__c: p.minuteDuration,
    CreatedDate: p.createdAt,
    LastModifiedDate: p.updatedAt,
  }
  try {
    result = await conn.sobject('Mentoring_Session__c').create(
      insertThis
      // 'Loopback_Original_ID__c'
    )
  } catch (err) {
    // INSERTION EXCEPTION CAUGHT
    const idMatch = err.message.match(/([a-zA-Z0-9]{15})/g)
    if (idMatch && idMatch[0]) {
      result = { id: idMatch[0] }
    } else {
      console.log('MentoringSession insertion error:', err)
      throw err
    }
  }
  return { ...p, sfId: result.id }
}
function insertMentoringSession(p) {
  return of(p).pipe(
    switchMap((x) => from(insertMentoringSessionFn(p))),
    retryWithDelay(DELAY, RETRIES),
    onErrorLogAndResumeNext()
  )
}

async function insertMatchFn(p) {
  let result
  const insertThis = {
    Loopback_Original_ID__c: p.id,
    Acceptance_Notification_Dismissed__c:
      p.hasMenteeDismissedMentorshipApplicationAcceptedNotification,
    Application_Accepted_On__c: p.matchMadeActiveOn,
    Application_Text__c: p.applicationText,
    Decline_Message__c: p.ifDeclinedByMentor_optionalMessageToMentee
      ? p.ifDeclinedByMentor_optionalMessageToMentee.substr(0, 1000)
      : undefined,
    Decline_Reason__c: p.ifDeclinedByMentor_chosenReasonForDecline,
    Decline_Reason_Other__c: p.ifDeclinedByMentor_ifReasonIsOther_freeText,
    Declined_On__c: p.ifDeclinedByMentor_dateTime,
    Expectations__c: p.expectationText,
    Mentor_Acceptance_Message__c: p.mentorReplyMessageOnAccept,
    Mentor_Completion_Message__c: p.mentorMessageOnComplete
      ? p.mentorMessageOnComplete.substr(0, 1000)
      : undefined,
    Status__c: p.status.toUpperCase().replace(/-/g, '_'),
    Mentee__c: REDPROFILE_SFCONTACT[p.menteeId],
    Mentor__c: REDPROFILE_SFCONTACT[p.mentorId],
    CreatedDate: p.createdAt,
    LastModifiedDate: p.updatedAt,
  }
  try {
    result = await conn.sobject('Mentorship_Match__c').create(
      insertThis
      // 'Loopback_Original_ID__c
    )
  } catch (err) {
    // INSERTION EXCEPTION CAUGHT
    const idMatch = err.message.match(/([a-zA-Z0-9]{15})/g)
    if (idMatch && idMatch[0]) {
      result = { id: idMatch[0] }
    } else {
      console.log('MentorshipMatch insertion error:', err)
      throw err
    }
  }
  return { ...p, sfId: result.id }
}
function insertMatch(p) {
  return of(p).pipe(
    switchMap((x) => from(insertMatchFn(p))),
    retryWithDelay(DELAY, RETRIES),
    onErrorLogAndResumeNext()
  )
}

async function insertJobseekerProfileFn(p) {
  let jobseekerFreshlyCreated
  let jobseekerResult
  const insertThis = {
    Loopback_Original_ID__c: p.tpJobseekerProfile.id,
    Contact__c: p.contact.sfContactId,
    ReDI_Location__c: p.tpJobseekerProfile.rediLocation,
    ReDI_Course__c: p.tpJobseekerProfile.currentlyEnrolledInCourse,
    Avatar_Image_URL__c: p.tpJobseekerProfile.profileAvatarImageS3Key
      ? 'https://s3-eu-west-1.amazonaws.com/redi-connect-profile-avatars/' +
        p.tpJobseekerProfile.profileAvatarImageS3Key
      : undefined,
    Desired_Positions__c: p.tpJobseekerProfile.desiredPositions
      ? p.tpJobseekerProfile.desiredPositions.join(';')
      : undefined,
    Location__c: p.tpJobseekerProfile.location,
    Desired_Employment_Type__c: p.tpJobseekerProfile.desiredEmploymentType
      ? p.tpJobseekerProfile.desiredEmploymentType.join(';')
      : undefined,
    Availability__c: p.tpJobseekerProfile.availability,
    Availability_Date__c: p.tpJobseekerProfile.ifAvailabilityIsDate_date,
    About_Yourself__c: p.tpJobseekerProfile.aboutYourself,
    Top_Skills__c: p.tpJobseekerProfile.topSkills
      ? p.tpJobseekerProfile.topSkills.join(';')
      : undefined,
    Profile_Status__c: p.tpJobseekerProfile.state
      .toUpperCase()
      .replace(/-/g, '_'),
    Is_Job_Fair_2022_Participant__c:
      p.tpJobseekerProfile.isJobFair2022Participant,
    Is_Job_Fair_2023_Participant__c:
      p.tpJobseekerProfile.isJobFair2023Participant,
    Is_Visible_to_Companies__c:
      p.tpJobseekerProfile.isProfileVisibleToCompanies,
    Is_Hired__c: p.tpJobseekerProfile.isHired,
    Administrator_Internal_Comment__c:
      p.tpJobseekerProfile.administratorInternalComment,
    Federal_State__c: p.tpJobseekerProfile.federalState
      ? p.tpJobseekerProfile.federalState.toUpperCase().replace(/-/g, '_')
      : undefined,
    Willing_to_Relocate__c: p.tpJobseekerProfile.willingToRelocate,

    CreatedDate: p.tpJobseekerProfile.createdAt,
    LastModifiedDate: p.tpJobseekerProfile.updatedAt,
  }
  try {
    jobseekerResult = await conn.sobject('Jobseeker_Profile__c').create(
      insertThis
      // 'Loopback_Original_ID__c'
    )
    jobseekerFreshlyCreated = true
  } catch (err) {
    // INSERTION EXCEPTION CAUGHT
    const idMatch = err.message.match(/([a-zA-Z0-9]{15})/g)
    if (idMatch && idMatch[0]) {
      jobseekerResult = { id: idMatch[0] }
      jobseekerFreshlyCreated = false
    } else {
      console.log('JobseekerProfile insertion error:', err)
      console.log(insertThis)
      throw err
    }
  }

  if (jobseekerFreshlyCreated) {
    if (
      p.tpJobseekerProfile.education &&
      p.tpJobseekerProfile.education.length
    ) {
      for (let i = 0; i < p.tpJobseekerProfile.education.length; i++) {
        const educationItem = p.tpJobseekerProfile.education[i]
        const insertThis2 = {
          Frontend_View_Index__c: Number(i + 1),
          Contact__c: p.contact.sfContactId,
          Jobseeker_Profile__c: jobseekerResult.id,
          RecordTypeId:
            PARTIALSBX_JOBSEEKER_PROFILE_LINE_ITEM_RECORD_TYPE_EDUCATION,
          Description__c: educationItem.description,
          Institution_City__c: educationItem.institutionCity,
          Institution_Country__c: educationItem.institutionCountry,
          Institution_Name__c: educationItem.institutionName
            ? educationItem.institutionName.substr(0, 255)
            : undefined,
          Title__c: educationItem.title,
          Certification_Type__c: educationItem.certificationType,
          Description__c: educationItem.description,
          Start_Date_Month__c: educationItem.startDateMonth,
          Start_Date_Year__c: educationItem.startDateYear,
          End_Date_Month__c: educationItem.endDateMonth,
          End_Date_Year__c: educationItem.endDateYear,
          Current__c: educationItem.current,
        }
        try {
          await conn.sobject('Jobseeker_Line_Item__c').create(insertThis2)
        } catch (err) {
          console.log('Error inserting Jobseeker Line Item (Education)', err)
        }
      }
    }
    if (
      p.tpJobseekerProfile.experience &&
      p.tpJobseekerProfile.experience.length
    ) {
      for (let i = 0; i < p.tpJobseekerProfile.experience.length; i++) {
        const experienceItem = p.tpJobseekerProfile.experience[i]
        const insertThis2 = {
          Frontend_View_Index__c: Number(i + 1),
          Contact__c: p.contact.sfContactId,
          Jobseeker_Profile__c: jobseekerResult.id,
          RecordTypeId:
            PARTIALSBX_JOBSEEKER_PROFILE_LINE_ITEM_RECORD_TYPE_EXPERIENCE,
          Description__c: experienceItem.description,
          City__c: experienceItem.city,
          Title__c: experienceItem.title,
          Country__c: experienceItem.country,
          Company__c: experienceItem.company,
          Description__c: experienceItem.description,
          Start_Date_Month__c: experienceItem.startDateMonth,
          Start_Date_Year__c: experienceItem.startDateYear,
          End_Date_Month__c: experienceItem.endDateMonth,
          End_Date_Year__c: experienceItem.endDateYear,
          Current__c: experienceItem.current,
        }
        try {
          await conn.sobject('Jobseeker_Line_Item__c').create(insertThis2)
        } catch (err) {
          console.log('Error inserting Jobseeker Line Item (Experience)', err)
          console.log(insertThis2)
        }
      }
    }
    if (p.tpJobseekerProfile.workingLanguages) {
      for (const langItem of p.tpJobseekerProfile.workingLanguages) {
        if (!langItem.language || !langItem.proficiencyLevelId) {
          break
        }
        if (!PARTIALSBX_LANGUAGE_TO_ID_MAP[langItem.language]) {
          console.log(
            '*** ERROR: USER LANGUAGE DOES NOT MAP TO A SALESFORCE LANGUAGE OBJECT ***'
          )
          console.log(JSON.stringify(langItem, 0, 2))
          console.log(
            `Jobseeker in question: ${p.tpJobseekerProfile.id} ${p.contact.firstName} ${p.contact.lastName}`
          )

          break
        }
        if (langItem.language === 'Tigrinya') {
          langItem.language = 'Tigrigna'
        }
        if (langItem.language === 'Farsi') {
          langItem.language = 'Persian'
        }
        const insertThis2 = {
          hed__Contact__c: p.contact.sfContactId,
          hed__Fluency__c: langItem.proficiencyLevelId,
          hed__Language__c: PARTIALSBX_LANGUAGE_TO_ID_MAP[langItem.language],
        }
        try {
          await conn.sobject('hed__Contact_Language__c').create(insertThis2)
          console.log('inserted jobseeker language record')
        } catch (err) {
          console.log('*** LANGUAGE RECORD INSERTION ERROR ***')
          console.log(err)
          console.log(insertThis2)
        }
      }
    }
  }
  return { ...p.tpJobseekerProfile, sfJobseekerProfileId: jobseekerResult.id }
}
function insertJobseekerProfile(p) {
  return of(p).pipe(
    switchMap(
      (x) => from(insertJobseekerProfileFn(p)),
      (outer, inner) => ({ ...outer, tpJobseekerProfile: inner })
    ),
    retryWithDelay(DELAY, RETRIES),
    onErrorLogAndResumeNext()
  )
}

async function insertJobseekerCvFn(cv) {
  let cvResult
  let cvFreshlyCreated
  const insertThis = {
    Loopback_Original_ID__c: cv.id,
    Contact__c: REDUSER_SFCONTACT[cv.redUserId],
    Name: cv.cvName,
    Avatar_Image_URL__c: cv.profileAvatarImageS3Key
      ? 'https://s3-eu-west-1.amazonaws.com/redi-connect-profile-avatars/' +
        cv.profileAvatarImageS3Key
      : undefined,

    About_Yourself__c: cv.aboutYourself,
    Availability__c: cv.availability,
    Availability_Date__c: cv.ifAvailabilityIsDate_date,
    Behance_URL__c: cv.behanceUrl,
    Desired_Employment_Type__c: cv.desiredEmploymentType
      ? cv.desiredEmploymentType.join(';')
      : undefined,
    Desired_Positions__c: cv.desiredPositions
      ? cv.desiredPositions.join(';')
      : undefined,
    Dribbble_URL__c: cv.dribbbleUrl,
    Email__c: cv.contactEmail,
    First_Name__c: cv.firstName,
    GitHub_URL__c: cv.githubUrl,
    Immigration_Status__c: cv.immigrationStatus,
    Last_Name__c: cv.lastName,
    LinkedIn_URL__c: cv.linkedInUrl,
    Location__c: cv.location,
    Mailing_Address__c: cv.postalMailingAddress,
    Phone_Number__c: cv.phoneNumber,
    Stack_Overflow_URL__c: cv.stackOverflowUrl,
    Top_Skills__c: cv.topSkills ? cv.topSkills.join(';') : undefined,
    Twitter_URL__c: cv.twitterUrl,
    Website_Portfolio__c: cv.personalWebsite,
    Willing_to_Relocate__c: cv.willingToRelocate,
    LastModifiedDate: cv.updatedAt,
    CreatedDate: cv.createdAt,
  }
  try {
    cvResult = await conn.sobject('Jobseeker_CV__c').create(
      insertThis
      // 'Loopback_Original_ID__c'
    )
    cvFreshlyCreated = true
  } catch (err) {
    // INSERTION EXCEPTION CAUGHT
    const idMatch = err.message.match(/([a-zA-Z0-9]{15})/g)
    if (idMatch && idMatch[0]) {
      cvResult = { id: idMatch[0] }
      cvFreshlyCreated = false
    } else {
      console.log('JobseekerProfileCv insertion error:', err)
      console.log(insertThis)
      throw err
    }
  }

  if (cvFreshlyCreated) {
    if (cv.education && cv.education.length) {
      for (let i = 0; i < cv.education.length; i++) {
        const educationItem = cv.education[i]
        const insertThis2 = {
          Frontend_View_Index__c: Number(i + 1),
          Jobseeker_CV__c: cvResult.id,
          RecordTypeId: PARTIALSBX_CV_LINE_ITEM_RECORD_TYPE_EDUCATION,
          Description__c: educationItem.description,
          Institution_City__c: educationItem.institutionCity,
          Institution_Country__c: educationItem.institutionCountry,
          Institution_Name__c: educationItem.institutionName
            ? educationItem.institutionName.substr(0, 255)
            : undefined,
          Title__c: educationItem.title,
          Certification_Type__c: educationItem.certificationType,
          Description__c: educationItem.description,
          Start_Date_Month__c: educationItem.startDateMonth,
          Start_Date_Year__c: educationItem.startDateYear,
          End_Date_Month__c: educationItem.endDateMonth,
          End_Date_Year__c: educationItem.endDateYear,
          Current__c: educationItem.current,
        }
        try {
          await conn.sobject('Jobseeker_CV_Line_Item__c').create(insertThis2)
        } catch (err) {
          console.log('Error inserting CV Line Item (Education)', err)
          console.log(insertThis2)
        }
        // console.log('inserted cv experience item')
      }
    }
    if (cv.experience && cv.experience.length) {
      for (let i = 0; i < cv.experience.length; i++) {
        const experienceItem = cv.experience[i]
        const insertThis2 = {
          Frontend_View_Index__c: Number(i + 1),
          Jobseeker_CV__c: cvResult.id,
          RecordTypeId: PARTIALSBX_CV_LINE_ITEM_RECORD_TYPE_EXPERIENCE,
          Description__c: experienceItem.description,
          City__c: experienceItem.city,
          Title__c: experienceItem.title,
          Country__c: experienceItem.country,
          Company__c: experienceItem.company,
          Description__c: experienceItem.description,
          Start_Date_Month__c: experienceItem.startDateMonth,
          Start_Date_Year__c: experienceItem.startDateYear,
          End_Date_Month__c: experienceItem.endDateMonth,
          End_Date_Year__c: experienceItem.endDateYear,
          Current__c: experienceItem.current,
        }
        try {
          await conn.sobject('Jobseeker_CV_Line_Item__c').create(insertThis2)
        } catch (err) {
          console.log('Error inserting CV Line Item (Experience)', err)
          console.log(insertThis2)
        }
        // console.log('inserted cv education item')
      }
    }
    if (cv.workingLanguages) {
      for (const langItem of cv.workingLanguages) {
        if (
          langItem.proficiencyLevelId &&
          PARTIALSBX_LANGUAGE_TO_ID_MAP[langItem.language]
        ) {
          await conn.sobject('Jobseeker_CV_Language_Item__c').create({
            Jobseeker_CV__c: cvResult.id,
            Fluency__c: langItem.proficiencyLevelId,
            Language__c: PARTIALSBX_LANGUAGE_TO_ID_MAP[langItem.language],
          })
        }
        // console.log('inserted cv langauge record')
      }
    }
  }
  return { ...cv, sfCvId: cvResult.id }
}
function insertJobseekerCv(cv) {
  return of(cv).pipe(
    switchMap(
      (x) => from(insertJobseekerCvFn(cv)),
      (outer, inner) => inner
    ),
    retryWithDelay(DELAY, RETRIES),
    onErrorLogAndResumeNext()
  )
}

async function insertAccountForCompanyProfileFn(p) {
  let accountResult
  let account = {
    Loopback_Original_ID__c: p.tpCompanyProfile.id,
    RecordTypeId: PARTIALSBX_ACCOUNT_RECORD_TYPE_BUSINESS_ORGANIZATION,
    ReDI_Avatar_Image_URL__c: p.tpCompanyProfile.profileAvatarImageS3Key
      ? 'https://s3-eu-west-1.amazonaws.com/redi-connect-profile-avatars/' +
        p.tpCompanyProfile.profileAvatarImageS3Key
      : undefined,
    Name: p.tpCompanyProfile.companyName,
    Location__c: p.tpCompanyProfile.location,
    ReDI_Tagline__c: p.tpCompanyProfile.tagline,
    Industry: p.tpCompanyProfile.industry,
    Website: p.tpCompanyProfile.website,
    ReDI_LinkedIn_Page__c: p.tpCompanyProfile.linkedInUrl,
    Phone: p.tpCompanyProfile.phoneNumber,
    Description: p.tpCompanyProfile.about,
    ReDI_Talent_Pool_State__c: p.tpCompanyProfile.state
      .toUpperCase()
      .replace(/-/g, '_'),
    ReDI_Visible_to_Jobseekers__c:
      p.tpCompanyProfile.isProfileVisibleToJobseekers,
    ReDI_Is_Job_Fair_2023_Participant__c:
      p.tpCompanyProfile.isJobFair2023Participant,
    ReDI_Administrator_Internal_Comment__c:
      p.tpCompanyProfile.administratorInternalComment,
    CreatedDate: p.createdAt, //! Use Jonida trick
    LastModifiedDate: p.updatedAt, //! Use Jonida trick
  }
  try {
    accountResult = await conn.sobject('Account').create(
      account
      // 'Loopback_Original_ID__c'
    )
  } catch (err) {
    // INSERTION EXCEPTION CAUGHT
    const idMatch = err.message.match(/([a-zA-Z0-9]{15})/g)
    if (idMatch && idMatch[0]) {
      accountResult = { id: idMatch[0] }
    } else {
      console.log('*** EXCEPTION ***')
      console.log('Inserting Account failed:')
      console.log(account)
      console.log(err)
      throw err
    }
  }

  /* Either insert a new AccountContactRelation or update the existing one */
  let accountContact = {
    AccountId: accountResult.id,
    ContactId: p.contact.sfContactId,
    ReDI_Company_Representative_Status__c: 'APPROVED',
    Roles: 'TALENT_POOL_COMPANY_REPRESENTATIVE',
  }
  const existingAccountContacts = await conn
    .sobject('AccountContactRelation')
    .find({ AccountId: accountResult.id, ContactId: p.contact.sfContactId })
  let accountContactResult
  if (existingAccountContacts.length > 0) {
    accountContact.Id = existingAccountContacts[0].Id
    delete accountContact.AccountId
    delete accountContact.ContactId
    try {
      console.log(
        `UPDATING AccountContactRelation between ${p.tpCompanyProfile.companyName} and ${p.contact.firstName} ${p.contact.lastName}`
      )
      accountContactResult = await conn
        .sobject('AccountContactRelation')
        .update(accountContact)
    } catch (err) {
      // INSERTION EXCEPTION CAUGHT
      const idMatch = err.message.match(/([a-zA-Z0-9]{15})/g)
      if (idMatch && idMatch[0]) {
        accountContactResult = { id: idMatch[0] }
      } else {
        console.log('*** EXCEPTION ***')
        console.log('Updating AccountContactRelation failed:')
        console.log(accountContact)
        console.log(err)
        throw err
      }
    }
  } else {
    try {
      console.log(
        `INSERTING AccountContactRelation between ${p.tpCompanyProfile.companyName} and ${p.contact.firstName} ${p.contact.lastName}`
      )
      accountContactResult = await conn
        .sobject('AccountContactRelation')
        .create(accountContact)
    } catch (err) {
      // INSERTION EXCEPTION CAUGHT
      const idMatch = err.message.match(/([a-zA-Z0-9]{15})/g)
      if (idMatch && idMatch[0]) {
        accountContactResult = { id: idMatch[0] }
      } else {
        console.log('*** EXCEPTION ***')
        console.log('Inserting AccountContactRelation failed:')
        console.log(accountContact)
        console.log(err)
        throw err
      }
    }
  }

  if (p.tpJobListings) {
    for (const jobListing of p.tpJobListings) {
      if (jobListing.employmentType === 'partTimeEmployment') {
        jobListing.employmentType = 'partTime'
      }
      if (jobListing.employmentType === 'fullTimeEmployment') {
        jobListing.employmentType = 'fullTime'
      }
      if (jobListing.employmentType === 'apprenticeship') {
        jobListing.employmentType = 'apprenticeshipAusbildung'
      }
      let jobListingResult
      try {
        jobListingResult = await conn.sobject('Job_Listing__c').create(
          {
            Loopback_Original_ID__c: jobListing.id,
            Account__c: accountResult.id,
            Title__c: jobListing.title,
            Location__c: jobListing.location,
            Summary__c: jobListing.summary,
            Ideal_Technical_Skills__c: jobListing.idealTechnicalSkills
              ? jobListing.idealTechnicalSkills.join(';')
              : undefined,
            Relates_to_Positions__c: jobListing.relatesToPositions
              ? jobListing.relatesToPositions.join(';')
              : undefined,
            Employment_Type__c: jobListing.employmentType,
            Language_Requirements__c: jobListing.languageRequirements,
            Salary_Range__c: jobListing.salaryRange,
            Remote_Possible__c: jobListing.isRemotePossible,
            CreatedDate: jobListing.createdAt,
            LastModifiedDate: jobListing.updatedAt,
          }
          // 'Loopback_Original_ID__c'
        )
      } catch (err) {
        // INSERTION EXCEPTION CAUGHT
        const idMatch = err.message.match(/([a-zA-Z0-9]{15})/g)
        if (idMatch && idMatch[0]) {
          jobListingResult = { id: idMatch[0] }
        } else {
          console.log('JobListing insertion error:', err)
          throw err
        }
      }
      TPJOBLISTING_SFJOBLISTING[jobListing.id] = jobListingResult.id
      console.log('inserted job listing')
    }
  }

  return {
    ...p,
    sfAccountId: accountResult?.id,
    sfAccountContactId: accountContactResult?.id,
  }
}
function insertAccountForCompanyProfile(p) {
  return of(p).pipe(
    switchMap(
      (x) => from(insertAccountForCompanyProfileFn(p)),
      (outer, inner) => ({ ...outer, tpCompanyProfile: inner })
    ),
    retryWithDelay(DELAY, RETRIES),
    onErrorLogAndResumeNext()
  )
}

async function insertFavoriteMentorFn({ menteeId, mentorId }) {
  const loopbackId = menteeId + mentorId
  try {
    await conn.sobject('Mentee_Favorited_Mentor_Profile__c').create({
      Loopback_Original_ID__c: loopbackId,
      Favoritee_ReDI_Connect_Profile__c: menteeId,
      Favoriter_ReDI_Connect_Profile__c: mentorId,
    })
  } catch (err) {
    // INSERTION EXCEPTION CAUGHT
    const idMatch = err.message.match(/([a-zA-Z0-9]{15})/g)
    if (idMatch && idMatch[0]) {
    } else {
      console.log('FavoriteMentor insertion error:', err)
      throw err
    }
  }
}
function insertFavouriteMentor(o) {
  return of(o).pipe(
    switchMap(
      (x) => from(insertFavoriteMentorFn(o)),
      () => o
    ),
    retryWithDelay(DELAY, RETRIES),
    onErrorLogAndResumeNext()
  )
}

async function insertJobseekerFavoriteJobListingFn({
  jobseekerId,
  jobListingId,
}) {
  const loopbackId = jobseekerId + jobListingId
  try {
    await conn.sobject('Jobseeker_Favorited_Job_Listing__c').create({
      Loopback_Original_ID__c: loopbackId,
      Jobseeker_Profile__c: jobseekerId,
      Job_Listing__c: jobListingId,
    })
  } catch (err) {
    // INSERTION EXCEPTION CAUGHT
    const idMatch = err.message.match(/([a-zA-Z0-9]{15})/g)
    if (idMatch && idMatch[0]) {
    } else {
      console.log('JobseekerFavoriteListing insertion error:', err)
      throw err
    }
  }
}
function insertJobseekerFavoriteJobListing(o) {
  return of(o).pipe(
    switchMap(
      (x) => from(insertJobseekerFavoriteJobListingFn(o)),
      () => o
    ),
    retryWithDelay(DELAY, RETRIES),
    onErrorLogAndResumeNext()
  )
}

function buildContact(redUser) {
  const u = redUser

  const fields = {
    conProfile: [
      'firstName',
      'lastName',
      'contactEmail',
      'gender',
      'birthDate',
      'linkedInProfileUrl',
      'githubProfileUrl',
      'slackUsername',
      'telephoneNumber',
      'createdAt',
      'updatedAt',
    ],
    tpJobseekerProfile: [
      'firstName',
      'lastName',
      'contactEmail',
      'genderPronouns',
      'telephoneNumber', // remapped
      'postalMailingAddress',
      'linkedInProfileUrl', // name remapped
      'githubProfileUrl', // name remapped
      'postalMailingAddress',
      'personalWebsite',
      'twitterUrl',
      'behanceUrl',
      'stackOverflowUrl',
      'dribbbleUrl',
      'immigrationStatus',
      'createdAt',
      'updatedAt',
    ],
    tpCompanyProfile: [
      'howDidHearAboutRediKey',
      'howDidHearAboutRediOtherText',
      'firstName',
      'lastName',
      'createdAt',
      'updatedAt',
    ],
  }

  if (u.redProfile) u.redProfile.is = 'conProfile'
  if (u.tpJobseekerProfile) u.tpJobseekerProfile.is = 'tpJobseekerProfile'
  if (u.tpCompanyProfile) u.tpCompanyProfile.is = 'tpCompanyProfile'

  const profiles = [u.redProfile, u.tpJobseekerProfile, u.tpCompanyProfile]
    .filter((p) => p)
    .sort((a, b) => {
      return Date.parse(a.updatedAt) - Date.parse(b.updatedAt)
    })

  redUser.contact = {}
  profiles.forEach((profile) => {
    const profileType = profile.is
    const fieldsToAssignToContactFromProfile = fields[profileType]
    const fieldsAndValues = _.pick(profile, fieldsToAssignToContactFromProfile)
    const fieldAndNonFalsyValues = deleteFalsyProperties(fieldsAndValues)
    redUser.contact = Object.assign({}, redUser.contact, fieldAndNonFalsyValues)
  })

  return redUser
}

;(async () => {
  let allUsers = await RedUser.find({
    include: [
      'redProfile',
      'tpJobseekerProfile',
      'tpJobseekerCv',
      'tpCompanyProfile',
      'tpJobListings',
    ],
  }).map((u) => u.toJSON())
  // allUsers = _.slice(allUsers, 1000 + 440)
  // allUsers = allUsers.filter(
  //   (u) => u.id.toString() === '613731c6e0624f069aa223d9'
  // )
  console.log(allUsers)
  allUsers = allUsers
    .map((u) => {
      u.email = u.email.toLocaleLowerCase()
      return u
    })
    .map((u) => {
      if (
        u.redProfile &&
        u.redProfile.languages &&
        u.redProfile.languages.length > 0
      ) {
        u.redProfile.languages = u.redProfile.languages.map((lang) => {
          switch (lang) {
            case 'Tigrinya':
              return 'Tigrigna'

            case 'Farsi':
              return 'Persian'

            default:
              return lang
          }
        })
      }
      return u
    })
    .map((u) => {
      if (u.tpCompanyProfile) {
        u.tpCompanyProfile.telephoneNumber = u.tpCompanyProfile.phoneNumber
        delete u.tpCompanyProfile.phoneNumber
      }
      return u
    })
    .map((u) => {
      if (u.tpJobseekerProfile) {
        u.tpJobseekerProfile.telephoneNumber = u.tpJobseekerProfile.phoneNumber
        delete u.tpJobseekerProfile.phoneNumber
        u.tpJobseekerProfile.linkedInProfileUrl =
          u.tpJobseekerProfile.linkedInUrl
        delete u.tpJobseekerProfile.linkedInUrl
        u.tpJobseekerProfile.githubProfileUrl = u.tpJobseekerProfile.githubUrl
        delete u.tpJobseekerProfile.githubUrl
        if (
          u.tpJobseekerProfile.workingLanguages &&
          u.tpJobseekerProfile.workingLanguages.length > 0
        ) {
          u.tpJobseekerProfile.workingLanguages =
            u.tpJobseekerProfile.workingLanguages.map((languageRecord) => {
              if (languageRecord.language === 'Tigrinya') {
                languageRecord.language = 'Tigrigna'
              }
              if (languageRecord.language === 'Farsi') {
                languageRecord.language = 'Persian'
              }
              return languageRecord
            })
        }
        if (
          u.tpJobseekerProfile.desiredPositions &&
          u.tpJobseekerProfile.desiredPositions.length > 0
        ) {
          u.tpJobseekerProfile.desiredPositions =
            u.tpJobseekerProfile.desiredPositions.map((position) => {
              if (position === 'SEO Manager') {
                return 'seoManager'
              } else {
                return position
              }
            })
        }
      }
      return u
    })
    .map((u) => {
      if (u.tpJobseekerCv && u.tpJobseekerCv.length > 0) {
        u.tpJobseekerCv = u.tpJobseekerCv.map((cv) => {
          if (cv && cv.desiredPositions && cv.desiredPositions.length > 0) {
            cv.desiredPositions = cv.desiredPositions.map((position) => {
              if (position === 'SEO Manager') {
                return 'seoManager'
              } else {
                return position
              }
            })
          }
          return cv
        })
      }
      return u
    })
    .map((u) => {
      if (u.tpJobListings && u.tpJobListings.length > 0) {
        u.tpJobListings = u.tpJobListings.map((listing) => {
          if (
            listing &&
            listing.relatesToPositions &&
            listing.relatesToPositions.length > 0
          ) {
            listing.relatesToPositions = listing.relatesToPositions.map(
              (position) => {
                if (position === 'SEO Manager') {
                  return 'seoManager'
                } else {
                  return position
                }
              }
            )
          }
          return listing
        })
      }
      return u
    })
    .filter((u) => u.redProfile || u.tpJobseekerProfile || u.tpCompanyProfile)
    .filter((u) => {
      if (
        u.redProfile &&
        u.redProfile['signup-source'] &&
        u.redProfile['signup-source'] === 'manual-import-via-script'
      )
        return false
      return true
    })
    .map(buildContact)

  const allConMatches = await RedMatch.find().map((p) => p.toJSON())
  const allConMentoringSessions = await RedMentoringSession.find().map((p) =>
    p.toJSON()
  )
  const allTpJobseekerCvs = await TpJobseekerCv.find().map((p) => p.toJSON())

  console.log('We have:')
  console.log('users', allUsers.length)

  console.log(
    'conProfiles',
    allUsers.map((p) => p.redProfile).filter((p) => p).length
  )
  console.log('conMatches', allConMatches.length)
  console.log('conMentoringSessions', allConMentoringSessions.length)
  console.log(
    'tpCompanyProfiles',
    allUsers.map((p) => p.tpCompanyProfile).filter((p) => p).length
  )
  const allJobListings = _.flatten(allUsers.map((p) => p.tpJobListings))
  console.log('tpJobListings', allJobListings.length)
  console.log(
    'tpJobsekeerProfiles',
    allUsers.map((p) => p.tpJobseekerProfile).filter((p) => p).length
  )
  console.log(
    'tpJobsekeerCvs',
    allUsers.map((p) => p.tpJobseekerCv).filter((p) => p).length
  )

  await conn.login(USERNAME, `${PASSWORD}${SECURITY_TOKEN}`)

  await from(allUsers)
    .pipe(
      // ! Contacts
      mergeMap((u) => insertContact(u), CONCURRENCY),

      // If u.contact.sfContactId is falsy, we updated an existing contact. In that case,
      // grab the existing contact and put its ID into u.contact.sfContactId
      tap((u) => {
        if (u.contact.newOrExisting === 'new') {
          console.log('Inserted Contact #', u.contact.sfContactId)
        } else {
          console.log('Updated existing Contact #', u.contact.sfContactId)
        }
        if (u.contact.existingContactCount > 1) {
          console.log(
            'NOTE: we found more than one Contact with the email',
            u.email,
            'in Salesforce. We only updated the first one that was found.'
          )
        }
      }),

      // ! ReDI Conenct Profiles
      mergeMap(
        (u) => (u.redProfile ? insertConnectProfile(u) : of(u)),
        CONCURRENCY
      ),
      tap(
        (u) =>
          u.redProfile &&
          console.log(
            'Inserted ReDI Connect Profile #',
            u.redProfile.sfConnectProfileId
          )
      ),
      tap((u) => {
        if (u.redProfile) {
          REDPROFILE_SFREDICONNECTPROFILE[u.redProfile.id] =
            u.redProfile.sfConnectProfileId
          REDPROFILE_SFCONTACT[u.redProfile.id] = u.contact.sfContactId
          REDUSER_SFCONTACT[u.id] = u.contact.sfContactId
        }
      }),

      // ! Jobseeker profiles
      mergeMap(
        (u) => (u.tpJobseekerProfile ? insertJobseekerProfile(u) : of(u)),
        CONCURRENCY
      ),
      tap((u) => {
        if (u.tpJobseekerProfile) {
          console.log(
            'Inserted Jobseeker Profile #',
            u.tpJobseekerProfile.sfJobseekerProfileId
          )
        }
      }),
      tap((u) => {
        if (u.tpJobseekerProfile) {
          TPJOBSEEKERPROFILE_SFJOBSEEKERPROFILE[u.tpJobseekerProfile.id] =
            u.tpJobseekerProfile.sfJobseekerProfileId
        }
      }),

      // ! Company profiles
      mergeMap(
        (u) => (u.tpCompanyProfile ? insertAccountForCompanyProfile(u) : of(u)),
        CONCURRENCY
      ),
      tap((u) => {
        if (u.tpCompanyProfile) {
          console.log(
            'Inserted Account #',
            u.tpCompanyProfile.sfAccountId,
            'And AccountContact #',
            u.tpCompanyProfile.sfAccountContactId
          )
        }
      }),
      tap((u) => {
        if (u.tpCompanyProfile) {
          TPCOMPANYPROFILE_SFACCOUNT[u.tpCompanyProfile.id] =
            u.tpCompanyProfile.sfAccountId
        }
      }),

      scan((acc, curr) => acc + 1, 0),
      tap(console.log)
    )
    .toPromise()

  const allCVs = _.flatten(allUsers.map((u) => u.tpJobseekerCv))

  await from(allCVs)
    .pipe(
      // ! CVs
      filter((cv) => REDUSER_SFCONTACT[cv.redUserId]),
      mergeMap((u) => insertJobseekerCv(u), Math.floor(CONCURRENCY / 2)),
      tap((cv) => console.log('Inserted CV #', cv.sfCvId)),

      scan((acc, curr) => acc + 1, 0),
      tap(console.log)
    )
    .toPromise()

  const menteeFavoritedMentorsToInsert = []
  allUsers.forEach((u) => {
    if (u.redProfile && u.redProfile.favouritedRedProfileIds) {
      u.redProfile.favouritedRedProfileIds.forEach((mentorProfileId) => {
        if (
          REDPROFILE_SFREDICONNECTPROFILE[u.redProfile.id.toString()] &&
          REDPROFILE_SFREDICONNECTPROFILE[mentorProfileId.toString()]
        ) {
          menteeFavoritedMentorsToInsert.push([
            REDPROFILE_SFREDICONNECTPROFILE[u.redProfile.id.toString()],
            REDPROFILE_SFREDICONNECTPROFILE[mentorProfileId.toString()],
          ])
        }
      })
    }
  })

  const jobseekerFavoritedJobListingsToInsert = []
  allUsers.forEach((u) => {
    if (
      u.tpJobseekerProfile &&
      u.tpJobseekerProfile.favouritedTpJobListingIds
    ) {
      u.tpJobseekerProfile.favouritedTpJobListingIds.forEach(
        (tpJobListingId) => {
          if (
            TPJOBSEEKERPROFILE_SFJOBSEEKERPROFILE[
              u.tpJobseekerProfile.id.toString()
            ] &&
            TPJOBLISTING_SFJOBLISTING[tpJobListingId.toString()]
          ) {
            jobseekerFavoritedJobListingsToInsert.push([
              TPJOBSEEKERPROFILE_SFJOBSEEKERPROFILE[
                u.tpJobseekerProfile.id.toString()
              ],
              TPJOBLISTING_SFJOBLISTING[tpJobListingId.toString()],
            ])
          }
        }
      )
    }
  })

  await from(menteeFavoritedMentorsToInsert)
    .pipe(
      tap((p) => console.log('inserting favourite mentor', p)),
      mergeMap(
        ([menteeId, mentorId]) => insertFavouriteMentor({ menteeId, mentorId }),
        CONCURRENCY
      )
    )
    .toPromise()

  await from(jobseekerFavoritedJobListingsToInsert)
    .pipe(
      tap((p) => console.log('inserting jobseekers favourited joblisting', p)),
      mergeMap(
        ([jobseekerId, jobListingId]) =>
          insertJobseekerFavoriteJobListing({ jobseekerId, jobListingId }),
        CONCURRENCY
      )
    )
    .toPromise()

  fs.writeFileSync(
    './REDUSER_SFCONTACT.json',
    JSON.stringify(REDUSER_SFCONTACT)
  )
  fs.writeFileSync(
    './REDPROFILE_SFCONTACT.json',
    JSON.stringify(REDPROFILE_SFCONTACT)
  )
  fs.writeFileSync(
    './REDPROFILE_SFREDICONNECTPROFILE.json',
    JSON.stringify(REDPROFILE_SFREDICONNECTPROFILE)
  )
  fs.writeFileSync(
    './TPCOMPANYPROFILE_SFACCOUNT.json',
    JSON.stringify(TPCOMPANYPROFILE_SFACCOUNT)
  )
  fs.writeFileSync(
    './TPJOBSEEKERPROFILE_SFJOBSEEKERPROFILE.json',
    JSON.stringify(TPJOBSEEKERPROFILE_SFJOBSEEKERPROFILE)
  )
  fs.writeFileSync(
    './TPJOBLISTING_SFJOBLISTING.json',
    JSON.stringify(TPJOBLISTING_SFJOBLISTING)
  )

  await from(allConMentoringSessions)
    .pipe(
      filter((p) => p.mentorId && p.menteeId),
      filter(
        (p) =>
          REDPROFILE_SFCONTACT[p.mentorId] && REDPROFILE_SFCONTACT[p.menteeId]
      ),
      mergeMap((p) => insertMentoringSession(p), CONCURRENCY / 2),
      tap((p) => console.log('Inserted Mentoring Session #', p.sfId)),
      scan((acc, curr) => acc + 1, 0),
      tap(console.log)
    )
    .toPromise()

  await from(allConMatches)
    .pipe(
      filter((p) => p.mentorId && p.menteeId),
      filter(
        (p) =>
          REDPROFILE_SFCONTACT[p.mentorId] && REDPROFILE_SFCONTACT[p.menteeId]
      ),
      mergeMap((p) => insertMatch(p), 5),
      tap((p) => console.log('Inserted Match #', p.sfId)),
      scan((acc, curr) => acc + 1, 0),
      tap(console.log)
    )
    .toPromise()

  console.log('phou!')
})()

function redProfileToProfileStatus(redProfile) {
  const userType = redProfile.userType
  if (userType.indexOf('pending') !== -1) return 'PENDING'

  if (userType.indexOf('rejected') !== -1) return 'REJECTED'

  if (!redProfile.userActivated) return 'DEACTIVATED'

  return 'APPROVED'
}
