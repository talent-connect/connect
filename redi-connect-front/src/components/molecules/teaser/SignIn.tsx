import React from "react";
import { ReactComponent as WelcomeIllustration } from "../../../assets/welcome-user.svg";
import { Content } from "react-bulma-components";
import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <>
      <WelcomeIllustration className="illustration" />
      <Content textTransform="uppercase">
        Don't have an account yet?{" "}
        <Link to="/front/signup/landing">signup here</Link>
      </Content>
    </>
  );
};

export default SignIn;
