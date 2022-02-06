import { CardTags } from '@talent-connect/shared-atomic-design-components'
import { AWS_PROFILE_AVATARS_BUCKET_BASE_URL } from '@talent-connect/shared-config'
import { TpJobSeekerProfile } from '@talent-connect/shared-types'
import {
  desiredPositionsIdToLabelMap,
  topSkillsIdToLabelMap,
} from '@talent-connect/talent-pool/config'
import classnames from 'clsx'
import { Card, Element } from 'react-bulma-components'
import './JobSeekerProfileCard.scss'
import placeholderImage from '../../assets/img-placeholder.png'

interface JobSeekerProfileCardProps {
  jobSeekerProfile: Partial<TpJobSeekerProfile>
  onClick?: () => void
  isFavorite?: boolean
  toggleFavorite?: (id: string) => void
}

export function JobSeekerProfileCard ({
  jobSeekerProfile,
  onClick,
  toggleFavorite,
  isFavorite,
}: JobSeekerProfileCardProps) {
  // const history = useHistory()

  const fullName = `${jobSeekerProfile.firstName} ${jobSeekerProfile.lastName}`
  const desiredPositions =
    jobSeekerProfile.desiredPositions
      ?.map((position) => desiredPositionsIdToLabelMap[position])
      .join(', ') ?? ''
  const topSkills = jobSeekerProfile?.topSkills

  // const handleFavorite = (e: React.MouseEvent) => {
  //   e.stopPropagation()
  //   toggleFavorite && toggleFavorite(profile.id)
  // }

  const imgSrc = jobSeekerProfile.profileAvatarImageS3Key
    ? AWS_PROFILE_AVATARS_BUCKET_BASE_URL +
      jobSeekerProfile?.profileAvatarImageS3Key
    : placeholderImage

  return (
    <Card
      className={classnames('jobSeeker-profile-card', {
        'jobSeeker-profile-card--active': onClick,
      })}
      onClick={onClick}
    >
      <Card.Image
        className="jobSeeker-profile-card__image"
        src={imgSrc}
        alt={fullName}
      />
      <Card.Content>
        {/* {toggleFavorite && (
          <div className="jobSeeker-profile-card__favorite" onClick={handleFavorite}>
            <Icon
              icon={isFavorite ? 'heartFilled' : 'heart'}
              className="jobSeeker-profile-card__favorite__icon"
            />
          </div>
        )} */}
        <Element
          key="name"
          renderAs="h3"
          textWeight="bold"
          textSize={4}
          className="jobSeeker-profile-card__job-title"
        >
          {fullName}
        </Element>
        <Element
          className="content jobSeeker-profile-card__company-name"
          key="location"
          renderAs="div"
        >
          {desiredPositions}
        </Element>
        {topSkills?.length && (
          <CardTags
            items={topSkills}
            shortList
            formatter={(skill: string) => topSkillsIdToLabelMap[skill]}
          />
        )}
      </Card.Content>
    </Card>
  )
}
