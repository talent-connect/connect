import './NewProfileCard.scss'
import { CardTags, Icon } from '@talent-connect/shared-atomic-design-components'
import React, { ReactNode } from 'react'
import { Card, Tag } from 'react-bulma-components'
import { NavLink } from 'react-router-dom'
import LocationIcon from '../../assets/images/location.svg'
import LanguagesIcon from '../../assets/images/globe.svg'

interface NewProfileCardProps {
  profile: {
    id: string
    avatar: string
    fullName: string
    location?: string
    languages?: string[]
  }
  topChip?: ReactNode
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
    <div className="new-profile-card__location-container">
      <img
        src={LocationIcon}
        alt="Location"
        className="new-profile-card__location-icon"
      />
      <p className="new-profile-card__location-text">Based in {location}</p>
    </div>
  )
}

const UserLanguages = ({ languages }: UserLanguagesProps) => {
  const languagesShort =
    languages.length > 3
      ? languages.slice(0, 3).join(', ') + '...'
      : languages.join(', ')

  return (
    <div className="new-profile-card__languages-container">
      <img
        src={LanguagesIcon}
        alt="Languages"
        className="new-profile-card__languages-icon"
      />
      <p className="new-profile-card__languages-text">{languagesShort}</p>
    </div>
  )
}

export function NewProfileCard({
  profile: { id, avatar, fullName, location, languages },
  tags,
  subheader,
  topChip,
  linkTo,
  toggleFavorite,
  isFavorite,
}: NewProfileCardProps) {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault()
    toggleFavorite && toggleFavorite(id)
  }

  return (
    <NavLink to={linkTo} className="profile-link">
      <Card className="new-profile-card">
        <img className="new-profile-card__avatar" src={avatar} alt={fullName} />
        <div>
          {topChip && (
            <Tag className="new-profile-card__top-chip">{topChip}</Tag>
          )}
          {toggleFavorite && (
            <div
              className="new-profile-card__favorite"
              onClick={handleFavoriteClick}
            >
              <Icon
                icon={isFavorite ? 'heartFilled' : 'heart'}
                className="new-profile-card__favorite__icon"
              />
            </div>
          )}
          <p key="name" className="new-profile-card__name">
            {fullName}
          </p>
          {subheader && (
            <p className="new-profile-card__subheader">{subheader}</p>
          )}

          {languages?.length > 0 && <UserLanguages languages={languages} />}
          {location && <UserLocation location={location} />}
          {tags?.length > 0 && (
            <div className="new-profile-card__tags">
              <CardTags items={tags} shortList />
            </div>
          )}
        </div>
      </Card>
    </NavLink>
  )
}
