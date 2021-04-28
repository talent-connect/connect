import React from 'react'
import classnames from 'classnames'
import { Card, Element, Tag } from 'react-bulma-components'
import { Icon, PipeList } from '@talent-connect/shared-atomic-design-components'

import { useHistory } from 'react-router-dom'
import {
  AWS_PROFILE_AVATARS_BUCKET_BASE_URL,
  rediLocationNames,
} from '../../config/config'

import placeholderImage from '../../assets/images/img-placeholder.png'
import './ProfileCard.scss'

import { RedProfile } from '@talent-connect/shared-types'
import { ReadMentoringTopics } from '../molecules'

interface ProfileCardProps {
  profile: RedProfile
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
  const history = useHistory()

  const {
    firstName,
    lastName,
    languages,
    categories,
    profileAvatarImageS3Key,
  } = profile

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation()
    toggleFavorite && toggleFavorite(profile.id)
  }

  const handleLinkTo = () => linkTo && history.push(linkTo)

  const imgSrc = profileAvatarImageS3Key
    ? AWS_PROFILE_AVATARS_BUCKET_BASE_URL + profileAvatarImageS3Key
    : placeholderImage

  return (
    <Card
      className={classnames('profile-card', { 'profile-card--active': linkTo })}
      onClick={linkTo ? handleLinkTo : undefined}
    >
      <Card.Image
        className="profile-card__image"
        src={imgSrc}
        alt={`${firstName} ${lastName}`}
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
        <Tag size="small" className="profile-card__location-tag" rounded>
          (in {rediLocationNames[profile.rediLocation]})
        </Tag>
        <Element
          renderAs="h3"
          textWeight="bold"
          textSize={4}
          className="profile-card__name"
        >
          {firstName} {lastName}
        </Element>
        {languages && <PipeList items={languages} />}
        {categories && (
          <ReadMentoringTopics.Tags items={categories} shortList />
        )}
      </Card.Content>
    </Card>
  )
}

export default ProfileCard
