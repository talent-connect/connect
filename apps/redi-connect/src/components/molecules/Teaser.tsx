import { UserType } from '@talent-connect/shared-types'
import React from 'react'
import { Element } from 'react-bulma-components'
import { Link } from 'react-router-dom'
import { ReactComponent as WelcomeIllustration } from '../../assets/images/welcome-user.svg'
import './Teaser.scss'

type RouteParams = {
  userType: UserType
}

const TopIllustration: React.FunctionComponent = ({ children }) => {
  return (
    <>
      <WelcomeIllustration className="illustration illustration--rightOut" />
      <Element renderAs="p" textTransform="uppercase" textSize={6}>
        {children}
      </Element>
    </>
  )
}

export default {
  SignUp: () => (
    <TopIllustration>
      Don't have an account yet?{' '}
      <Link to="/front/signup-landing">signup here</Link>
    </TopIllustration>
  ),
  SignIn: () => (
    <TopIllustration>
      Already have an account? <Link to="/front/login">login here</Link>
    </TopIllustration>
  ),
  IllustrationOnly: () => <TopIllustration>&nbsp;</TopIllustration>,
}
