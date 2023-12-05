import { CardTags } from '@talent-connect/shared-atomic-design-components'
import { topSkillsIdToLabelMap } from '@talent-connect/talent-pool/config'
import React from 'react'
import { Card } from 'react-bulma-components'
import { NavLink } from 'react-router-dom'
import LocationIcon from '../../assets/images/Location.svg'
import placeholderImage from '../../assets/images/company-placeholder-img.svg'
import './JobListingCard.scss'
import { JobListingCardJobListingPropFragment } from './jobseeker-profile-editables/JobListingCard.generated'

interface JobListingCardProps {
  jobListing: JobListingCardJobListingPropFragment
  isFavorite?: boolean
  toggleFavorite?: (id: string) => void
  linkTo?: string
  timestamp?: string
  renderCTA?: () => React.ReactNode

  onClick?: (e: React.MouseEvent) => void
}

const CardLocation = ({ location, remote }) => {
  const locationArr = location.split(',')
  const newLocationsString =
    locationArr.length > 3
      ? locationArr.slice(0, 3).join(',') + '...'
      : location

  return (
    <div className="job-posting-card__location-container">
      <img
        src={LocationIcon}
        alt="Location"
        className="job-posting-card__location-icon"
      />
      <p className="job-posting-card__location-text">
        {newLocationsString}
        {remote ? ' | Remote' : ''}
      </p>
    </div>
  )
}

export function JobListingCard({
  jobListing,
  linkTo,
  onClick,
  timestamp,
  renderCTA,
}: JobListingCardProps) {
  const {
    title: jobTitle,
    idealTechnicalSkills,
    companyName,
    location,
    isRemotePossible: remote,
    profileAvatarImageS3Key: companyAvatarImage,
  } = jobListing

  const imgSrc = companyAvatarImage ? companyAvatarImage : placeholderImage

  const InnerCard = () => (
    <Card className="job-posting-card">
      <div className="job-posting-card__columns">
        <div className="job-posting-card__firstColumn is-narrow">
          <img
            className="job-posting-card__image"
            src={imgSrc}
            alt={jobTitle}
          ></img>
        </div>
        <div className="job-posting-card__middleColumn">
          <p className="job-posting-card__job-title">{jobTitle}</p>
          <p className="job-posting-card__company-name">{companyName}</p>
          <CardLocation location={location} remote={remote} />
          {idealTechnicalSkills?.length > 0 ? (
            <div>
              <CardTags
                items={idealTechnicalSkills}
                formatter={(skill: string) => topSkillsIdToLabelMap[skill]}
              />
            </div>
          ) : null}
        </div>
        <div className="job-posting-card__lastColumn">
          <div className="job-posting-card__timeFooterBox">
            {renderCTA && renderCTA()}
            {timestamp && (
              <div className="job-posting-card__timestamp">{timestamp}</div>
            )}
          </div>
        </div>
      </div>
    </Card>
  )

  if (onClick || linkTo) {
    return (
      <NavLink
        to={linkTo ?? '#'}
        onClick={onClick}
        className="job-posting-link"
      >
        <InnerCard />
      </NavLink>
    )
  }

  return <InnerCard />
}
