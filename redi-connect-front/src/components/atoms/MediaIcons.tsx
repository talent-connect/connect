import React from 'react'
import Icon from '../atoms/Icon'
import './MediaIcons.scss'

const socialMedia = [{
  icon: 'linkedin',
  link: 'https://www.linkedin.com/school/redi-school-of-digital-integration/'
}, {
  icon: 'twitter',
  link: 'https://twitter.com/redischool?lang=en'
}, {
  icon: 'instagram',
  link: 'https://www.instagram.com/redischoolberlin/'
}, {
  icon: 'fb',
  link: 'https://www.facebook.com/redischool/'
}, {
  icon: 'meetup',
  link: 'https://www.meetup.com/en-AU/ReDI-school/'
}]

const SocialMediaIcons = () => (
  <ul className="media-icons__list">
    {socialMedia.map((item: any) => {
      return (
        <li key={item.icon}>
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon icon={item.icon} className="media-icons__icon" />
          </a>
        </li>
      )
    })}
  </ul>
)

export default SocialMediaIcons
