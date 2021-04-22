import React from 'react'
import Footer from '../organisms/Footer'
import Logo from '../atoms/Logo'

import { Container, Section } from 'react-bulma-components'

const AccountOperation: React.FunctionComponent = ({ children }) => (
  <>
    <Section className="navbar color-half-desktop">
      <Container className="navbar__wrapper">
        <Logo />
      </Container>
    </Section>
    <Section className="color-half-desktop section--bottom-large-spaceing">
      <Container>{children}</Container>
    </Section>
    <Footer />
  </>
)

export default AccountOperation
