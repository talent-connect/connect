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
        <div>
          <Icon
            icon="careerPartnerBadge"
            size="large"
            className="career-partner-badge-icon"
          />
          <Heading size="smaller">Career Partner</Heading>
        </div>
        <span className="career-partner-since">
          Since {new Date(partnerSince).getFullYear()}
        </span>
        <span className="career-partner-jobs-posted">
          {jobsPosted} Jobs Posted
        </span>
      </div>
      <div className="career-partner-banner-bottom">
        <p>
          Your job postings get top visibility for jobseekers. Thanks for being
          part of our thriving community!
        </p>
      </div>
    </div>
  )
}

export default CareerPartnerBanner
