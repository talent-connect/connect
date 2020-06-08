import React from 'react'
import { ReactComponent as WelcomeIllustration } from '../../assets/images/welcome-user.svg'
import { ReactComponent as Isabelle } from '../../assets/images/isabelle.svg'
import { ReactComponent as RedCircle } from '../../assets/images/red-circle.svg'
import { Element } from 'react-bulma-components'
import { Link } from 'react-router-dom'
import './Teaser.scss'

const TopIllustration: React.FunctionComponent = ({ children }) => {
  return (
    <>
      <WelcomeIllustration className="illustration illustration--rightOut" />
      <Element renderAs="p" textTransform="uppercase" textSize={6}>{children}</Element>
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
      Already have an account? <Link to="/front/login">sign-in here</Link>
    </TopIllustration>
  ),
  Isabelle: () => (
    <>
      <Isabelle className="illustration illustration--bothOut" />
      <Element renderAs="p" textAlignment="centered" textSize={ 4 } className="about-isabelle">
        “Hi, I am <strong>Isabelle</strong>, the mentorship coordinator of ReDI Connect.
        I take the time to meet each mentee in person before they join our program.”
      </Element>
      <Element renderAs="p" textAlignment="centered" textSize={ 5 }>
        <strong>Isabelle Köhncke</strong>
      </Element>
      <Element renderAs="p" textAlignment="centered" textSize={ 6 }>
        Manager Mentorship Program <br />
        Career Department ReDI School <br />
        <a href="mailto:isabelle@redi-school.org">isabelle@redi-school.org</a>
      </Element>
      <RedCircle className="illustration illustration--toRight" />
    </>
  )
}
