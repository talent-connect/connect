import React, { useState } from 'react'
import { Section, Container, Element } from 'react-bulma-components'
import Logo from '../atoms/Logo'
import burger from '../../assets/images/hamburger.svg'
import classnames from 'classnames'
import './Navbar.scss'

interface Props {
  children: any
  separator?: boolean
}

const LoggedOutNavbar = ({ children, separator }: Props) => {
  const [menuActive, setMenuActive] = useState(false)

  const mobileMenu = (
    <Container className="navbar__mobile">
      <Element
        className="navbar__close"
        onClick={() => setMenuActive(!menuActive)}
      >
        &times;
      </Element>
      {children}
    </Container>
  )

  return (
    <>
      {menuActive && mobileMenu}
      <Section className={classnames('navbar', { 'navbar--with-separator': separator })}>
        <Container className="navbar__wrapper">
          <Logo />
          <Element
            responsive={{ mobile: { hide: { value: true } } }}
          >
            {children}
          </Element>
          <Element
            responsive={{ tablet: { hide: { value: true } } }}
            onClick={() => setMenuActive(!menuActive)}
          >
            <img src={burger} alt="hamburger icon" className="navbar__image" />
          </Element>
        </Container>
      </Section>
    </>
  )
}

export default LoggedOutNavbar
