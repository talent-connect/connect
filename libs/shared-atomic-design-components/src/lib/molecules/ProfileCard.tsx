import { CardTags, Icon } from '@talent-connect/shared-atomic-design-components'
import React from 'react'
import { Card } from 'react-bulma-components'
import { NavLink } from 'react-router-dom'
import LanguagesIcon from '../../assets/images/globe.svg'
import LocationIcon from '../../assets/images/location.svg'
import './ProfileCard.scss'

interface ProfileCardProps {
  profile: {
    id: string
    avatar: string
    fullName: string
    location?: string
    languages?: string[]
  }
  subheader?: string
  tags: string[]
  linkTo?: string
  isFavorite?: boolean
  toggleFavorite?: (id: string) => void
}

interface UserLanguagesProps {
  languages: string[] //FIXME: language type
}

const UserLocation = ({ location }) => {
  return (
    <div className="profile-card__location-container">
      <img
        src={LocationIcon}
        alt="Location"
        className="profile-card__location-icon"
      />
      <p className="profile-card__location-text">{location}</p>
    </div>
  )
}

const UserLanguages = ({ languages }: UserLanguagesProps) => {
  const languagesShort =
    languages.length > 3
      ? languages.slice(0, 3).join(', ') + '...'
      : languages.join(', ')

  return (
    <div className="profile-card__languages-container">
      <img
        src={LanguagesIcon}
        alt="Languages"
        className="profile-card__languages-icon"
      />
      <p className="profile-card__languages-text">{languagesShort}</p>
    </div>
  )
}

const ProfileCard = ({
  profile: { id, avatar, fullName, location, languages },
  tags,
  subheader,
  linkTo,
  toggleFavorite,
  isFavorite,
}: ProfileCardProps) => {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault()
    toggleFavorite && toggleFavorite(id)
  }

  return (
    <NavLink to={linkTo} className="profile-link">
      <Card className="profile-card">
        <img className="profile-card__avatar" src={avatar} alt={fullName} />
        <div>
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
          {subheader && <p className="profile-card__subheader">{subheader}</p>}

          {languages?.length > 0 && <UserLanguages languages={languages} />}
          {location && <UserLocation location={location} />}
          {tags?.length > 0 && (
            <div className="profile-card__tags">
              <CardTags items={tags} shortList />
            </div>
          )}
        </div>
      </Card>
    </NavLink>
  )
}

export default ProfileCard
