import { CardTags, Icon } from '@talent-connect/shared-atomic-design-components'
import { topSkillsIdToLabelMap } from '@talent-connect/talent-pool/config'
import classNames from 'classnames'
import React from 'react'
import { Card, Element } from 'react-bulma-components'
import { JobListingCardJobListingPropFragment } from './JobListingCard.generated'
// import placeholderImage from '../../assets/images/img-placeholder.png'
import './JobListingCard.scss'

export interface JobListingCardProps {
  className?: string
  jobListing: JobListingCardJobListingPropFragment
  isFavorite?: boolean
  toggleFavorite?: (id: string) => void
  onClick?: (e: React.MouseEvent) => void
  renderFooter?: () => JSX.Element
}

export function JobListingCard({
  className,
  jobListing,
  toggleFavorite,
  isFavorite,
  onClick,
  renderFooter,
}: JobListingCardProps) {
  const jobTitle = jobListing?.title
  const idealTechnicalSkills = jobListing?.idealTechnicalSkills

  const companyName = jobListing?.companyName
  const companyAvatarImage = jobListing?.profileAvatarImageS3Key

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault()
    toggleFavorite && toggleFavorite(jobListing.id)
  }

  const imgSrc = companyAvatarImage ? companyAvatarImage : null

  return (
    <Card
      className={classNames('job-posting-card', className)}
      onClick={onClick}
    >
      <Card.Image
        className="job-posting-card__image"
        src={imgSrc}
        alt={jobTitle}
      />
      <Card.Content>
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
        <Element
          key="name"
          renderAs="h3"
          textWeight="bold"
          textSize={4}
          className="job-posting-card__job-title"
        >
          {jobTitle}
        </Element>
        <Element
          className="content job-posting-card__company-name"
          key="location"
          renderAs="div"
        >
          {companyName}
        </Element>
        {idealTechnicalSkills?.length > 0 ? (
          <CardTags
            items={idealTechnicalSkills}
            shortList
            formatter={(skill: string) => topSkillsIdToLabelMap[skill]}
          />
        ) : null}
      </Card.Content>
      {renderFooter && renderFooter()}
    </Card>
  )
}
