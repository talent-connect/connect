import React from 'react'
import { Columns, Card, Element } from 'react-bulma-components'
import { NavLink } from 'react-router-dom'

import { CardTags, Icon } from '@talent-connect/shared-atomic-design-components'
import { topSkillsIdToLabelMap } from '@talent-connect/talent-pool/config'
//import placeholderImage from '../../assets/images/img-placeholder.png'
import './JobListingCard.scss'
import { JobListingCardJobListingPropFragment } from './jobseeker-profile-editables/JobListingCard.generated'

interface JobListingCardProps {
  jobListing: JobListingCardJobListingPropFragment
  isFavorite?: boolean
  toggleFavorite?: (id: string) => void
  linkTo?: string
  timeFooter?: string
  onClick?: (e: React.MouseEvent) => void
}

export function JobListingCard({
  jobListing,
  toggleFavorite,
  isFavorite,
  linkTo = '#',
  onClick,
  timeFooter,
}: JobListingCardProps) {
  const jobTitle = jobListing?.title
  const idealTechnicalSkills = jobListing?.idealTechnicalSkills

  const companyName = jobListing?.companyName
  const companyAvatarImage = jobListing?.profileAvatarImageS3Key
  const location = jobListing.location
  const remote = jobListing.isRemotePossible

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault()
    toggleFavorite && toggleFavorite(jobListing.id)
  }

  const imgSrc = companyAvatarImage ? companyAvatarImage : null

  return (
    <NavLink to={linkTo} onClick={onClick} className="job-posting-link">
      <Card className="job-posting-card">
        <Card.Content className="job-posting-card__content">
          <Columns className="job-posting-card__columns">
            <Columns.Column className="job-posting-card__firstColumn is-narrow">
              <Element
                renderAs="img"
                className="job-posting-card__image"
                src={imgSrc}
                alt={jobTitle}
              ></Element>
            </Columns.Column>
            <Columns.Column className="job-posting-card__middleColumn">
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
                key="company"
                renderAs="p"
              >
                {companyName}
              </Element>
              <Element
                className="content job-posting-card__location"
                key="location"
                renderAs="p"
              >
                {location}
                {remote ? ' | Remote' : ''}
              </Element>

              {idealTechnicalSkills?.length > 0 ? (
                <Element renderAs="div">
                  {' '}
                  <CardTags
                    items={idealTechnicalSkills}
                    shortList
                    formatter={(skill: string) => topSkillsIdToLabelMap[skill]}
                  />
                </Element>
              ) : null}
            </Columns.Column>
            <Columns.Column className="job-posting-card__lastColumn">
              <Element
                className="content job-posting-card__timeFooterBox"
                key="company"
                renderAs="div"
              >
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
                {timeFooter && (
                  <Element
                    className="content job-posting-card__timeFooter"
                    key="company"
                    renderAs="p"
                  >
                    {timeFooter}
                  </Element>
                )}
              </Element>
            </Columns.Column>
          </Columns>
        </Card.Content>
      </Card>
    </NavLink>
  )
}
