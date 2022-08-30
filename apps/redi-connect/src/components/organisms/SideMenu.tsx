import {
  ConnectProfileStatus,
  MentorshipMatchStatus,
  useLoadMyProfileQuery,
  UserType,
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

  const isMentor = profile?.userType === UserType.Mentor
  const isMentee = profile?.userType === UserType.Mentee

  const isActivated = profile?.profileStatus === ConnectProfileStatus.Approved
  const isNotPending = profile?.profileStatus !== ConnectProfileStatus.Pending

  const hasActiveMentorship = profile?.mentorshipMatches?.some(
    (match) => match.status === MentorshipMatchStatus.Accepted
  )
  const hasNoActiveMentorship = !hasActiveMentorship

  return (
    <ul className="side-menu">
      <MenuItem url="/app/me">
        <Profile className="side-menu__icon" />
        My Profile
      </MenuItem>

      {isMentee && isActivated && hasNoActiveMentorship && (
        <MenuItem url="/app/find-a-mentor/">
          <Mentorship className="side-menu__icon" />
          Find a mentor
        </MenuItem>
      )}

      {((isMentor && isActivated) || (isMentee && hasActiveMentorship)) && (
        <MenuItem url="/app/mentorships/">
          <Mentorship className="side-menu__icon" />
          My Mentorship
        </MenuItem>
      )}

      {isNotPending && (
        <MenuItem url="/app/applications">
          <Applications className="side-menu__icon" />
          Applications
        </MenuItem>
      )}
    </ul>
  )
}

export default SideMenu
