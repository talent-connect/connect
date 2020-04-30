import React, { useState } from 'react'
import { Section, Container, Content, Image } from 'react-bulma-components'
import { useHistory } from 'react-router-dom'
import Button from '../atoms/Button'
import Logo from '../atoms/Logo'
import burger from '../../assets/images/hamburger.svg'
import './LoggedOutNavbar.scss'

const LoggedOutNavbar = () => {
  const [menuActive, setMenuActive] = useState(false)

  const history = useHistory()

  const mobileMenu = (
    <Container className="custom-navbar__mobile">
      <Content
        className="custom-navbar__close"
        onClick={() => setMenuActive(!menuActive)}
      >
        &times;
      </Content>
      <Button
        onClick={() => history.push('/front/signup/landing')}
      >
        Sign-up now!
      </Button>
      <Button
        size="medium"
        onClick={() => history.push('/front/login')}
        simple
      >
        log-in
      </Button>
    </Container>
  )

  return (
    <Section className="custom-navbar">
      <Container className="custom-navbar__wrapper">
        <Logo />
        <Content
          responsive={{ mobile: { hide: { value: true } } }}
        >
          <Button onClick={() => history.push('/front/login')} simple>log-in</Button>
          <Button onClick={() => history.push('/front/signup/landing')} >Sign-up</Button>
        </Content>
        <Content
          responsive={{ tablet: { hide: { value: true } } }}
          onClick={() => setMenuActive(!menuActive)}
        >
          <Image src={burger} alt="hamburger icon" className="custom-navbar__image" />
        </Content>
      </Container>
      {menuActive && mobileMenu}
    </Section>
  )
}

export default LoggedOutNavbar
