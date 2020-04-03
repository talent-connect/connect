import React, { useState } from "react";
import { Section, Container, Content, Image } from "react-bulma-components";
import Button from "../atoms/Button";
import Logo from "../atoms/Logo";
import burger from "../../assets/images/hamburger.svg";
import "./LoggedOutNavbar.scss";

const LoggedOutNavbar = () => {
  const [menuActive, setMenuActive] = useState(false);

  const mobileMenu = (
    <Section className="navbar__wrapper-mobile">
      <Content
        className="navbar__close"
        onClick={() => setMenuActive(!menuActive)}
      >
        &times;
      </Content>
      <Button size="medium" text="Sign-up now!" />
      <Button size="medium" text="log-in" type="simple" />
    </Section>
  );

  return (
    <Container>
      <Section className="navbar__wrapper">
        <Content>
          <Logo />
        </Content>
        <Content
          responsive={{ mobile: { hide: { value: true } } }}
          className="is-flex"
        >
          <Content>
            <Button size="small" text="log-in" type="simple" />
          </Content>
          <Content>
            <Button size="small" text="Sign-up" />
          </Content>
        </Content>
        <Content
          responsive={{ tablet: { hide: { value: true } } }}
          onClick={() => setMenuActive(!menuActive)}
        >
          <Image src={burger} alt="hamburger icon" className="navbar__image" />
        </Content>
        {menuActive && mobileMenu}
      </Section>
    </Container>
  );
};

export default LoggedOutNavbar;
