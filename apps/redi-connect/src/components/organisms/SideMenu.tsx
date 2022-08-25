import {
  ConnectProfileStatus,
  useLoadMyProfileQuery,
} from '@talent-connect/data-access'
import { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { ReactComponent as Applications } from '../../assets/images/applications.svg'
import { ReactComponent as Mentorship } from '../../assets/images/mentorship.svg'
import { ReactComponent as Profile } from '../../assets/images/profile.svg'
import { getAccessTokenFromLocalStorage } from '../../services/auth/auth'
import './SideMenu.scss'

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
      <>{children}</>
    </NavLink>
  </li>
)

const SideMenu = () => {
  const loopbackUserId = getAccessTokenFromLocalStorage().userId
  const myProfileQuery = useLoadMyProfileQuery({ loopbackUserId })
  const profile = myProfileQuery.data?.conProfile
  const isActivatedMentor =
    profile?.userType === 'MENTOR' &&
    profile?.profileStatus === ConnectProfileStatus.Approved
  const isActivatedMentee =
    profile?.userType === 'MENTEE' &&
    profile?.profileStatus === ConnectProfileStatus.Approved
  const isMentee =
    isActivatedMentee || profile?.profileStatus === ConnectProfileStatus.Pending
  const isMenteeWithoutMentor =
    isMentee && profile.ifUserMentee_activeMentorshipMatches === 0
  const isMenteeWithMentor =
    isActivatedMentee && profile.ifUserMentee_activeMentorshipMatches > 0

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
