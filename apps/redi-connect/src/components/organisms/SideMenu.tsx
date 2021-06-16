import React, { ReactNode } from 'react'
import { getRedProfileFromLocalStorage } from '../../services/auth/auth'
import './SideMenu.scss'
import { NavLink } from 'react-router-dom'
import { ReactComponent as Mentorship } from '../../assets/images/mentorship.svg'
import { ReactComponent as Applications } from '../../assets/images/applications.svg'
import { ReactComponent as Profile } from '../../assets/images/profile.svg'

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
<<<<<<< HEAD
  const profile = getRedProfile()
  const isActivatedMentor =
    profile.userType === 'mentor' && profile.userActivated
  const isActivatedMentee =
    profile.userType === 'mentee' && profile.userActivated
=======
  const profile = getRedProfileFromLocalStorage()
  const isActivatedMentor = profile.userType === 'mentor'
  const isActivatedMentee = profile.userType === 'mentee'
>>>>>>> eaacab994fac5c73e51a4e4a60a580f458c2b570
  const isMentee =
    isActivatedMentee ||
    profile.userType === 'public-sign-up-mentee-pending-review'
  const isMenteeWithoutMentor =
    isMentee && !profile.ifUserIsMentee_hasActiveMentor
  const isMentorBookedOut =
    isActivatedMentor &&
    profile.currentMenteeCount === profile.menteeCountCapacity
  const isMenteeWithMentor =
    isActivatedMentee && profile.ifUserIsMentee_hasActiveMentor

  const showApplications = isMentee
    ? isMenteeWithoutMentor && isActivatedMentee
    : !isMentorBookedOut

  return (
    <ul className="side-menu">
      <MenuItem url="/app/me">
        <Profile className="side-menu__icon" />
        My Profile
      </MenuItem>

      {isMenteeWithoutMentor && (
        <MenuItem url="/app/find-a-mentor/">
          <Mentorship className="side-menu__icon" />
          Find a mentor
        </MenuItem>
      )}

      {(isActivatedMentor || isMenteeWithMentor) && (
        <MenuItem url="/app/mentorships/">
          <Mentorship className="side-menu__icon" />
          My Mentorship
        </MenuItem>
      )}

      {showApplications && (
        <MenuItem url="/app/applications">
          <Applications className="side-menu__icon" />
          Applications
        </MenuItem>
      )}
    </ul>
  )
}

export default SideMenu
