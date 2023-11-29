import { CardTags, Icon } from '@talent-connect/shared-atomic-design-components'
import {
  desiredPositionsIdToLabelMap,
  topSkillsIdToLabelMap,
} from '@talent-connect/talent-pool/config'
import React from 'react'
import { Card, Element, Tag } from 'react-bulma-components'
import { NavLink } from 'react-router-dom'
import placeholderImage from '../../assets/img-placeholder.png'
import { JobseekerProfileCardJobseekerProfilePropFragment } from './JobseekerProfileCard.generated'
import './JobseekerProfileCard.scss'
interface JobseekerProfileCardProps {
  jobseekerProfile: JobseekerProfileCardJobseekerProfilePropFragment
  linkTo?: string
  isFavorite?: boolean
  toggleFavorite?: (id: string) => void
}

export function JobseekerProfileCard({
  jobseekerProfile,
  linkTo,
  toggleFavorite,
  isFavorite,
}: JobseekerProfileCardProps) {
  const fullName = jobseekerProfile?.fullName
  const desiredPositions =
    jobseekerProfile?.desiredPositions
      ?.map((position) => desiredPositionsIdToLabelMap[position])
      .join(', ') ?? ''
  const topSkills = jobseekerProfile?.topSkills

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault()
    toggleFavorite && toggleFavorite(jobseekerProfile.id)
  }

  const imgSrc = jobseekerProfile?.profileAvatarImageS3Key
    ? jobseekerProfile?.profileAvatarImageS3Key
    : placeholderImage

  return (
    <NavLink to={linkTo} className="jobseeker-profile-link">
      <Card className="jobseeker-profile-card">
        <Card.Image
          className="jobseeker-profile-card__image"
          src={imgSrc}
          alt={fullName}
        />
        <Card.Content>
          {jobseekerProfile.isHired ? (
            <Tag className="jobseeker-profile-card__hired-tag">HIRED!</Tag>
          ) : null}
          {toggleFavorite && (
            <div
              className="jobseeker-profile-card__favorite"
              onClick={handleFavoriteClick}
            >
              <Icon
                icon={isFavorite ? 'heartFilled' : 'heart'}
                className="jobseeker-profile-card__favorite__icon"
              />
            </div>
          )}
          <Element
            key="name"
            renderAs="h3"
            textWeight="bold"
            textSize={4}
            className="jobseeker-profile-card__job-title"
          >
            {fullName}
          </Element>
          <Element
            className="content jobseeker-profile-card__company-name"
            key="location"
            renderAs="div"
          >
            {desiredPositions}
          </Element>
          {topSkills?.length > 0 ? (
            <CardTags
              items={topSkills}
              showMobileTags
              formatter={(skill: string) => topSkillsIdToLabelMap[skill]}
            />
          ) : null}
        </Card.Content>
      </Card>
    </NavLink>
  )
}
