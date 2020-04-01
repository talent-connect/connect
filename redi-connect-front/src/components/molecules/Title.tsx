import React from "react";
import { Container, Section, Content } from "react-bulma-components";
import "./Title.scss";

interface Props {
  teaser: string;
  colorCode?: string;
  headline: string;
}

const Title = ({ teaser, colorCode = "##ea5b29", headline }: Props) => {
  return (
    <Container>
      <Section className="title__wrapper">
        <Content className="title__teaser">{teaser}</Content>
        <div className="title__line" style={{ borderColor: colorCode }} />
        <Content className="title__headline">{headline}</Content>
      </Section>
    </Container>
  );
};

export default Title;
