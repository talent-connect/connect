import React, { useState } from 'react'
import Button from '../atoms/Button'
import { isLoggedIn } from '../../services/auth/auth'
import { logout } from '../../services/api/api'
import { Section, Container, Element, Content } from 'react-bulma-components'
import Logo from '../atoms/Logo'
import classnames from 'classnames'
import { useHistory, NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import './Navbar.scss'

interface NavItemProps {
  url: string
  children: any
}

const LoggedOutNavItems = () => {
  const { t } = useTranslation()

  const NavItem = ({ url, children }: NavItemProps) => (
    <NavLink
      exact
      to={url}
      className="navbar__item button button--simple button--small"
      activeClassName="navbar__item--active"
    >
      {children}
    </NavLink>
  )

  return (
    <>
      <NavItem url='/front/home'>{t('button.about')}</NavItem>
      <NavItem url='/front/landing/mentee'>{t('button.mentees')}</NavItem>
      <NavItem url='/front/landing/mentor'>{t('button.mentors')}</NavItem>
    </>
  )
}

const LoggedOutButtons = () => {
  const { t } = useTranslation()
  const history = useHistory()

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
  const { t } = useTranslation()
  const history = useHistory()

  return (<>
    <Button
      onClick={() => logout()}
      simple
    >
      {t('button.logout')}
    </Button>

    <Button
      onClick={() => history.push('/app/me')}
      simple
      separator={!mobile}
    >
      <Button.Icon icon="account" size="small" space="right"/>
      {t('button.account')}
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
      {!isLoggedIn() &&
        <>
          <LoggedOutNavItems />
          <hr/>
          <LoggedOutButtons/>
        </>
      }
    </Container>
  )

  return (
    <>
      {menuActive && mobileMenu}
      <Section className={classnames('navbar default-background')}>
        <Container className="navbar__wrapper">
          <Logo />
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
            {isLoggedIn() && <LoggedInButtons/>}
            {!isLoggedIn() && <LoggedOutButtons />}
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
