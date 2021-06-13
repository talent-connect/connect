import { RediTalentPoolLogo } from '@talent-connect/shared-atomic-design-components'
import React from 'react'
import { Container, Section } from 'react-bulma-components'
import Footer from '../organisms/Footer'

const AccountOperation: React.FunctionComponent = ({ children }) => (
  <>
    <Section className="navbar color-half-desktop">
      <Container className="navbar__wrapper">
        <RediTalentPoolLogo />
      </Container>
    </Section>
    <Section className="color-half-desktop section--bottom-large-spaceing">
      <Container>{children}</Container>
    </Section>
    <Footer />
  </>
)

export default AccountOperation
