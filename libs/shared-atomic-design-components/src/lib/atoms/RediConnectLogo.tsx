import { FunctionComponent } from 'react';
import { Element } from 'react-bulma-components'
import { NavLink } from 'react-router-dom'

import { ReactComponent as RediLogo } from '../../assets/images/logo.svg'
import { ReactComponent as RediLogoMobile } from '../../assets/images/logo-mobile.svg'

const RediConnectLogo: FunctionComponent = () => {
  return (
    <NavLink to="/" className="navbar__logo">
      <Element responsive={{ mobile: { hide: { value: true } } }}>
        <RediLogo />
      </Element>
      <Element responsive={{ tablet: { hide: { value: true } } }}>
        <RediLogoMobile />
      </Element>
    </NavLink>
  )
}

export default RediConnectLogo
