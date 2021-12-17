import { FunctionComponent } from 'react'
import { NavLink } from 'react-router-dom'
import { ReactComponent as Applications } from '../../assets/images/applications.svg'
import { ReactComponent as Profile } from '../../assets/images/profile.svg'
import './SideMenu.scss'

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

const SideMenu = () => {
  return (
    <ul className="side-menu">
      <MenuItem url="/app/me">
        <Profile className="side-menu__icon" />
      </MenuItem>

      <MenuItem url="/app/jobs">
        <Applications className="side-menu__icon" />
      </MenuItem>
    </ul>
  )
}

export default SideMenu
