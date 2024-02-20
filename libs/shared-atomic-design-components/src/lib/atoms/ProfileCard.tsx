import './ProfileCard.scss'
import { CardTags, Icon } from '@talent-connect/shared-atomic-design-components'
import {
  desiredPositionsIdToLabelMap,
  topSkillsIdToLabelMap,
} from '@talent-connect/talent-pool/config'
import React from 'react'
import { Card, Tag } from 'react-bulma-components'
import { NavLink } from 'react-router-dom'
import placeholderImage from '../../assets/images/img-placeholder.png'
import LocationIcon from '../../assets/images/location.svg'
import LanguagesIcon from '../../assets/images/globe.svg'
import { JobseekerProfileCardJobseekerProfilePropFragment } from '../../../../../../connect/apps/redi-talent-pool/src/components/organisms/JobseekerProfileCard.generated'
import { ProfileCardProfilePropFragment } from '../../../../../../connect/apps/redi-connect/src/components/organisms/ProfileCard.generated'

interface ProfileCardProps {
  profile:
    | JobseekerProfileCardJobseekerProfilePropFragment
    | ProfileCardProfilePropFragment
  linkTo?: string
  isFavorite?: boolean
  toggleFavorite?: (id: string) => void
}

interface UserLanguagesProps {
  languages: string[]
}

const UserLocation = ({ location }) => {
  return (
    <div className="profile-card__location-container">
      <img
        src={LocationIcon}
        alt="Location"
        className="profile-card__location-icon"
      />
      <p className="profile-card__location-text">Based in {location}</p>
    </div>
  )
}

function isJobSeeker(
  profile:
    | JobseekerProfileCardJobseekerProfilePropFragment
    | ProfileCardProfilePropFragment
): profile is JobseekerProfileCardJobseekerProfilePropFragment {
  return (
    (profile as JobseekerProfileCardJobseekerProfilePropFragment).isHired !==
    undefined
  )
}

const UserLanguages = ({ languages }: UserLanguagesProps) => {
  // const languagesShort =
  //   languages.length > 3
  //     ? languages.slice(0, 3).join(',') + '...'
  //     : languages.join(',')

  return (
    <div className="profile-card__languages-container">
      <img
        src={LanguagesIcon}
        alt="Languages"
        className="profile-card__languages-icon"
      />
      {/* <p className="profile-card__languages-text">{languagesShort}</p> */}
    </div>
  )
}

export function ProfileCard({
  profile,
  linkTo,
  toggleFavorite,
  isFavorite,
}: ProfileCardProps) {
  const fullName = profile?.fullName

  const desiredPositions =
    isJobSeeker(profile) &&
    profile?.desiredPositions
      ?.map((position) => desiredPositionsIdToLabelMap[position])
      .join(', ')

  const languages = isJobSeeker(profile)
    ? [profile.fullName]
    : profile.languages
    ? profile.languages
    : false

  console.log({ languages })

  const topSkills = isJobSeeker(profile)
    ? profile.topSkills
    : profile.categories

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault()
    toggleFavorite && toggleFavorite(profile.id)
  }

  const imgSrc = profile?.profileAvatarImageS3Key
    ? profile?.profileAvatarImageS3Key
    : placeholderImage

  const companyStuff = !isJobSeeker(profile) && profile.__typename

  return (
    <NavLink to={linkTo} className="profile-link">
      <Card className="profile-card">
        <img className="profile-card__image" src={imgSrc} alt={fullName} />
        <div>
          {isJobSeeker(profile) && profile.isHired ? (
            <Tag className="profile-card__hired-tag">HIRED!</Tag>
          ) : (
            ''
          )}
          {toggleFavorite && (
            <div
              className="profile-card__favorite"
              onClick={handleFavoriteClick}
            >
              <Icon
                icon={isFavorite ? 'heartFilled' : 'heart'}
                className="profile-card__favorite__icon"
              />
            </div>
          )}
          <p key="name" className="profile-card__name">
            {fullName}
          </p>
          {desiredPositions && (
            <p className="profile-card__position" key="position">
              {desiredPositions}
            </p>
          )}

          <UserLanguages languages={languages} />
          <UserLocation location={'Berlin'} />
          {topSkills?.length > 0 ? (
            <div className="profile-card__tags">
              <CardTags
                items={topSkills}
                shortList
                formatter={(skill: string) => topSkillsIdToLabelMap[skill]}
              />
            </div>
          ) : (
            ''
          )}
        </div>
      </Card>
    </NavLink>
  )
}
