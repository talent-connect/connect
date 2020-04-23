import React from 'react'
import './MediaIcons.scss'
import linkedin from '../../assets/images/linkedin.svg'
import twitter from '../../assets/images/twitter.svg'
import instagram from '../../assets/images/instagram.svg'
import meetup from '../../assets/images/meetup.svg'
import fb from '../../assets/images/fb.svg'

const icons = [
  {
    image: linkedin,
    link: 'https://www.linkedin.com/school/redi-school-of-digital-integration/'
  },
  { image: twitter, link: 'https://twitter.com/redischool?lang=en' },
  { image: instagram, link: 'https://www.instagram.com/redischool/' },
  { image: fb, link: 'https://www.facebook.com/redischool/' },
  { image: meetup, link: 'https://www.meetup.com/en-AU/ReDI-school/' }
]

const SocialMediaIcons = () => (
  <div className="media-icons__wrapper">
    {icons.map(icon => {
      return (
        <a
          href={icon.link}
          className="media-icons__icon"
          key={icon.image}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={icon.image} alt="icon" className="media-icon__img" />
        </a>
      )
    })}
  </div>
)

export default SocialMediaIcons
