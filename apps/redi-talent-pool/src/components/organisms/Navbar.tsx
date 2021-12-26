import {
  Button,
  RediTalentPoolLogo,
} from '@talent-connect/shared-atomic-design-components'
import { FunctionComponent, useState } from 'react'
import { Container, Element } from 'react-bulma-components'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { logout } from '../../services/api/api'
import { isLoggedIn } from '../../services/auth/auth'
import './Navbar.scss'

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

const LoggedInButtons: FunctionComponent<{ mobile?: boolean }> = ({ mobile }) => {
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

const Navbar: FunctionComponent = () => {
  const [menuActive, setMenuActive] = useState(false)

  const loggedIn = isLoggedIn()

  const mobileMenu = (
    <Container className="navbar__mobile">
      <Element
        className="navbar__close"
        onClick={() => setMenuActive(!menuActive)}
      >
        &times;
      </Element>
      {loggedIn && <LoggedInButtons mobile={true} />}
      {!loggedIn && <LoggedOutButtons />}
    </Container>
  )

  return (
    <>
      {menuActive && mobileMenu}

      {/* <Container
        className={classnames({ 'navbar__wrapper-wrapper': leftPaddingOn })}
      > */}
      <Container className="navbar__wrapper">
        <div style={{ display: 'flex' }}>
          <div className="is-hidden-desktop" style={{ width: '24px' }}></div>
          <RediTalentPoolLogo />
        </div>
        <div style={{ display: 'flex' }}>
          <Element
            responsive={{ mobile: { hide: { value: true } } }}
            className="navbar__buttons"
          >
            {loggedIn && <LoggedInButtons />}
            {!loggedIn && <LoggedOutButtons />}
          </Element>
          <Element
            responsive={{ tablet: { hide: { value: true } } }}
            className="navbar__buttons"
          >
            <Button onClick={() => setMenuActive(!menuActive)} simple>
              <Button.Icon icon="hamburger" />
            </Button>
          </Element>
          <div className="is-hidden-desktop" style={{ width: '24px' }}></div>
        </div>
      </Container>
      {/* </Container> */}
    </>
  )
}

export default Navbar
