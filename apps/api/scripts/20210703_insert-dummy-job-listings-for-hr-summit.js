const _ = require('lodash')
const moment = require('moment')

const app = require('../server/server')

const TpCompanyProfile = app.models.TpCompanyProfile
const TpJobListing = app.models.TpJobListing
const TpJobfair2021InterviewMatch = app.models.TpJobfair2021InterviewMatch

const summary = `You have been scheduled for an interview with this company. Please see details about the interview in the email(s) you've received.`

async function doStuff() {
  const allProfiles = await TpCompanyProfile.find({})
  allProfiles.forEach(async (profile) => {
    const dummyListing = {
      dummy: true,
      title: `Interiew with ${profile.companyName}`,
      // location: listing.location,
      summary: summary,
      // idealTechnicalSkills: listing.idealTechnicalSkills,
      // relatesToPositions: listing.relatesToPositions,
      // employmentType: listing.employmentType,
      // languageRequirements: listing.languageRequirements,
      // desiredExperience: listing.desiredExperience,
      // salaryRange: listing.salaryRange,

      redUserId: profile.redUserId,
      tpCompanyProfileId: profile.id,
    }

    TpJobListing.create(dummyListing, (err, inst) => {
      if (err) console.log('err')
      else console.log('inserted')
    })
  })
}

let counter = 0
async function doMoreStuff() {
  const allMatches = await TpJobfair2021InterviewMatch.find({})
  for (match of allMatches) {
    const dummyJob = await TpJobListing.findOne({
      where: {
        tpCompanyProfileId: match.companyId,
        summary: summary,
      },
    })
    await match.updateAttribute('jobListingId', dummyJob.id)
    counter++
  }
  console.log(counter)
}

doMoreStuff()
