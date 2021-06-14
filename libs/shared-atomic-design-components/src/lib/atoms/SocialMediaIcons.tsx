import React from 'react'
import Icon, { IconProps } from '../atoms/Icon'
import './MediaIcons.scss'

const socialMedia: Array<SocialMediaIcon> = [
  {
    icon: 'fb',
    link: 'https://www.facebook.com/redischool/',
    MUC: 'https://www.facebook.com/redimunich/',
    NRW: 'https://www.facebook.com/redischoolnrw/',
  },
  {
    icon: 'meetup',
    link: 'https://www.meetup.com/en-AU/ReDI-school/',
    MUC: 'https://www.meetup.com/Tech-Talks-Hosted-by-ReDI-School-Munich/',
    NRW: 'https://www.meetup.com/ReDI-School-NRW/',
  },
  {
    icon: 'instagram',
    link: 'https://www.instagram.com/redischoolberlin/',
    MUC: 'https://www.instagram.com/redimunich/',
    NRW: '',
  },
  {
    icon: 'linkedin',
    link: 'https://www.linkedin.com/school/redi-school-of-digital-integration/',
  },
  {
    icon: 'twitter',
    link: 'https://twitter.com/redischool?lang=en',
  },
]

interface Props {
  name?: string
}

interface SocialMediaIcon {
  icon: IconProps['icon']
  link: string
  MUC?: string
  NRW?: string
}

const SocialMediaIcons = ({ name }: Props) => {
  const icons = name ? socialMedia.slice(0, 3) : socialMedia
  return (
    <ul className="media-icons__list">
      {icons.map((item: SocialMediaIcon) => {
        if (item.icon !== 'instagram' || name !== 'NRW') {
          return (
            <li key={item.icon}>
              <a
                href={name ? item[name] : item.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon icon={item.icon} className="media-icons__icon" />
              </a>
            </li>
          )
        }
        return <template />
      })}
      {name && <li className="media-icons__name">{name}</li>}
    </ul>
  )
}

export default SocialMediaIcons
