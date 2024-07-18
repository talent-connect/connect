import { useMediaQuery, useTheme } from '@mui/material'
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
  renderCTA?: () => React.ReactNode

  onClick?: (e: React.MouseEvent) => void
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
