import { Tooltip, useMediaQuery, useTheme } from '@mui/material'
import { CardTags } from '@talent-connect/shared-atomic-design-components'
import { topSkillsIdToLabelMap } from '@talent-connect/talent-pool/config'
import React from 'react'
import { Card } from 'react-bulma-components'
import { NavLink } from 'react-router-dom'
import CardLocation from '../../../../../libs/shared-atomic-design-components/src/lib/atoms/CardLocation'
import placeholderImage from '../../assets/images/company-placeholder-img.svg'
import './JobListingCard.scss'
import { JobListingCardJobListingPropFragment } from './jobseeker-profile-editables/JobListingCard.generated'

interface JobListingCardProps {
  jobListing: JobListingCardJobListingPropFragment
  isFavorite?: boolean
  toggleFavorite?: (id: string) => void
  linkTo?: string
  timestamp?: string
  showPromotedLabel?: boolean
  renderCTA?: () => React.ReactNode

  onClick?: (e: React.MouseEvent) => void
}

export function JobListingCard({
  jobListing,
  linkTo,
  onClick,
  timestamp,
  showPromotedLabel = false,
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

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down(769))
  const isTabletOrDesktop = useMediaQuery(theme.breakpoints.up(769))

  const imgSrc = companyAvatarImage ? companyAvatarImage : placeholderImage

  const InnerCard = () => (
    <Card className="job-posting-card">
      <div className="job-posting-card__columns">
        <div className="job-posting-card__firstColumn is-narrow">
          <img
            className="job-posting-card__image"
            src={imgSrc}
            alt={jobTitle}
          />
          <div style={{ height: '100%' }}>
            {isMobile && renderCTA && renderCTA()}
          </div>
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
            {isTabletOrDesktop && renderCTA && renderCTA()}
            {timestamp &&
              (!showPromotedLabel || !jobListing.isFromCareerPartner) && (
                <div className="job-posting-card__timestamp">{timestamp}</div>
              )}
            {showPromotedLabel && jobListing.isFromCareerPartner && (
              <div className="job-posting-card__timestamp">
                <Tooltip
                  open
                  title={
                    <span className="job-posting-card__tooltip-text">
                      This job listing is promoted because it is posted by a
                      ReDI Career Partner. You can learn more about why we do
                      this by visiting the FAQ section.
                    </span>
                  }
                  placement="top"
                >
                  <span>Promoted</span>
                </Tooltip>
              </div>
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
