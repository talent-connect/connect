import React from 'react'
import { Columns, Element } from 'react-bulma-components'
import { useHistory } from 'react-router-dom'
import { JobListingCard } from '../../../components/organisms/JobListingCard'
import { LoggedIn } from '../../../components/templates'
import { useTpJobFair2021InterviewMatch_tpJobListingsQuery } from '../../../react-query/use-tpjobfair2021interviewmatch-tpjoblistings-query'

export function BrowseJobseeker() {
  const history = useHistory()
  const {
    data: jobListings,
  } = useTpJobFair2021InterviewMatch_tpJobListingsQuery()

  return (
    <LoggedIn>
      <Element
        renderAs="h4"
        textSize={3}
        responsive={{ mobile: { textSize: { value: 7 } } }}
        className="is-flex-grow-1"
        style={{ flexGrow: 1 }}
      >
        Congratulations!
      </Element>
      <Element
        renderAs="p"
        textSize={4}
        responsive={{ mobile: { textSize: { value: 5 } } }}
        className="oneandhalf-bs"
      >
        Your profile has been matched with {jobListings?.length} open job
        positions.
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
        {jobListings?.map((jobListing) => (
          <Columns.Column mobile={{ size: 12 }} tablet={{ size: 6 }}>
            <JobListingCard
              key={jobListing.id}
              jobListing={jobListing}
              onClick={() => history.push(`/app/job-listing/${jobListing.id}`)}
            />
          </Columns.Column>
        ))}
      </Columns>
    </LoggedIn>
  )
}
