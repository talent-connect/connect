import React from 'react'
import { ReactComponent as WelcomeIllustration } from '../../assets/images/hero-mentor-and-mentee.svg'
import { Content, Element } from 'react-bulma-components'
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

// TODO: rename this component to Teaser, TpTeaser was an attempt at a fix, when it was another issue that was the issue
export default {
  SignUp: () => (
    <>
      <WelcomeIllustration className="tp-illustration tp-illustration--rightOut" />
      <Content>
        <Element renderAs="p" textSize={8}>
          Welcome to ReDI Talent Pool!
        </Element>
        <Element renderAs="p" textSize={8}>
          You're one step closer to finding your next great opportunity.
        </Element>
        <Element renderAs="p" textTransform="uppercase" textSize={6}>
          Already have an account? <Link to="/front/login">sign-in here</Link>
        </Element>
      </Content>
    </>
  ),
  SignIn: () => (
    <>
      <WelcomeIllustration className="tp-illustration tp-illustration--rightOut" />
      <Content>
        <Element renderAs="p" textTransform="uppercase" textSize={6}>
          Don't have an account yet?{' '}
          <Link to="/front/signup/jobseeker">signup here</Link>
        </Element>
      </Content>
    </>
  ),
}
