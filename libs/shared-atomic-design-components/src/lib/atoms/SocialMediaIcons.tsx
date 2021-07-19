import React from 'react'
import Icon, { IconProps } from '../atoms/Icon'
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { envRediLocation } from '../../../../../apps/redi-connect/src/utils/env-redi-location'
import './MediaIcons.scss'

const icons: Array<SocialMediaIcon> = [
  {
    icon: 'fb',
    berlin: 'https://www.facebook.com/redischool/',
    munich: 'https://www.facebook.com/redimunich/',
    nrw: 'https://www.facebook.com/redischoolnrw/',
  },
  {
    icon: 'meetup',
    berlin: 'https://www.meetup.com/en-AU/ReDI-school/',
    munich: 'https://www.meetup.com/Tech-Talks-Hosted-by-ReDI-School-Munich/',
    nrw: 'https://www.meetup.com/ReDI-School-NRW/',
  },
  {
    icon: 'instagram',
    berlin: 'https://www.instagram.com/redischoolberlin/',
    munich: 'https://www.instagram.com/redimunich/',
    nrw: 'https://www.instagram.com/redischoolberlin/',
  },
  {
    icon: 'linkedin',
    berlin:
      'https://www.linkedin.com/school/redi-school-of-digital-integration/',
    munich:
      'https://www.linkedin.com/school/redi-school-of-digital-integration/',
    nrw: 'https://www.linkedin.com/school/redi-school-of-digital-integration/',
  },
  {
    icon: 'twitter',
    berlin: 'https://twitter.com/redischool?lang=en',
    munich: 'https://twitter.com/redischool?lang=en',
    nrw: 'https://twitter.com/redischool?lang=en',
  },
]

interface SocialMediaIcon {
  icon: IconProps['icon']
  berlin: string
  munich: string
  nrw: string
}

const SocialMediaIcons = () => (
  <ul className="media-icons__list">
    {icons.map((item: SocialMediaIcon) => (
      <li key={item.icon}>
        <a
          href={item[envRediLocation()]}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon icon={item.icon} className="media-icons__icon" />
        </a>
      </li>
    ))}
  </ul>
)

export default SocialMediaIcons
