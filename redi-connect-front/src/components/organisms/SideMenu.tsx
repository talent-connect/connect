import React from 'react'
import { getRedProfile } from '../../services/auth/auth'
import './SideMenu.scss'
import { NavLink } from 'react-router-dom'
import { ReactComponent as Mentorship } from '../../assets/images/mentorship.svg'
import { ReactComponent as Applications } from '../../assets/images/applications.svg'
import { ReactComponent as Profile } from '../../assets/images/profile.svg'

interface Props {
  url: string
  children: any
}


const MenuItem = ({ url, children }: Props) => (
  <li className="side-menu__item">
    <NavLink
      to={url}
      className="side-menu__item__link"
      activeClassName="side-menu__item__link--active">
      {children}
    </NavLink>
  </li>
)

const SideMenu = () => {
  const profile = getRedProfile()
  const isProfileActive = profile.userType === 'mentee' || profile.userType === 'mentor'

  return (
    <ul className="side-menu">
      <MenuItem url="/app/me">
        <Profile className="side-menu__icon" />
        My Profile
      </MenuItem>
      {
        (profile.userType === 'mentee' || profile.userType === 'public-sign-up-mentee-pending-review') &&
        <MenuItem url="/app/dashboard">
          <Mentorship className="side-menu__icon" />
          Find a mentor
        </MenuItem>
      }
      {
        profile.userType === 'mentor' &&
        <MenuItem url="/app/mentorship">
          <Mentorship className="side-menu__icon" />
          My Mentorship
        </MenuItem>
      }
      {
        isProfileActive &&
        <MenuItem url="/app/applications">
          <Applications className="side-menu__icon" />
          Applications
        </MenuItem>
      }
    </ul >
  )
}

export default SideMenu
