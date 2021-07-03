import React from 'react'
import { LoggedIn } from '../../../components/templates'
import { Columns, Element } from 'react-bulma-components'
import { useTpCompanyProfileQuery } from '../../../react-query/use-tpcompanyprofile-query'
import { useTpJobFair2021InterviewMatch_tpJobseekerProfilesQuery } from '../../../react-query/use-tpjobfair2021interviewmatch-tpjobseekerprofiles-query'
import { JobseekerProfileCard } from '../../../components/organisms/JobSeekerProfileCard'
import { useHistory } from 'react-router'

export function BrowseCompany() {
  const history = useHistory()
  const {
    data: jobseekerProfiles,
  } = useTpJobFair2021InterviewMatch_tpJobseekerProfilesQuery()

  console.log(jobseekerProfiles)

  return (
    <LoggedIn>
      <Element
        renderAs="h4"
        textSize={3}
        responsive={{ mobile: { textSize: { value: 7 } } }}
        className="is-flex-grow-1"
        style={{ flexGrow: 1 }}
      >
        Our top candidates for you
      </Element>
      <Element
        renderAs="p"
        textSize={4}
        responsive={{ mobile: { textSize: { value: 5 } } }}
        className="oneandhalf-bs"
      >
        Your job postings have been matched with {jobseekerProfiles?.length}{' '}
        jobseekers
      </Element>
      <Element
        renderAs="p"
        textSize={5}
        responsive={{ mobile: { textSize: { value: 6 } } }}
        className="oneandhalf-bs"
      >
        Now you can view the job posting and the company profile to get ready
        for your interview.
      </Element>
      <Columns>
        {jobseekerProfiles?.map((profile) => (
          <Columns.Column mobile={{ size: 12 }} tablet={{ size: 6 }}>
            <JobseekerProfileCard
              key={profile.id}
              jobseekerProfile={profile}
              onClick={() =>
                history.push(`/app/jobseeker-profile/${profile.id}`)
              }
            />
          </Columns.Column>
        ))}
      </Columns>
    </LoggedIn>
  )
}
