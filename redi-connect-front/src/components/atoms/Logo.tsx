import React from 'react'
import { Element } from 'react-bulma-components'
import { ReactComponent as RediLogo } from '../../assets/images/logo.svg'
import { ReactComponent as RediLogoMobile } from '../../assets/images/logo-mobile.svg'

const Logo = () => {
  return (
    <a href="/">
      <Element responsive={{ mobile: { hide: { value: true } } }}>
        <RediLogo />
      </Element>
      <Element responsive={{ tablet: { hide: { value: true } } }}>
        <RediLogoMobile />
      </Element>
    </a>
  )
}

export default Logo
