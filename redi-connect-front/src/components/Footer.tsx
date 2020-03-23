import React from "react";
import "./Footer.scss";
import twitter from "../assets/images/twitter.svg";
import medium from "../assets/images/medium.svg";
import instagram from "../assets/images/instagram.svg";
import linkedin from "../assets/images/linkedin.svg";

const Footer = () => {
  return (
    <div className="footer__wrapper">
      <div className="row">
        <div className="footer__container">
          <div className="footer__container-column footer__container-column-1">
            <p>ReDi School Website</p>
            <p>&copy; 2019 By ReDI School</p>
          </div>
          <div className="footer__container-column footer__container-column-2">
            <p>Contact</p>
            <p>FAQ</p>
            <a href="#">Transparency</a>
            <a href="#">Cookie policy</a>
            <a href="#">Data privacy policy</a>
          </div>
          <div className="footer__container-column footer__container-column-3">
            <p>Follow us</p>
            <div className="container__column-icons">
              <a href="#" className="footer__container-column-icons-item">
                <img src={linkedin} alt="icon" />
              </a>
              <a href="#" className="footer__container-column-icons-item">
                <img src={twitter} alt="icon" />
              </a>
              <a href="#" className="footer__container-column-icons-item">
                <img src={instagram} alt="icon" />
              </a>
              <a href="#" className="footer__container-column-icons-item">
                <img src={medium} alt="icon" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
