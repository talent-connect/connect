import { Icon, PipeList } from '@talent-connect/shared-atomic-design-components'
import React from 'react'
import { Card, Element } from 'react-bulma-components'

import { REDI_LOCATION_NAMES } from '@talent-connect/shared-config'
import { NavLink } from 'react-router-dom'

import placeholderImage from '../../assets/images/img-placeholder.png'
import './ProfileCard.scss'

import { ReadMentoringTopics } from '../molecules'
import { ProfileCardProfilePropFragment } from './ProfileCard.generated'

interface ProfileCardProps {
  profile: ProfileCardProfilePropFragment
  linkTo?: string
  isFavorite?: boolean
  toggleFavorite?: (id: string) => void
}

const ProfileCard = ({
  profile,
  linkTo,
  toggleFavorite,
  isFavorite,
}: ProfileCardProps) => {
  const {
    fullName,
    languages,
    categories,
    rediLocation,
    profileAvatarImageS3Key,
  } = profile

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    toggleFavorite && toggleFavorite(profile.id)
  }

  const imgSrc = profileAvatarImageS3Key
    ? profileAvatarImageS3Key
    : placeholderImage

  return (
    <NavLink to={linkTo} className="profile-card-link">
      <Card className="profile-card">
        <Card.Image
          className="profile-card__image"
          src={imgSrc}
          alt={`${fullName}`}
        />
        <Card.Content>
          {toggleFavorite && (
            <div className="profile-card__favorite" onClick={handleFavorite}>
              <Icon
                icon={isFavorite ? 'heartFilled' : 'heart'}
                className="profile-card__favorite__icon"
              />
            </div>
          )}
          <Element
            key="name"
            renderAs="h3"
            textWeight="bold"
            textSize={4}
            className="profile-card__name"
          >
            {fullName}
          </Element>
          <Element key="location" renderAs="span" className="content">
            {REDI_LOCATION_NAMES[rediLocation]}
          </Element>
          {languages && <PipeList items={languages} />}
          {categories && <ReadMentoringTopics.Tags items={categories} />}
        </Card.Content>
      </Card>
    </NavLink>
  )
}

export default ProfileCard
