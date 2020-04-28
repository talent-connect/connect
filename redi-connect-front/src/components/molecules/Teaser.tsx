import React from 'react'
import { ReactComponent as WelcomeIllustration } from '../../assets/welcome-user.svg'
import { Element } from 'react-bulma-components'
import { Link } from 'react-router-dom'

const Teaser: React.FunctionComponent = ({ children }) => {
  return (
    <>
      <WelcomeIllustration className="illustration" />

      <Element renderAs="p" textTransform="uppercase" textSize={6}>{children}</Element>
    </>
  )
}

export default {
  SignUp: () => (
    <Teaser>
      Don't have an account yet?{' '}
      <Link to="/front/signup/landing">signup here</Link>
    </Teaser>
  ),
  SignIn: () => (
    <Teaser>
      Already have an account? <Link to="/front/login">sign-in here</Link>
    </Teaser>
  )
}
