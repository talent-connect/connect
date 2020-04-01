import React from "react";
import {
  Container,
  Section,
  Hero,
  Columns,
  Heading,
  Content,
} from "react-bulma-components";
import Button from "../atoms/Button";
import team from "../../assets/images/hero.svg";
import teamMobile from "../../assets/images/hero-mobile.svg";
import "./RediHero.scss";

const RediHero = () => (
  <Hero>
    <Container>
      <Section>
        <Columns>
          <Columns.Column size={5} className="hero-column">
            <Heading size={1} className="hero-column-heading">
              Welcome to ReDI Connect
            </Heading>
            <Columns.Column className="is-hidden-tablet">
              <img src={teamMobile} alt="team" className="hero-column-img" />
            </Columns.Column>
            <Content className="hero-column-content">
              Are you ready for the future of work? We connect thriving
              professionals from the digital industry with students and alumni
              of our Digital Career Program.{" "}
            </Content>
            <Button size="large" text="sign-up now!" />
          </Columns.Column>
          <Columns.Column offset={1} className="is-hidden-mobile">
            <img src={team} alt="team" className="hero-column-img" />
          </Columns.Column>
        </Columns>
      </Section>
    </Container>
  </Hero>
);

export default RediHero;
