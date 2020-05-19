import React, { useState } from 'react'
import { Section, Container, Element } from 'react-bulma-components'
import Logo from '../atoms/Logo'
import burger from '../../assets/images/hamburger.svg'
import classnames from 'classnames'
import { getRedProfile } from '../../services/auth/auth'
import './SideMenu.scss'
import { NavLink } from 'react-router-dom'

interface Props {
  children: any
  url: boolean
}

const MenuItem = ({ url, children }: {url: string, children: string}) => {
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
      {profile.userType === 'mentee' &&
        <MenuItem url="/app/dashboard">Find a mentor</MenuItem>
      }
      {profile.userType === 'mentor' &&
        <MenuItem url="/app/applications">Applications</MenuItem>
      }
    </ul>
  )
}

export default SideMenu
