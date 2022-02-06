import { Content, Element } from 'react-bulma-components'
import { Link } from 'react-router-dom'
import { ReactComponent as WelcomeIllustration } from '../../assets/images/hero-mentor-and-mentee.svg'
import './TpTeaser.scss'

// function TopIllustration ({ children }) { // TODO: remove?
//   return (
//     <>
//       <WelcomeIllustration className="tp-illustration tp-illustration--rightOut" />
//       <Element renderAs="p" textTransform="uppercase" textSize={6}>
//         {children}
//       </Element>
//     </>
//   )
// }

// TODO: rename this component to Teaser, TpTeaser was an attempt at a fix, when it was another issue that was the issue
export default {
  IllustrationOnly: () => (
    <WelcomeIllustration className="tp-illustration tp-illustration--rightOut" />
  ),
  SignUp: () => (
    <>
      <WelcomeIllustration className="tp-illustration tp-illustration--rightOut" />
      <Content>
        {/* TODO: restore these?figma
         */}
        {/* <Element renderAs="p" textSize={4}>
          Welcome to ReDI Talent Pool!
        </Element>
        <Element renderAs="p" textSize={4}>
          You're one step closer to finding your next great opportunity.
        </Element> */}
        <Element renderAs="p" textTransform="uppercase" textSize={6}>
          Already have an account? <Link to="/front/login">login here</Link>
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
          <Link to="/front/signup/jobSeeker">signup here</Link>
        </Element>
      </Content>
    </>
  ),
}
