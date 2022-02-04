import { IconProps } from '../Icon/Icon.props';

interface SocialMediaIcon {
  /** ... */
  icon: IconProps['icon']
  /** ... */
  berlin: string
  /** ... */
  munich: string
  /** ... */
  nrw: string
}

export const icons: SocialMediaIcon[] = [
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
