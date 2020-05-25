import React from 'react'
import { getRedProfile } from '../../services/auth/auth'
import './SideMenu.scss'
import { NavLink } from 'react-router-dom'

interface MenuItemProps {
  url: string
  children: string
}

const MenuItem = ({ url, children }: MenuItemProps) => {
  return (
    <li className="side-menu__item">
      <NavLink
        to={url}
        className="side-menu__item__link"
        activeClassName="side-menu__item__link--active">
        {children}
      </NavLink>
    </li>
  )
}

const SideMenu = () => {
  const profile = getRedProfile()

  return (
    <ul className="side-menu">
      <MenuItem url="/app/me">My Profile</MenuItem>
      {(profile.userType === 'mentee' || profile.userType === 'public-sign-up-mentee-pending-review') &&
        <MenuItem url="/app/dashboard">Find a mentor</MenuItem>
      }
      {profile.userType === 'mentor' && <>
        <MenuItem url="/app/mentorship">My Mentorship</MenuItem>
        <MenuItem url="/app/applications">Applications</MenuItem>
      </>
      }
    </ul>
  )
}

export default SideMenu
