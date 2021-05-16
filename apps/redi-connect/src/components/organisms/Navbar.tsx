import React, { useState } from 'react'
import { isLoggedIn } from '../../services/auth/auth'
import { logout } from '../../services/api/api'
import { Section, Container, Element } from 'react-bulma-components'
import classnames from 'classnames'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import './Navbar.scss'
import {
  Button,
  RediConnectLogo,
} from '@talent-connect/shared-atomic-design-components'

const LoggedOutNavItems = () => {
  const { t } = useTranslation()

  return (
    <>
      <Button to="/front/home">{t('button.about')}</Button>
      <Button to="/front/landing/mentee">{t('button.mentees')}</Button>
      <Button to="/front/landing/mentor">{t('button.mentors')}</Button>
    </>
  )
}

const LoggedOutButtons = () => {
  const { t } = useTranslation()
  const history = useHistory()

  return (
    <>
      <Button onClick={() => history.push('/front/login')} simple>
        {t('button.login')}
      </Button>
      <Button onClick={() => history.push('/front/signup-landing')}>
        {t('button.signUp')}
      </Button>
    </>
  )
}

const LoggedInButtons = ({ mobile }: { mobile?: boolean }) => {
  const { t } = useTranslation()
  const history = useHistory()

  return (
    <>
      <Button onClick={() => logout()} simple>
        {t('button.logout')}
      </Button>

      <Button
        onClick={() => history.push('/app/me')}
        simple
        separator={!mobile}
      >
        <Button.Icon icon="account" size="small" space="right" />
        {t('button.account')}
      </Button>
    </>
  )
}

const Navbar = () => {
  const [menuActive, setMenuActive] = useState(false)

  const mobileMenu = (
    <Container className="navbar__mobile">
      <Element
        className="navbar__close"
        onClick={() => setMenuActive(!menuActive)}
      >
        &times;
      </Element>
      {isLoggedIn() && <LoggedInButtons mobile={true} />}
      {!isLoggedIn() && (
        <>
          <LoggedOutNavItems />
          <hr />
          <LoggedOutButtons />
        </>
      )}
    </Container>
  )

  return (
    <>
      {menuActive && mobileMenu}
      <Section className={classnames('navbar default-background')}>
        <Container className="navbar__wrapper">
          <RediConnectLogo />
          <Element
            responsive={{ mobile: { hide: { value: true } } }}
            className="navbar__buttons"
          >
            {!isLoggedIn() && <LoggedOutNavItems />}
          </Element>
          <Element
            responsive={{ mobile: { hide: { value: true } } }}
            className="navbar__buttons"
          >
            {isLoggedIn() && <LoggedInButtons />}
            {!isLoggedIn() && <LoggedOutButtons />}
          </Element>
          <Element
            responsive={{ tablet: { hide: { value: true } } }}
            className="navbar__buttons"
          >
            <Button onClick={() => setMenuActive(!menuActive)} simple>
              <Button.Icon icon="hamburger" />
            </Button>
          </Element>
        </Container>
      </Section>
    </>
  )
}

export default Navbar
