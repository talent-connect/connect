import React from 'react'
import { Columns, Card, Element } from 'react-bulma-components'
import { NavLink } from 'react-router-dom'

import { CardTags, Icon } from '@talent-connect/shared-atomic-design-components'
import { topSkillsIdToLabelMap } from '@talent-connect/talent-pool/config'
import placeholderImage from '../../assets/images/company-placeholder-img.svg'
import './JobListingCard.scss'
import { JobListingCardJobListingPropFragment } from './jobseeker-profile-editables/JobListingCard.generated'
import LocationIcon from '../../assets/images/Location.svg'

interface JobListingCardProps {
  jobListing: JobListingCardJobListingPropFragment
  isFavorite?: boolean
  toggleFavorite?: (id: string) => void
  linkTo?: string

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
  toggleFavorite,
  isFavorite,
  linkTo = '#',
  onClick,
}: JobListingCardProps) {
  const {
    title: jobTitle,
    idealTechnicalSkills,
    companyName,
    location,
    isRemotePossible: remote,
    profileAvatarImageS3Key: companyAvatarImage,
  } = jobListing

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault()
    toggleFavorite && toggleFavorite(jobListing.id)
  }

  const imgSrc = companyAvatarImage ? companyAvatarImage : placeholderImage

  return (
    <NavLink to={linkTo} onClick={onClick} className="job-posting-link">
      <Card className="job-posting-card">
        <Card.Content className="job-posting-card__content">
          <div className="job-posting-card__columns">
            <div className="job-posting-card__firstColumn is-narrow">
              <img
                className="job-posting-card__image"
                src={imgSrc}
                alt={jobTitle}
              ></img>
            </div>
            <div className="job-posting-card__middleColumn">
              <h4 className="job-posting-card__job-title">{jobTitle}</h4>
              <p className="job-posting-card__company-name">{companyName}</p>
              <CardLocation location={location} remote={remote} />
              {idealTechnicalSkills?.length > 0 ? (
                <div>
                  <CardTags
                    items={idealTechnicalSkills}
                    shortList
                    formatter={(skill: string) => topSkillsIdToLabelMap[skill]}
                  />
                </div>
              ) : null}
            </div>
            <div className="job-posting-card__lastColumn">
              <div className="job-posting-card__timeFooterBox">
                {toggleFavorite && (
                  <div
                    className="job-posting-card__favorite"
                    onClick={handleFavoriteClick}
                  >
                    <Icon
                      icon={isFavorite ? 'heartFilled' : 'heart'}
                      className="job-posting-card__favorite__icon"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card.Content>
      </Card>
    </NavLink>
  )
}
