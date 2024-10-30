import { Heading, Icon } from '@talent-connect/shared-atomic-design-components'
import React from 'react'
import './CareerPartnerBanner.scss'

interface CareerPartnerBannerProps {
  partnerSince: Date
  jobsPosted: number
}

const CareerPartnerBanner: React.FC<CareerPartnerBannerProps> = ({
  partnerSince,
  jobsPosted,
}) => {
  return (
    <div className="career-partner-banner">
      <div className="career-partner-banner-top">
        <div className="career-partner-banner-top__badge">
          <Icon
            icon="careerPartnerBadge"
            size="large"
            className="career-partner-banner-top__badge-icon"
          />
          <Heading
            size="smaller"
            className="career-partner-banner-top__badge-text"
          >
            Career
            <br />
            Partner
          </Heading>
        </div>
        <span className="career-partner-banner-top__separator" />
        <span className="career-partner-banner-top__since">
          Since
          <br />
          {new Date(partnerSince).getFullYear()}
        </span>
        <span className="career-partner-banner-top__separator" />
        <span className="career-partner-banner-top__jobs-posted">
          {jobsPosted} Jobs
          <br />
          Posted
        </span>
      </div>
      <div className="career-partner-banner-bottom">
        Your job postings get top visibility for jobseekers. Thanks for being
        part of our thriving community!
      </div>
    </div>
  )
}

export default CareerPartnerBanner
