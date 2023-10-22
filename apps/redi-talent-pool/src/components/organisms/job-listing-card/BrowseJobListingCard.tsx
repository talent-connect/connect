import { NavLink } from 'react-router-dom'
import { JobListingCard, JobListingCardProps } from './JobListingCard'

interface BrowseJobListingCardProps extends JobListingCardProps {
  linkTo?: string
}

export function BrowseJobListingCard({
  linkTo = '#',
  ...jobListingCardProps
}: BrowseJobListingCardProps) {
  return (
    <NavLink to={linkTo} className="job-posting-link">
      <JobListingCard {...jobListingCardProps} />
    </NavLink>
  )
}
