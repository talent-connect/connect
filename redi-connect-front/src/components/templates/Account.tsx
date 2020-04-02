import React from "react";
import Footer from "../organisms/Footer";
import Logo from "../atoms/Logo";

import { Container, Section } from "react-bulma-components";

interface Props {
  children: React.ReactNode;
}

const Account = ({ children }: Props) => (
  <>
    <Section className="color-half">
      <Container>
        <Logo />
      </Container>
    </Section>
    <Section className="color-half" size="large">
      <Container>{children}</Container>
    </Section>
    <Footer />
  </>
);

export default Account;
