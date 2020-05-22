import React from 'react'
import { Card, Element, Tag } from 'react-bulma-components'
import PipeList from '../../components/molecules/PipeList'
import {
  AWS_PROFILE_AVATARS_BUCKET_BASE_URL,
  categoriesIdToLabelMap
} from '../../config/config'

import './ProfileCard.scss'

import { RedProfile } from '../../types/RedProfile'

interface Props {
  profile: RedProfile
  onClick?: Function
}

export const ProfileCard = ({ profile, onClick }: Props) => (
  <Card className="profile-card" onClick={() => typeof onClick === 'function' && onClick()}>
    {/* The avatar component may replace this image but for now it's a working solution */}
    <Card.Image className="profile-card__image" src={`${AWS_PROFILE_AVATARS_BUCKET_BASE_URL}${profile.profileAvatarImageS3Key}`} alt="" />
    <Card.Content>
      <Element renderAs="h3" textWeight="bold" textSize={4}>
        {profile.firstName} {profile.lastName}
      </Element>
      <PipeList items={profile.languages} />
      <Tag.Group className="profile-card__tags">
        {profile.categories.map(catId => (
          <Tag key={catId} size="large" rounded>
            {categoriesIdToLabelMap[catId]}
          </Tag>
        ))}
      </Tag.Group>
    </Card.Content>
  </Card>
)
