import { RediConnectLogo } from '@talent-connect/shared-atomic-design-components'
import React from 'react'
import Footer from '../organisms/Footer'

import { Container, Section } from 'react-bulma-components'

const AccountOperation: React.FunctionComponent = ({ children }) => (
  <>
    <Section className="navbar color-half-desktop">
      <Container className="navbar__wrapper">
        <RediConnectLogo />
      </Container>
    </Section>
    <Section className="color-half-desktop section--bottom-large-spaceing">
      <Container>{children}</Container>
    </Section>
    <Footer />
  </>
)

export default AccountOperation
