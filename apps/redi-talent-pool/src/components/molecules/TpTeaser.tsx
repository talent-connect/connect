import React from 'react'
import { ReactComponent as WelcomeIllustration } from '../../assets/images/hero-mentor-and-mentee.svg'
import { Element } from 'react-bulma-components'
import { Link } from 'react-router-dom'
import './TpTeaser.scss'

const TopIllustration: React.FunctionComponent = ({ children }) => {
  return (
    <>
      <WelcomeIllustration className="tp-illustration tp-illustration--rightOut" />
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
      <Link to="/front/signup/jobseeker">signup here</Link>
    </TopIllustration>
  ),
  SignIn: () => (
    <TopIllustration>
      Already have an account? <Link to="/front/login">sign-in here</Link>
    </TopIllustration>
  ),
}
