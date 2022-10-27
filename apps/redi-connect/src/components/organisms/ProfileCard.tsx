import React from 'react'
import classnames from 'classnames'
import { Card, Element, Tag } from 'react-bulma-components'
import { Icon, PipeList } from '@talent-connect/shared-atomic-design-components'

import { useHistory } from 'react-router-dom'
import {
  AWS_PROFILE_AVATARS_BUCKET_BASE_URL,
  REDI_LOCATION_NAMES,
  FIELDS_OF_EXPERTISE,
  MENTORING_TOPICS_MAP,
} from '@talent-connect/shared-config'

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

  let {
    firstName,
    lastName,
    languages,
    mentor_mentoringTopics,
    mentor_professionalExperienceFields,
    rediLocation,
    profileAvatarImageS3Key,
  } = profile

  const mentoringTopics =
    mentor_mentoringTopics?.map((topic) => MENTORING_TOPICS_MAP[topic]) ?? []
  const professionalExperienceFields =
    mentor_professionalExperienceFields?.map(
      (field) => FIELDS_OF_EXPERTISE[field]
    ) ?? []

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
        <Element
          key="name"
          renderAs="h3"
          textWeight="bold"
          textSize={4}
          className="profile-card__name"
        >
          {firstName} {lastName}
        </Element>
        <Element key="location" renderAs="span" className="content">
          {REDI_LOCATION_NAMES[rediLocation]}
        </Element>
        {languages && <PipeList items={languages} />}
        <p style={{ fontSize: 'smaller' }}>
          <strong>
            Mentors in these overarching topics, role-related skills and
            tools/frameworks:
          </strong>
          {mentoringTopics?.length > 0 ? mentoringTopics.join(' | ') : null}
        </p>
        <p style={{ fontSize: 'smaller' }}>
          <strong>Has professional experience in these fields:</strong>
          {professionalExperienceFields?.length > 0
            ? professionalExperienceFields.join(' | ')
            : null}
        </p>
      </Card.Content>
    </Card>
  )
}

export default ProfileCard
