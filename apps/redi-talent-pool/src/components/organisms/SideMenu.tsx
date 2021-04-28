import React, { ReactNode } from 'react'
import './SideMenu.scss'
import { NavLink } from 'react-router-dom'

interface MenuItemProps {
  url: string
  children: ReactNode
}

const MenuItem = ({ url, children }: MenuItemProps) => (
  <li className="side-menu__item">
    <NavLink
      to={url}
      className="side-menu__item__link"
      activeClassName="side-menu__item__link--active"
    >
      {children}
    </NavLink>
  </li>
)

const SideMenu = () => {
  return (
    <ul className="side-menu">
      <MenuItem url="/app/me">My Profile</MenuItem>

      <MenuItem url="/app/mentorships/">My Mentorship</MenuItem>

      <MenuItem url="/app/applications">Applications</MenuItem>
    </ul>
  )
}

export default SideMenu
