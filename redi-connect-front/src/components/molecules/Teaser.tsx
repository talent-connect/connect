import React from "react";
import { ReactComponent as WelcomeIllustration } from "../../assets/welcome-user.svg";
import { Content } from "react-bulma-components";
import { Link } from "react-router-dom";

const Teaser: React.FunctionComponent = ({ children }) => {
  return (
    <>
      <WelcomeIllustration className="illustration" />
      <Content textTransform="uppercase">{children}</Content>
    </>
  );
};

export default {
  SignUp: () => (
    <Teaser>
      Don't have an account yet?{" "}
      <Link to="/front/signup/landing">signup here</Link>
    </Teaser>
  ),
  SignIn: () => (
    <Teaser>
      Already have an account? <Link to="/front/login">sign-in hereeeee</Link>
    </Teaser>
  ),
};
