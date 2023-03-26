import Icon, { IconProps } from '../atoms/Icon'
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { envRediLocation } from '../../../../../apps/redi-connect/src/utils/env-redi-location'
import './MediaIcons.scss'

const icons: Array<SocialMediaIcon> = [
  {
    icon: 'fb',
    BERLIN: 'https://www.facebook.com/redischool/',
    HAMBURG: 'https://www.facebook.com/redischool/',
    MUNICH: 'https://www.facebook.com/redimunich/',
    NRW: 'https://www.facebook.com/redischoolnrw/',
    CYBERSPACE: 'https://www.facebook.com/redischoolcyberspace/',
  },
  {
    icon: 'meetup',
    BERLIN: 'https://www.meetup.com/en-AU/ReDI-school/',
    HAMBURG: 'https://www.meetup.com/en-AU/ReDI-school/',
    MUNICH: 'https://www.meetup.com/Tech-Talks-Hosted-by-ReDI-School-Munich/',
    NRW: 'https://www.meetup.com/ReDI-School-NRW/',
    CYBERSPACE: 'https://www.meetup.com/ReDI-School-Cyberspace/',
  },
  {
    icon: 'instagram',
    BERLIN: 'https://www.instagram.com/redischoolberlin/',
    HAMBURG: 'https://www.instagram.com/redischoolberlin/',
    MUNICH: 'https://www.instagram.com/redimunich/',
    NRW: 'https://www.instagram.com/redischoolberlin/',
    CYBERSPACE: 'https://www.instagram.com/redischoolcyberspace/',
  },
  {
    icon: 'linkedin',
    BERLIN:
      'https://www.linkedin.com/school/redi-school-of-digital-integration/',
    HAMBURG:
      'https://www.linkedin.com/school/redi-school-of-digital-integration/',
    MUNICH:
      'https://www.linkedin.com/school/redi-school-of-digital-integration/',
    NRW: 'https://www.linkedin.com/school/redi-school-of-digital-integration/',
    CYBERSPACE:
      'https://www.linkedin.com/school/redi-school-of-digital-integration/',
  },
  {
    icon: 'twitter',
    BERLIN: 'https://twitter.com/redischool?lang=en',
    HAMBURG: 'https://twitter.com/redischool?lang=en',
    MUNICH: 'https://twitter.com/redischool?lang=en',
    NRW: 'https://twitter.com/redischool?lang=en',
    CYBERSPACE: 'https://twitter.com/redischool?lang=en',
  },
]

interface SocialMediaIcon {
  icon: IconProps['icon']
  BERLIN: string
  HAMBURG: string
  MUNICH: string
  NRW: string
  CYBERSPACE: string
}

const SocialMediaIcons = () => (
  <ul className="media-icons__list">
    {icons.map((item: SocialMediaIcon) => (
      <li key={item.icon}>
        <a
          href={item[envRediLocation()] || item['BERLIN']}
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
