import {
  TpJobListingStatus,
  useMyTpDataQuery,
} from '@talent-connect/data-access'
import { Columns, Element } from 'react-bulma-components'
import { EmptySectionPlaceholder } from '../molecules/EmptySectionPlaceholder'
import JobPlaceholderCardUrl from './company-profile-editables/job-placeholder-card.svg'
import { ExpiredJobListingCard } from './job-listing-card/ExpiredJobListingCard'

export function ExpiredJobListings() {
  const myData = useMyTpDataQuery()
  const jobListings = myData.data?.tpCurrentUserDataGet?.jobListings?.filter(
    (joblisting) => joblisting.status === TpJobListingStatus.Expired
  )

  const hasJobListings = jobListings?.length > 0
  const isEmpty = !hasJobListings

  return (
    <div className="profile-section">
      <div className="profile-section--title is-flex is-flex-direction-row">
        <Element
          renderAs="h4"
          textSize={4}
          responsive={{ mobile: { textSize: { value: 7 } } }}
          className="is-flex-grow-1"
          style={{ flexGrow: 1 }}
        >
          Expired Job postings
        </Element>
      </div>

      <div className="profile-section--body">
        {isEmpty ? (
          <EmptySectionPlaceholder
            height="none"
            style={{ padding: '0.7rem 1.2rem 1.7rem 1.2rem' }}
          >
            <div
              style={{
                backgroundImage: `url(${JobPlaceholderCardUrl})`,
                backgroundRepeat: 'x-repeat',
                backgroundSize: 'contain',
                height: '13rem',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            ></div>
          </EmptySectionPlaceholder>
        ) : (
          <Columns>
            {jobListings?.map((jobListing) => (
              <Columns.Column mobile={{ size: 12 }} tablet={{ size: 6 }}>
                <ExpiredJobListingCard
                  key={jobListing.id}
                  jobListing={jobListing}
                />
              </Columns.Column>
            ))}
          </Columns>
        )}
      </div>
    </div>
  )
}
