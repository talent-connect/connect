import { FunctionComponent } from 'react'
import { getRedProfileFromLocalStorage } from '../../services/auth/auth'
import './SideMenu.scss'
import { NavLink } from 'react-router-dom'
import { ReactComponent as Mentorship } from '../../assets/images/mentorship.svg'
import { ReactComponent as Applications } from '../../assets/images/applications.svg'
import { ReactComponent as Profile } from '../../assets/images/profile.svg'

interface MenuItemProps {
  url: string
}

const MenuItem: FunctionComponent<MenuItemProps> = ({ url, children }) => (
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

const SideMenu: FunctionComponent = () => {
  const profile = getRedProfileFromLocalStorage()
  const isActivatedMentor =
    profile.userType === 'mentor' && profile.userActivated
  const isActivatedMentee =
    profile.userType === 'mentee' && profile.userActivated
  const isMentee =
    isActivatedMentee ||
    profile.userType === 'public-sign-up-mentee-pending-review'
  const isMenteeWithoutMentor =
    isMentee && !profile.ifUserIsMentee_hasActiveMentor
  const isMenteeWithMentor =
    isActivatedMentee && profile.ifUserIsMentee_hasActiveMentor

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

      <MenuItem url="/app/applications">
        <Applications className="side-menu__icon" />
        Applications
      </MenuItem>
    </ul>
  )
}

export default SideMenu
