const _ = require('lodash')
const moment = require('moment')

const app = require('../server/server')

const TpCompanyProfile = app.models.TpCompanyProfile
const TpJobListing = app.models.TpJobListing

let counter = 0

async function doStuff() {
  const allProfiles = await TpCompanyProfile.find({})
  allProfiles.forEach(async (profile) => {
    if (profile.jobListings) counter += profile.jobListings.length
    // await profile.updateAttribute('birthDate', birthDate)
  })

  console.log(counter)

  const jobListingsToInsert = allProfiles.map((p) => {
    const listings = (p?.jobListings || []).map((listing) => {
      return {
        title: listing.title,
        location: listing.location,
        summary: listing.summary,
        idealTechnicalSkills: listing.idealTechnicalSkills,
        relatesToPositions: listing.relatesToPositions,
        employmentType: listing.employmentType,
        languageRequirements: listing.languageRequirements,
        desiredExperience: listing.desiredExperience,
        salaryRange: listing.salaryRange,

        redUserId: p.redUserId,
        tpCompanyProfileId: p.id,
      }
    })
    listings.forEach(async (listing) => {
      TpJobListing.create(listing, (err, inst) => {
        if (err) console.log('err')
        else console.log('inserted')
        console.log(inst)
      })
    })
    p.updateAttribute('jobListings', null, (err) => {})
  })
}

doStuff()
