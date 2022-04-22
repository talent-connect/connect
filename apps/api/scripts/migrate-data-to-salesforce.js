'use strict'
const app = require('../server/server.js')
const Rx = require('rxjs')
const { bindNodeCallback, from } = Rx
const jsforce = require('jsforce')
const _ = require('lodash')

const USERNAME = process.env.USERNAME
const PASSWORD = process.env.PASSWORD
const SECURITY_TOKEN = process.env.SECURITY_TOKEN
const LOGIN_URL = 'https://redischool--local.my.salesforce.com'
const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET

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
const REDPROFILE_SFREDICONNECTPROFILE = {}
const TPCOMPANYPROFILE_SFACCOUNT = {}
const TPJOBSEEKERPROFILE_SFJOBSEEKERPROFILE = {}
const TPJOBLISTING_SFJOBLISTING = {}

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
const { lang } = require('moment')

const DELAY = 1500
const RETRIES = 5
const CONCURRENCY = 75

const LANGUAGE_TO_ID_MAP = {
  Afrikaans: 'a0B9X0000004BPtUAM',
  Albanian: 'a0B9X0000004BPuUAM',
  Amharic: 'a0B9X0000004BPvUAM',
  Arabic: 'a0B9X0000004BPwUAM',
  Aramaic: 'a0B9X0000004BPxUAM',
  Armenian: 'a0B9X0000004BPyUAM',
  Assamese: 'a0B9X0000004BPzUAM',
  Aymara: 'a0B9X0000004BQ0UAM',
  Azerbaijani: 'a0B9X0000004BQ1UAM',
  Balochi: 'a0B9X0000004BQ2UAM',
  Bamanankan: 'a0B9X0000004BQ3UAM',
  'Bashkort (Bashkir)': 'a0B9X0000004BQ4UAM',
  Basque: 'a0B9X0000004BQ5UAM',
  Belarusan: 'a0B9X0000004BQ6UAM',
  Bengali: 'a0B9X0000004BQ7UAM',
  Bhojpuri: 'a0B9X0000004BQ8UAM',
  Bislama: 'a0B9X0000004BQ9UAM',
  Bosnian: 'a0B9X0000004BQAUA2',
  Brahui: 'a0B9X0000004BQBUA2',
  Bulgarian: 'a0B9X0000004BQCUA2',
  Burmese: 'a0B9X0000004BQDUA2',
  Cantonese: 'a0B9X0000004BQEUA2',
  Catalan: 'a0B9X0000004BQFUA2',
  Cebuano: 'a0B9X0000004BQGUA2',
  Chechen: 'a0B9X0000004BQHUA2',
  Cherokee: 'a0B9X0000004BQIUA2',
  Croatian: 'a0B9X0000004BQJUA2',
  Czech: 'a0B9X0000004BQKUA2',
  Dakota: 'a0B9X0000004BQLUA2',
  Danish: 'a0B9X0000004BQMUA2',
  Dari: 'a0B9X0000004BQNUA2',
  Dholuo: 'a0B9X0000004BQOUA2',
  Dutch: 'a0B9X0000004BQPUA2',
  English: 'a0B9X0000004BQQUA2',
  Esperanto: 'a0B9X0000004BQRUA2',
  Estonian: 'a0B9X0000004BQSUA2',
  Finnish: 'a0B9X0000004BQUUA2',
  French: 'a0B9X0000004BQVUA2',
  Georgian: 'a0B9X0000004BQWUA2',
  German: 'a0B9X0000004BQXUA2',
  Gikuyu: 'a0B9X0000004BQYUA2',
  Greek: 'a0B9X0000004BQZUA2',
  Guarani: 'a0B9X0000004BQaUAM',
  Gujarati: 'a0B9X0000004BQbUAM',
  'Haitian Creole': 'a0B9X0000004BQcUAM',
  Hausa: 'a0B9X0000004BQdUAM',
  Hawaiian: 'a0B9X0000004BQeUAM',
  'Hawaiian Creole': 'a0B9X0000004BQfUAM',
  Hebrew: 'a0B9X0000004BQgUAM',
  Hiligaynon: 'a0B9X0000004BQhUAM',
  Hindi: 'a0B9X0000004BQiUAM',
  Hungarian: 'a0B9X0000004BQjUAM',
  Icelandic: 'a0B9X0000004BQkUAM',
  Igbo: 'a0B9X0000004BQlUAM',
  Ilocano: 'a0B9X0000004BQmUAM',
  'Indonesian (Bahasa Indonesia)': 'a0B9X0000004BQnUAM',
  'Inuit/Inupiaq': 'a0B9X0000004BQoUAM',
  'Irish Gaelic': 'a0B9X0000004BQpUAM',
  Italian: 'a0B9X0000004BQqUAM',
  Japanese: 'a0B9X0000004BQrUAM',
  Jarai: 'a0B9X0000004BQsUAM',
  Javanese: 'a0B9X0000004BQtUAM',
  'Kâicheâ': 'a0B9X0000004BQuUAM',
  Kabyle: 'a0B9X0000004BQvUAM',
  Kannada: 'a0B9X0000004BQwUAM',
  Kashmiri: 'a0B9X0000004BQxUAM',
  Kazakh: 'a0B9X0000004BQyUAM',
  Khmer: 'a0B9X0000004BQzUAM',
  Khoekhoe: 'a0B9X0000004BR0UAM',
  Korean: 'a0B9X0000004BR1UAM',
  Kurdish: 'a0B9X0000004BR2UAM',
  Kyrgyz: 'a0B9X0000004BR3UAM',
  Lao: 'a0B9X0000004BR4UAM',
  Latin: 'a0B9X0000004BR5UAM',
  Latvian: 'a0B9X0000004BR6UAM',
  Lingala: 'a0B9X0000004BR7UAM',
  Lithuanian: 'a0B9X0000004BR8UAM',
  Macedonian: 'a0B9X0000004BR9UAM',
  Maithili: 'a0B9X0000004BRAUA2',
  Malagasy: 'a0B9X0000004BRBUA2',
  'Malay (Bahasa Melayu)': 'a0B9X0000004BRCUA2',
  Malayalam: 'a0B9X0000004BRDUA2',
  'Mandarin (Chinese)': 'a0B9X0000004BREUA2',
  Marathi: 'a0B9X0000004BRFUA2',
  Mende: 'a0B9X0000004BRGUA2',
  Mongolian: 'a0B9X0000004BRHUA2',
  Nahuatl: 'a0B9X0000004BRIUA2',
  Navajo: 'a0B9X0000004BRJUA2',
  Nepali: 'a0B9X0000004BRKUA2',
  Norwegian: 'a0B9X0000004BRLUA2',
  Ojibwa: 'a0B9X0000004BRMUA2',
  Oriya: 'a0B9X0000004BRNUA2',
  Oromo: 'a0B9X0000004BROUA2',
  Pashto: 'a0B9X0000004BRPUA2',
  Persian: 'a0B9X0000004BRQUA2',
  Polish: 'a0B9X0000004BRRUA2',
  Portuguese: 'a0B9X0000004BRSUA2',
  Punjabi: 'a0B9X0000004BRTUA2',
  Quechua: 'a0B9X0000004BRUUA2',
  Romani: 'a0B9X0000004BRVUA2',
  Romanian: 'a0B9X0000004BRWUA2',
  Russian: 'a0B9X0000004BRXUA2',
  Rwanda: 'a0B9X0000004BRYUA2',
  Samoan: 'a0B9X0000004BRZUA2',
  Sanskrit: 'a0B9X0000004BRaUAM',
  Serbian: 'a0B9X0000004BRbUAM',
  Shona: 'a0B9X0000004BRcUAM',
  Sindhi: 'a0B9X0000004BRdUAM',
  Sinhala: 'a0B9X0000004BReUAM',
  Slovak: 'a0B9X0000004BRfUAM',
  Slovene: 'a0B9X0000004BRgUAM',
  Somali: 'a0B9X0000004BRhUAM',
  Spanish: 'a0B9X0000004BRiUAM',
  Swahili: 'a0B9X0000004BRjUAM',
  Swedish: 'a0B9X0000004BRkUAM',
  Tachelhit: 'a0B9X0000004BRlUAM',
  Tagalog: 'a0B9X0000004BRmUAM',
  Tajiki: 'a0B9X0000004BRnUAM',
  Tamil: 'a0B9X0000004BRoUAM',
  Tatar: 'a0B9X0000004BRpUAM',
  Telugu: 'a0B9X0000004BRqUAM',
  Thai: 'a0B9X0000004BRrUAM',
  'Tibetic languages': 'a0B9X0000004BRsUAM',
  Tigrigna: 'a0B9X0000004BRtUAM',
  'Tok Pisin': 'a0B9X0000004BRuUAM',
  Turkish: 'a0B9X0000004BRvUAM',
  Turkmen: 'a0B9X0000004BRwUAM',
  Ukrainian: 'a0B9X0000004BRxUAM',
  Urdu: 'a0B9X0000004BRyUAM',
  Uyghur: 'a0B9X0000004BRzUAM',
  Uzbek: 'a0B9X0000004BS0UAM',
  Vietnamese: 'a0B9X0000004BS1UAM',
  Warlpiri: 'a0B9X0000004BS2UAM',
  Welsh: 'a0B9X0000004BS3UAM',
  Wolof: 'a0B9X0000004BS4UAM',
  Xhosa: 'a0B9X0000004BS5UAM',
  Yakut: 'a0B9X0000004BS6UAM',
  Yiddish: 'a0B9X0000004BS7UAM',
  Yoruba: 'a0B9X0000004BS8UAM',
  Yucatec: 'a0B9X0000004BS9UAM',
  Zapotec: 'a0B9X0000004BSAUA2',
  Zulu: 'a0B9X0000004BSBUA2',
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

async function insertContactFn(p) {
  const result = await conn.sobject('Contact').create({
    // AccountId: '0019X000002URWKQA4',
    RecordTypeId: '0121i000000HMq9AAG',
    Loopback_User_ID__c: p.redUserId,
    FirstName: `${p.firstName ? p.firstName.toLocaleLowerCase() : ''}`,
    LastName: `${p.lastName ? p.lastName.toLocaleLowerCase() : ''}`,
    redi_Contact_Gender__c: p.gender ? p.gender.toUpperCase() : 'OTHER',
    ReDI_Birth_Date__c: p.birthDate,
    LinkedIn_Profile__c: p.linkedInProfileUrl,
    ReDI_GitHub_Profile__c: p.githubProfileUrl,
    ReDI_Slack_Username__c: p.slackUsername,
    MobilePhone: p.telephoneNumber,
  })
  return { ...p, sfContactId: result.id }
}

function insertContact(p) {
  return of(p).pipe(
    switchMap(
      (x) => from(insertContactFn(p.contact)),
      (outer, inner) => ({ ...outer, contact: inner })
    ),
    retryWithDelay(DELAY, RETRIES)
  )
}
async function insertConnectProfileFn(p) {
  const result = await conn.sobject('ReDI_Connect_Profile__c').create({
    Contact__c: p.contact.sfContactId,
    RecordTypeId:
      p.redProfile.userType.indexOf('mentor') !== -1 ? MENTOR : MENTEE,
    Profile_Status__c: redProfileToProfileStatus(p.redProfile),
    ReDI_Location__c: p.redProfile.rediLocation,
    Occupation__c: p.redProfile.mentor_occupation,

    Work_Place__c: p.redProfile.mentor_workPlace,
    Expectations__c: p.redProfile.expectations
      ? p.redProfile.expectations.substr(0, 1000)
      : undefined,
    Occupation_Category__c: p.redProfile.mentee_occupationCategoryId,
    Place_of_Employment__c: p.redProfile.mentee_occupationJob_placeOfEmployment,
    Job_Title__c: p.redProfile.mentee_occupationJob_position,
    Study_Place__c: p.redProfile.mentee_occupationStudent_studyPlace,
    Study_Name__c: p.redProfile.mentee_occupationStudent_studyName,
    Desired_Job__c: p.redProfile.mentee_occupationLookingForJob_what,
    Main_Occupation_Other__c: p.redProfile.mentee_occupationOther_description,
    Education__c: p.redProfile.mentee_highestEducationLevel,
    ReDI_Course__c: p.redProfile.mentee_currentlyEnrolledInCourse || 'alumni',
    Avatar_Image_URL__c:
      'https://s3-eu-west-1.amazonaws.com/redi-connect-profile-avatars/' +
      p.redProfile.profileAvatarImageS3Key,
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
    // CreatedDate: p.createdAt, //! Use Jonida trick
    // LastModifiedDate: p.updatedAt, //! Use Jonida trick
  })
  return { ...p.redProfile, sfConnectProfileId: result.id }
}
function insertConnectProfile(p) {
  return of(p).pipe(
    switchMap(
      (x) => from(insertConnectProfileFn(p)),
      (outer, inner) => ({ ...outer, redProfile: inner })
    ),
    retryWithDelay(DELAY, RETRIES)
  )
}

async function insertMentoringSessionFn(p) {
  console.log('trying to insert mentoring session', p.id)
  const result = await conn.sobject('Mentoring_Session__c').create({
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

async function insertMatchFn(p) {
  console.log('trying to insert match', p.id)
  const result = await conn.sobject('Mentorship_Match__c').create({
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
    Status__c: p.status,
    Mentee__c: REDPROFILE_SFCONTACT[p.menteeId],
    Mentor__c: REDPROFILE_SFCONTACT[p.mentorId],
  })
  return { ...p, sfId: result.id }
}
function insertMatch(p) {
  return of(p).pipe(
    switchMap((x) => from(insertMatchFn(p))),
    retryWithDelay(DELAY, RETRIES)
  )
}

async function insertJobseekerProfileFn(p) {
  const jobseekerResult = await conn.sobject('Jobseeker_Profile__c').create({
    Contact__c: p.contact.sfContactId,
    ReDI_Location__c: p.tpJobseekerProfile.rediLocation,
    ReDI_Course__c: p.tpJobseekerProfile.currentlyEnrolledInCourse,
    Avatar_Image_URL__c:
      'https://s3-eu-west-1.amazonaws.com/redi-connect-profile-avatars/' +
      p.tpJobseekerProfile.profileAvatarImageS3Key,
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
    Profile_Status__c: p.tpJobseekerProfile.state,
    // CreatedDate: p.tpJobseekerProfile.createdAt,//! Use Jonida trick
    // LastModifiedDate: p.tpJobseekerProfile.updatedAt,//! Use Jonida trick
    Is_Job_Fair_2022_Participant__c:
      p.tpJobseekerProfile.isJobFair2022Participant,
    Is_Visible_to_Companies__c:
      p.tpJobseekerProfile.isProfileVisibleToCompanies,
  })
  const RECORD_TYPE_EXPERIENCE = '0129X0000001RUPQA2'
  const RECORD_TYPE_EDUCATION = '0129X0000001RSnQAM'

  if (p.tpJobseekerProfile.experience) {
    for (const experienceItem of p.tpJobseekerProfile.experience) {
      await conn.sobject('Jobseeker_Line_Item__c').create({
        Jobseeker_Profile__c: jobseekerResult.id,
        RecordTypeId: RECORD_TYPE_EXPERIENCE,
        Description__c: experienceItem.description,
        Institution_City__c: experienceItem.institutionCity,
        Institution_Country__c: experienceItem.institutionCountry,
        Institution_Name__c: experienceItem.institutionName,
        Name: experienceItem.title,
        Certification_Type__c: experienceItem.certificationType,
        Description__c: experienceItem.description,
        Start_Date_Month__c: experienceItem.startDateMonth,
        Start_Date_Year__c: experienceItem.startDateYear,
        End_Date_Month__c: experienceItem.endDateMonth,
        End_Date_Year__c: experienceItem.endDateYear,
        Current__c: experienceItem.current,
      })
      console.log('inserted jobseeker experience item')
    }
  }
  if (p.tpJobseekerProfile.experience) {
    for (const experienceItem of p.tpJobseekerProfile.experience) {
      await conn.sobject('Jobseeker_Line_Item__c').create({
        Jobseeker_Profile__c: jobseekerResult.id,
        RecordTypeId: RECORD_TYPE_EDUCATION,
        Description__c: experienceItem.description,
        City__c: experienceItem.city,
        Name: experienceItem.title,
        Country__c: experienceItem.country,
        Company__c: experienceItem.company,
        Description__c: experienceItem.description,
        Start_Date_Month__c: experienceItem.startDateMonth,
        Start_Date_Year__c: experienceItem.startDateYear,
        End_Date_Month__c: experienceItem.endDateMonth,
        End_Date_Year__c: experienceItem.endDateYear,
        Current__c: experienceItem.current,
      })
      console.log('inserted jobseeker education item')
    }
  }
  if (p.tpJobseekerProfile.workingLanguages) {
    for (const langItem of p.tpJobseekerProfile.workingLanguages) {
      await conn.sobject('hed__Contact_Language__c').create({
        hed__Contact__c: p.contact.sfContactId,
        hed__Fluency__c: langItem.proficiencyLevelId,
        hed__Language__c: LANGUAGE_TO_ID_MAP[langItem.language],
      })
      console.log('inserted jobseeker langauge record')
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
    retryWithDelay(DELAY, RETRIES)
  )
}

async function insertAccountForCompanyProfileFn(p) {
  const accountResult = await conn.sobject('Account').create({
    ReDI_Avatar_Image_URL__c:
      'https://s3-eu-west-1.amazonaws.com/redi-connect-profile-avatars/' +
      p.tpCompanyProfile.profileAvatarImageS3Key,
    Name: p.tpCompanyProfile.companyName,
    Location__c: p.tpCompanyProfile.location,
    ReDI_Tagline__c: p.tpCompanyProfile.tagline,
    Industry: p.tpCompanyProfile.industry,
    Website: p.tpCompanyProfile.website,
    ReDI_LinkedIn_Page__c: p.tpCompanyProfile.linkedInUrl,
    Phone: p.tpCompanyProfile.phoneNumber,
    Description: p.tpCompanyProfile.about,
    ReDI_Talent_Pool_State__c: p.tpCompanyProfile.state,
    ReDI_Visible_to_Jobseekers__c:
      p.tpCompanyProfile.isProfileVisibleToJobseekers,
    // CreatedDate: p.createdAt, //! Use Jonida trick
    // LastModifiedDate: p.updatedAt, //! Use Jonida trick
  })
  const accountContactResult = await conn
    .sobject('AccountContactRelation')
    .create({
      AccountId: accountResult.id,
      ContactId: p.contact.sfContactId,
      ReDI_Company_Representative_Status__c: 'APPROVED',
      Roles: 'TALENT_POOL_COMPANY_REPRESENTATIVE',
    })
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
      const jobListingResult = await conn.sobject('Job_Listing__c').create({
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

        // createdAt: Date //! Use Jonida trick
        // updatedAt: Date //! Use Jonida trick
      })
      TPJOBLISTING_SFJOBLISTING[jobListing.id] = jobListingResult.id
      console.log('inserted job listing')
    }
  }
  return {
    ...p,
    sfAccountId: accountResult.id,
    sfAccountContactId: accountContactResult.id,
  }
}
function insertAccountForCompanyProfile(p) {
  return of(p).pipe(
    switchMap(
      (x) => from(insertAccountForCompanyProfileFn(p)),
      (outer, inner) => ({ ...outer, tpCompanyProfile: inner })
    ),
    retryWithDelay(DELAY, RETRIES)
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
    redUser.contact = Object.assign({}, redUser.contact, fieldsAndValues)
  })

  return redUser
}

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
    .map((u) => {
      if (
        u.conProfile &&
        u.conProfile.mentee_currentlyEnrolledInCourse ===
          'munich_frontendDevelopment'
      ) {
        u.conProfile.mentee_currentlyEnrolledInCourse = 'munich_frontend1'
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
          u.tpJobseekerProfile.currentlyEnrolledInCourse ===
          'munich_dataScience'
        ) {
          delete u.tpJobseekerProfile.currentlyEnrolledInCourse
        }
        if (
          u.tpJobseekerProfile.currentlyEnrolledInCourse ===
          'intermediatePython'
        ) {
          delete u.tpJobseekerProfile.currentlyEnrolledInCourse
        }
        if (
          u.tpJobseekerProfile.currentlyEnrolledInCourse ===
          'nrw_webDesignFundamentals'
        ) {
          delete u.tpJobseekerProfile.currentlyEnrolledInCourse
        }
        if (
          u.tpJobseekerProfile.currentlyEnrolledInCourse ===
          'munich_frontendDevelopment'
        ) {
          u.tpJobseekerProfile.currentlyEnrolledInCourse = 'munich_frontend1'
        }
        if (u.tpJobseekerProfile.currentlyEnrolledInCourse === 'uiUxDesign') {
          u.tpJobseekerProfile.currentlyEnrolledInCourse = 'uiUxDesignBasics'
        }
        if (u.tpJobseekerProfile.currentlyEnrolledInCourse === 'webDesign') {
          u.tpJobseekerProfile.currentlyEnrolledInCourse = 'uiUxDesignBasics'
        }
        if (u.tpJobseekerProfile.currentlyEnrolledInCourse === 'introPython') {
          u.tpJobseekerProfile.currentlyEnrolledInCourse = 'pythonFoundation'
        }
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
  // .filter((u) => u.tpCompanyProfile)

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
  // console.log('conMatches', allConMatches.length)
  // console.log('conMentoringSessions', allConMentoringSessions.length)
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
  // console.log('tpJobseekerCvs', allTpJobseekerCvs.length)

  // const someConProfiles = _.take(allConProfiles, 50)

  await conn.login(USERNAME, `${PASSWORD}${SECURITY_TOKEN}`)

  await from(allUsers)
    .pipe(
      // ! Contacts
      mergeMap((u) => insertContact(u), CONCURRENCY),
      tap((u) => console.log('Inserted Contact #', u.contact.sfContactId)),

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

  console.log(allUsers)

  // await from(allConProfiles)
  //   .pipe(
  //     mergeMap((p) => insertContact(p), CONCURRENCY),
  //     tap((p) => console.log('Inserted Contact #', p.sfContactId)),
  //     mergeMap((p) => insertConnectProfile(p), CONCURRENCY),
  //     tap((p) => console.log('Inserted ConProfile #', p.sfConnectProfileId)),
  //     tap(({ id, sfContactId, sfConnectProfileId }) => {
  //       REDPROFILE_SFCONTACT[id] = sfContactId
  //       REDPROFILE_SFCONNECTPROFILE[id] = sfConnectProfileId
  //     }),
  //     scan((acc, curr) => acc + 1, 0),
  //     tap(console.log)
  //   )
  //   .toPromise()

  // fs.writeFileSync('./map.json', JSON.stringify(REDPROFILE_SFCONTACT))

  // const json = fs.readFileSync('./map.json')

  // REDPROFILE_SFCONTACT = JSON.parse(json)

  // await from(allConMentoringSessions)
  //   .pipe(
  //     filter((p) => p.mentorId && p.menteeId),
  //     filter(
  //       (p) =>
  //         REDPROFILE_SFCONTACT[p.mentorId] && REDPROFILE_SFCONTACT[p.menteeId]
  //     ),
  //     mergeMap((p) => insertMentoringSession(p), CONCURRENCY / 2),
  //     tap((p) => console.log('Inserted Mentoring Session #', p.sfId)),
  //     scan((acc, curr) => acc + 1, 0),
  //     tap(console.log)
  //   )
  //   .toPromise()

  // await from(allConMatches)
  //   .pipe(
  //     filter((p) => p.mentorId && p.menteeId),
  //     filter(
  //       (p) =>
  //         REDPROFILE_SFCONTACT[p.mentorId] && REDPROFILE_SFCONTACT[p.menteeId]
  //     ),
  //     mergeMap((p) => insertMatch(p), CONCURRENCY / 2),
  //     tap((p) => console.log('Inserted Match #', p.sfId)),
  //     scan((acc, curr) => acc + 1, 0),
  //     tap(console.log)
  //   )
  //   .toPromise()
})()

function redProfileToProfileStatus(redProfile) {
  const userType = redProfile.userType
  if (userType.indexOf('pending') !== -1) return 'PENDING'

  if (userType.indexOf('rejected') !== -1) return 'REJECTED'

  if (!redProfile.userActivated) return 'DEACTIVATED'

  return 'APPROVED'
}
