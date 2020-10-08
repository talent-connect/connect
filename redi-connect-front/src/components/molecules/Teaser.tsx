import React from 'react';
import { ReactComponent as WelcomeIllustration } from '../../assets/images/welcome-user.svg';
import { ReactComponent as MiriamSvg } from '../../assets/images/miriam.svg';
import { ReactComponent as Christa } from '../../assets/images/christa.svg';
import { ReactComponent as RedCircle } from '../../assets/images/red-circle.svg';
import { Element } from 'react-bulma-components';
import { Link } from 'react-router-dom';
import './Teaser.scss';
import { UserType } from '../../types/UserType';
import { useParams } from 'react-router';

type RouteParams = {
  userType: UserType;
};

const miriamStyles = {
  padding: '0 100px',
};
const Miriam = (props: any) => (
  <div style={miriamStyles}>
    <MiriamSvg {...props} />
  </div>
);

const TopIllustration: React.FunctionComponent = ({ children }) => {
  return (
    <>
      <WelcomeIllustration className="illustration illustration--rightOut" />
      <Element renderAs="p" textTransform="uppercase" textSize={6}>
        {children}
      </Element>
    </>
  );
};

export default {
  SignUp: () => (
    <TopIllustration>
      Don't have an account yet? <Link to="/front/signup-landing">signup here</Link>
    </TopIllustration>
  ),
  SignIn: () => (
    <TopIllustration>
      Already have an account? <Link to="/front/login">sign-in here</Link>
    </TopIllustration>
  ),
  Miriam: () => {
    const { userType } = useParams<RouteParams>() as RouteParams;

    return (
      <>
        <Miriam className="illustration illustration--bothOut" />
        <Element renderAs="p" textAlignment="centered" textSize={4} className="about-miriam">
          “Hi, I am <strong>Miriam</strong>, the mentorship coordinator of ReDI Connect Berlin.
          {userType === 'public-sign-up-mentor-pending-review' && (
            <> I take the time to meet each mentor before they join our program."</>
          )}
          {userType === 'public-sign-up-mentee-pending-review' && (
            <> I take the time to go through your application before you join our program."</>
          )}
        </Element>
        <Element renderAs="p" textAlignment="centered" textSize={5}>
          <strong>Miriam Abu Hamdan</strong>
        </Element>
        <Element renderAs="p" textAlignment="centered" textSize={6}>
          Manager Mentorship Program <br />
          Career Department ReDI School <br />
          <a href="mailto:miriam@redi-school.org">miriam@redi-school.org</a>
        </Element>
        <RedCircle className="illustration illustration--toRight" />
      </>
    );
  },
  Christa: () => {
    const { userType } = useParams<RouteParams>() as RouteParams;

    return (
      <>
        <Christa className="illustration illustration--bothOut" />
        <Element renderAs="p" textAlignment="centered" textSize={4} className="about-miriam">
          “Hi, I am <strong>Christa</strong>, the mentorship coordinator of ReDI Connect.
          {userType === 'public-sign-up-mentor-pending-review' && (
            <> I take the time to meet each mentor before they join our program."</>
          )}
          {userType === 'public-sign-up-mentee-pending-review' && (
            <> I take the time to go through your application before you join our program."</>
          )}
        </Element>
        <Element renderAs="p" textAlignment="centered" textSize={5}>
          <strong>Christa Baron</strong>
        </Element>
        <Element renderAs="p" textAlignment="centered" textSize={6}>
          Head of Community Development Munich
          <br />
          ReDI School Munich
          <br />
          <a href="mailto:christa@redi-school.org">christa@redi-school.org</a>
        </Element>
        <RedCircle className="illustration illustration--toRight" />
      </>
    );
  },
};
