import React from "react";
import { ReactComponent as WelcomeIllustration } from "../../../assets/welcome-user.svg";
import { Content } from "react-bulma-components";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <>
      <WelcomeIllustration className="illustration" />
      <Content textTransform="uppercase">
        Already have an account? <Link to="/front/login">sign-in here</Link>
      </Content>
    </>
  );
};

export default SignUp;
