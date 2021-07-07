import { CardTags } from '@talent-connect/shared-atomic-design-components'
import { AWS_PROFILE_AVATARS_BUCKET_BASE_URL } from '@talent-connect/shared-config'
import { TpJobseekerProfile } from '@talent-connect/shared-types'
import {
  desiredPositionsIdToLabelMap,
  topSkillsIdToLabelMap,
} from '@talent-connect/talent-pool/config'
import classnames from 'clsx'
import React from 'react'
import { Card, Element } from 'react-bulma-components'
import './JobseekerProfileCard.scss'
import placeholderImage from '../../assets/img-placeholder.png'

interface JobseekerProfileCardProps {
  jobseekerProfile: TpJobseekerProfile
  onClick?: () => void
  isFavorite?: boolean
  toggleFavorite?: (id: string) => void
}

export function JobseekerProfileCard({
  jobseekerProfile,
  onClick,
  toggleFavorite,
  isFavorite,
}: JobseekerProfileCardProps) {
  // const history = useHistory()

  const fullName = `${jobseekerProfile?.firstName} ${jobseekerProfile?.lastName}`
  const desiredPositions =
    jobseekerProfile?.desiredPositions
      ?.map((position) => desiredPositionsIdToLabelMap[position])
      .join(', ') ?? ''
  const topSkills = jobseekerProfile?.topSkills

  // const handleFavorite = (e: React.MouseEvent) => {
  //   e.stopPropagation()
  //   toggleFavorite && toggleFavorite(profile.id)
  // }

  const imgSrc = jobseekerProfile?.profileAvatarImageS3Key
    ? AWS_PROFILE_AVATARS_BUCKET_BASE_URL +
      jobseekerProfile?.profileAvatarImageS3Key
    : placeholderImage

  return (
    <Card
      className={classnames('jobseeker-profile-card', {
        'jobseeker-profile-card--active': onClick,
      })}
      onClick={onClick}
    >
      <Card.Image
        className="jobseeker-profile-card__image"
        src={imgSrc}
        alt={fullName}
      />
      <Card.Content>
        {/* {toggleFavorite && (
          <div className="jobseeker-profile-card__favorite" onClick={handleFavorite}>
            <Icon
              icon={isFavorite ? 'heartFilled' : 'heart'}
              className="jobseeker-profile-card__favorite__icon"
            />
          </div>
        )} */}
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
            shortList
            formatter={(skill: string) => topSkillsIdToLabelMap[skill]}
          />
        ) : null}
      </Card.Content>
    </Card>
  )
}
