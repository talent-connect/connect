import { CardTags } from '@talent-connect/shared-atomic-design-components'
import { AWS_PROFILE_AVATARS_BUCKET_BASE_URL } from '@talent-connect/shared-config'
import { TpJobListing } from '@talent-connect/shared-types'
import { topSkillsIdToLabelMap } from '@talent-connect/talent-pool/config'
import classnames from 'clsx'
import { Card, Element } from 'react-bulma-components'
// import placeholderImage from '../../assets/images/img-placeholder.png'
import './JobListingCard.scss'

interface JobListingCardProps {
  jobListing: Partial<TpJobListing>
  onClick?: () => void
  isFavorite?: boolean
  toggleFavorite?: (id: string) => void
}

export function JobListingCard ({
  jobListing,
  onClick,
  toggleFavorite,
  isFavorite,
}: JobListingCardProps) {
  // const history = useHistory()

  const jobTitle = jobListing.title
  const idealTechnicalSkills = jobListing.idealTechnicalSkills

  const companyName = jobListing.tpCompanyProfile?.companyName
  const companyAvatarImage =
    jobListing.tpCompanyProfile?.profileAvatarImageS3Key

  // const handleFavorite = (e: React.MouseEvent) => {
  //   e.stopPropagation()
  //   toggleFavorite && toggleFavorite(profile.id)
  // }

  const imgSrc = companyAvatarImage
    ? AWS_PROFILE_AVATARS_BUCKET_BASE_URL + companyAvatarImage
    : null

  return (
    <Card
      className={classnames('job-posting-card', {
        'job-posting-card--active': onClick,
      })}
      onClick={onClick}
    >
      <Card.Image
        className="job-posting-card__image"
        src={imgSrc}
        alt={jobTitle}
      />
      <Card.Content>
        {/* {toggleFavorite && (
          <div className="job-posting-card__favorite" onClick={handleFavorite}>
            <Icon
              icon={isFavorite ? 'heartFilled' : 'heart'}
              className="job-posting-card__favorite__icon"
            />
          </div>
        )} */}
        <Element
          key="name"
          renderAs="h3"
          textWeight="bold"
          className="job-posting-card__job-title"
          textSize={4}
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
        {idealTechnicalSkills?.length && (
          <CardTags
            items={idealTechnicalSkills}
            formatter={(skill: string) => topSkillsIdToLabelMap[skill]}
            shortList
          />
        )}
      </Card.Content>
    </Card>
  )
}
