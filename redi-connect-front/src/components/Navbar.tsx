import React from "react";
import "./Navbar.scss";
import Button from "./Button";

const Navbar = () => {
  return (
    <div className="navbar__wrapper">
      <div className="row">
        <div className="navbar__container">
          <div className="navbar__container-logo">REDI CONNECT</div>
          <div className="navbar__container-nav">
            <div className="navbar__container-nav__login">LOG-IN</div>
            <div className="navbar__container-nav__signup">
              <Button text="sign-up" btnType="medium" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
