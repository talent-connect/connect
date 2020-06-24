import React from 'react'
import { Card, Element } from 'react-bulma-components'
import { Icon } from '../atoms'
import { ReadMentoringTopics } from '../molecules'
import classNames from 'classnames'

import { useHistory } from 'react-router-dom'
// import { LogMentoringSessionBtn } from '../../components/LogMentoringSessionBtn'
import PipeList from '../../components/molecules/PipeList'
import {
  AWS_PROFILE_AVATARS_BUCKET_BASE_URL
} from '../../config/config'

import './ProfileCard.scss'

import { RedProfile } from '../../types/RedProfile'

interface ProfileCardProps {
  profile: RedProfile
  isFavorite?: boolean
  toggleFavorite?: (id: string) => void
}

const ProfileCard = ({ profile, toggleFavorite, isFavorite }: ProfileCardProps) => {
  const history = useHistory()

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation()
    toggleFavorite && toggleFavorite(profile.id)
  }

  return <Card className="profile-card" onClick={() => history.push(`/app/dashboard/profile/${profile.id}`)}>
    {/* The avatar component may replace this image but for now it's a working solution */}
    {profile.profileAvatarImageS3Key && <Card.Image className="profile-card__image" src={`${AWS_PROFILE_AVATARS_BUCKET_BASE_URL}${profile.profileAvatarImageS3Key}`} alt="" />}
    <Card.Content>
      <div
        className='profile-card__favorite'
        onClick={handleFavorite}>
        <Icon
          icon={isFavorite ? 'heartFilled' : 'heart'}
          className="profile-card__favorite__icon"/>
      </div>
      <Element renderAs="h3" textWeight="bold" textSize={4} className="profile-card__name">
        {profile.firstName} {profile.lastName}
      </Element>
      {profile.languages && <PipeList items={profile.languages} />}
      {profile.categories && <ReadMentoringTopics.Tags items={profile.categories} shortList />}
      {/* need a solution for displaying the button for loggin a sessioin
      <LogMentoringSessionBtn menteeId={mentee.id} /> */}
    </Card.Content>
  </Card>
}

export default ProfileCard
