import { Element } from 'react-bulma-components'
import { NavLink } from 'react-router-dom'

import { ReactComponent as RediTalentPoolLogo } from '../../../assets/images/talent-pool-logo.svg'
import { ReactComponent as RediTalentPoolLogoMobile } from '../../../assets/images/talent-pool-logo.svg'

function RediConnectLogo () {
  return (
    <NavLink to="/" className="navbar__logo">
      <Element responsive={{ mobile: { hide: { value: true } } }}>
        <RediTalentPoolLogo />
      </Element>
      <Element responsive={{ tablet: { hide: { value: true } } }}>
        <RediTalentPoolLogoMobile />
      </Element>
    </NavLink>
  )
}

export default RediConnectLogo
