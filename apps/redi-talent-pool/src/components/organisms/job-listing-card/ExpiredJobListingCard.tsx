import {
  TpJobListingStatus,
  useTpJobListingPatchMutation,
} from '@talent-connect/data-access'
import { Button } from '@talent-connect/shared-atomic-design-components'
import { useCallback } from 'react'
import { Card } from 'react-bulma-components'
import { queryClient } from '../../../services/api/api'
import './ExpiredJobListingCard.scss'
import { JobListingCard, JobListingCardProps } from './JobListingCard'

interface ExpiredJobListingCardProps extends JobListingCardProps {
  onClick?: (e: React.MouseEvent) => void
}

export function ExpiredJobListingCard({
  onClick,
  ...jobListingCardProps
}: ExpiredJobListingCardProps) {
  const updateMutation = useTpJobListingPatchMutation()

  const onReactivateClick = useCallback(() => {
    updateMutation.mutate(
      {
        input: {
          id: jobListingCardProps.jobListing.id,
          status: TpJobListingStatus.Active,
          expiresAt: new Date().setMonth(new Date().getMonth() + 6),
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries()
        },
      }
    )
  }, [jobListingCardProps.jobListing.id, updateMutation])

  const renderFooter = useCallback(() => {
    return (
      <Card.Footer>
        <Button simple onClick={onReactivateClick}>
          Reactivate
        </Button>
      </Card.Footer>
    )
  }, [onReactivateClick])

  return (
    <JobListingCard
      className="job-posting-card__expired"
      renderFooter={renderFooter}
      {...jobListingCardProps}
    />
  )
}
