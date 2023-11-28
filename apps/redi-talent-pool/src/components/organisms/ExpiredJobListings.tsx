import { useTpJobListingPatchMutation } from '@talent-connect/data-access'
import { Button } from '@talent-connect/shared-atomic-design-components'
import { formatDistance } from 'date-fns'
import { Columns, Element } from 'react-bulma-components'
import { useQueryClient } from 'react-query'
import { EmptySectionPlaceholder } from '../molecules/EmptySectionPlaceholder'
import JobPlaceholderCardUrl from './company-profile-editables/job-placeholder-card.svg'
import { JobListingCard } from './JobListingCard'

export function ExpiredJobListings({ jobListings }) {
  const updateMutation = useTpJobListingPatchMutation()
  const queryClient = useQueryClient()

  const onReactivateCTAClick = (jobListingId) => {
    updateMutation.mutate(
      {
        input: {
          id: jobListingId,
          // TODO: expiresAt should be set at Backend side
          expiresAt: new Date().setMonth(new Date().getMonth() + 6),
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries()
        },
      }
    )
  }

  const isEmpty = jobListings?.length === 0

  const renderTimestamp = (expiresAt) =>
    `Expired ${formatDistance(new Date(expiresAt), new Date(), {
      addSuffix: true,
    })}`

  const renderReactivateCTA = (jobListingId) => {
    return (
      <Button simple onClick={() => onReactivateCTAClick(jobListingId)}>
        Reactivate
      </Button>
    )
  }

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
          Expired Job Postings
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
              <Columns.Column size={12}>
                <JobListingCard
                  key={jobListing.id}
                  jobListing={jobListing}
                  renderCTA={() => renderReactivateCTA(jobListing.id)}
                  timestamp={renderTimestamp(jobListing.expiresAt)}
                />
              </Columns.Column>
            ))}
          </Columns>
        )}
      </div>
    </div>
  )
}
