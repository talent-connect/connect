import React from "react";
import Headline from "./Headline";
import Button from "./Button";
import "./Hero.scss";

const Hero = () => {
  return (
    <div className="hero__wrapper">
      <div className="row">
        <div className="hero__container">
          <Headline boldText="Welcome to ReDI Connect" />
          <div className="hero__container-text">
            Are you ready for the future of work? We connect thriving
            professionals from the digital industry with students and alumni of
            our Digital Career Program.
          </div>
          <div className="hero__container-btn">
            <Button text="sign-up now!" btnType="big" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
