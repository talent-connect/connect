import {
  useTpJobListingDeleteMutation,
  useTpJobListingPatchMutation,
} from '@talent-connect/data-access'
import { formatDistance } from 'date-fns'
import { useCallback, useState } from 'react'
import { Columns, Element } from 'react-bulma-components'
import { useQueryClient } from 'react-query'
import { CardContextMenu } from '../molecules/CardContextMenu'
import { EmptySectionPlaceholder } from '../molecules/EmptySectionPlaceholder'
import { LightModal } from '../molecules/LightModal'
import { JobListingCard } from './JobListingCard'
import JobPlaceholderCardUrl from './company-profile-editables/job-placeholder-card.svg'

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

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const handleDeleteModalClose = useCallback(
    () => setIsDeleteModalOpen(false),
    []
  )
  const deleteMutation = useTpJobListingDeleteMutation()
  const handleDelete = useCallback(
    (id: string) => {
      handleDeleteModalClose()
      deleteMutation.mutate(
        { input: { id } },
        {
          onSuccess: () => {
            queryClient.invalidateQueries()
          },
        }
      )
    },
    [deleteMutation, handleDeleteModalClose, queryClient]
  )

  const isEmpty = jobListings?.length === 0

  const renderTimestamp = (expiresAt) =>
    `Expired ${formatDistance(new Date(expiresAt), new Date(), {
      addSuffix: true,
    })}`

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
                  renderCTA={() => (
                    <CardContextMenu
                      menuItems={[
                        {
                          label: 'Reactivate',
                          onClick: () => onReactivateCTAClick(jobListing.id),
                          icon: 'refresh',
                        },
                        {
                          label: 'Delete',
                          onClick: () => setIsDeleteModalOpen(true),
                          icon: 'delete',
                        },
                      ]}
                    >
                      <LightModal
                        isOpen={isDeleteModalOpen}
                        handleClose={handleDeleteModalClose}
                        headline="Delete job posting"
                        message="You will loose all the information entered for this job posting."
                        ctaLabel="Delete"
                        ctaOnClick={() => handleDelete(jobListing.id)}
                        cancelLabel="Keep it"
                      />
                    </CardContextMenu>
                  )}
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
