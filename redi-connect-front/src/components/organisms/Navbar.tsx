import React, { useState } from 'react'
import Button from '../atoms/Button'
import { isLoggedIn } from '../../services/auth/auth'
import { logout } from '../../services/api/api'
import { Section, Container, Element } from 'react-bulma-components'
import Logo from '../atoms/Logo'
import classnames from 'classnames'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import './Navbar.scss'

const LoggedOutButtons = () => {
  const history = useHistory()
  const { t } = useTranslation()

  return (<>
    <Button
      onClick={() => history.push('/front/login')}
      simple
    >
      {t('button.login')}
    </Button>
    <Button
      onClick={() => history.push('/front/signup-landing')}
    >
      {t('button.signUp')}
    </Button>
  </>)
}

const LoggedInButtons = ({ mobile }: { mobile?: boolean }) => {
  const history = useHistory()

  return (<>
    <Button
      onClick={() => logout()}
      simple
    >
      log-out
    </Button>

    <Button
      onClick={() => history.push('/app/me')}
      simple
      separator={!mobile}
    >
      <Button.Icon icon="account" />
    </Button>
  </>
  )
}

const LoggedOutNavbar = () => {
  const [menuActive, setMenuActive] = useState(false)

  const mobileMenu = (
    <Container className="navbar__mobile">
      <Element
        className="navbar__close"
        onClick={() => setMenuActive(!menuActive)}
      >
        &times;
      </Element>
      {isLoggedIn() && <LoggedInButtons mobile={true}/>}
      {!isLoggedIn() && <LoggedOutButtons/>}
    </Container>
  )

  return (
    <>
      {menuActive && mobileMenu}
      <Section className={classnames('navbar')}>
        <Container className="navbar__wrapper">
          <Logo />
          <Element
            responsive={{ mobile: { hide: { value: true } } }}
            className="navbar__buttons"
          >
            {isLoggedIn() && <LoggedInButtons/>}
            {!isLoggedIn() && <LoggedOutButtons/>}
          </Element>
          <Element
            responsive={{ tablet: { hide: { value: true } } }}
            className="navbar__buttons"
          >
            <Button
              onClick={() => setMenuActive(!menuActive)}
              simple
            >
              <Button.Icon icon="hamburger" />
            </Button>
          </Element>
        </Container>
      </Section>
    </>
  )
}

export default LoggedOutNavbar
