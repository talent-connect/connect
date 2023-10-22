import './EditableJobListingCard.scss'
import { JobListingCard, JobListingCardProps } from './JobListingCard'

interface EditableJobListingCardProps extends JobListingCardProps {
  onClick?: (e: React.MouseEvent) => void
}

export function EditableJobListingCard({
  onClick,
  ...jobListingCardProps
}: EditableJobListingCardProps) {
  return (
    <JobListingCard
      className="job-posting-card__editable"
      onClick={onClick}
      {...jobListingCardProps}
    />
  )
}
