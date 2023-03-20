import { Icon } from '@talent-connect/shared-atomic-design-components'
import { isBefore } from 'date-fns'
import { useCallback, useState, useEffect } from 'react'
import { Columns, Element } from 'react-bulma-components'

import { useTpJobListingAllQuery } from '../../../react-query/use-tpjoblisting-all-query'

import { EmptySectionPlaceholder } from '../../molecules/EmptySectionPlaceholder'
import { JobListingCard } from '../JobListingCard'
import { EditableJobPostingForm } from './EditableJobPostingForm'
import JobPlaceholderCardUrl from './job-placeholder-card.svg'

export function EditableJobPostings({
  isJobPostingFormOpen,
  setIsJobPostingFormOpen,
}) {
  const { data: jobListings } = useTpJobListingAllQuery()

  const activeJobListings = jobListings?.filter(
    (jobListing) =>
      jobListing.expiresAt == null ||
      isBefore(new Date(), new Date(jobListing.expiresAt))
  )

  const hasActiveJobListings = activeJobListings?.length > 0

  const expiredJobListings = jobListings?.filter(
    (jobListing) =>
      jobListing.expiresAt != null &&
      isBefore(new Date(jobListing.expiresAt), new Date())
  )

  const hasExpiredJobListings = expiredJobListings?.length > 0

  const [isEditing, setIsEditing] = useState(false)
  const [idOfTpJobListingBeingEdited, setIdOfTpJobListingBeingEdited] =
    useState<string | null>(null) // null = "new"

  const startAdding = useCallback(() => {
    setIdOfTpJobListingBeingEdited(null) // means "new"
    setIsEditing(true)
  }, [])

  const startEditing = useCallback((id: string) => {
    setIdOfTpJobListingBeingEdited(id)
    setIsEditing(true)
  }, [])

  useEffect(() => {
    if (isJobPostingFormOpen) {
      setIsEditing(true)
    }
  }, [isJobPostingFormOpen])

  useEffect(() => {
    if (!isEditing) {
      setIsJobPostingFormOpen(false)
    }
  }, [isEditing, setIsJobPostingFormOpen])

  const handleStartEditingClick = (id, e: React.MouseEvent) => {
    e.preventDefault()
    startEditing(id)
  }

  return (
    <>
      <div className="profile-section">
        <div className="profile-section--title is-flex is-flex-direction-row">
          <Element
            renderAs="h4"
            textSize={4}
            responsive={{ mobile: { textSize: { value: 7 } } }}
            className="is-flex-grow-1"
            style={{ flexGrow: 1 }}
          >
            Active job postings
          </Element>
          <div className="icon__button" onClick={startAdding}>
            <Icon icon="plus" />
          </div>
        </div>
        <div className="profile-section--body mb-4">
          {!hasActiveJobListings ? (
            <EmptySectionPlaceholder
              height="none"
              onClick={() => setIsEditing(true)}
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
              >
                <div
                  style={{
                    backgroundColor: 'white',
                    border: '1px solid #58ADC4',
                    color: '#58ADC4',
                    padding: '0.5rem 5rem',
                  }}
                >
                  Add your job postings
                </div>
              </div>
            </EmptySectionPlaceholder>
          ) : (
            <Columns>
              {activeJobListings?.map((jobListing) => (
                <Columns.Column mobile={{ size: 12 }} tablet={{ size: 6 }}>
                  <JobListingCard
                    key={jobListing.id}
                    jobListing={jobListing}
                    onClick={(e) => handleStartEditingClick(jobListing.id, e)}
                  />
                </Columns.Column>
              ))}
            </Columns>
          )}
        </div>
      </div>
      <div className="profile-section">
        <div className="profile-section--title is-flex is-flex-direction-row">
          <Element
            renderAs="h4"
            textSize={4}
            responsive={{ mobile: { textSize: { value: 7 } } }}
            className="is-flex-grow-1"
            style={{ flexGrow: 1 }}
          >
            Expired job postings
          </Element>
        </div>
        <div className="profile-section--body">
          {!hasExpiredJobListings ? (
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
          ) : (
            <Columns>
              {expiredJobListings?.map((jobListing) => (
                <Columns.Column mobile={{ size: 12 }} tablet={{ size: 6 }}>
                  <JobListingCard
                    key={jobListing.id}
                    jobListing={jobListing}
                    onClick={() => startEditing(jobListing.id)}
                  />
                </Columns.Column>
              ))}
            </Columns>
          )}
        </div>
      </div>
      <EditableJobPostingForm
        tpJobListingId={idOfTpJobListingBeingEdited}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      />
    </>
  )
}
