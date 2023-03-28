import {
  Loader,
  RediTalentPoolLogo,
} from '@talent-connect/shared-atomic-design-components'
import React from 'react'
import { Container, Section } from 'react-bulma-components'
import { useIsBusy } from '../../hooks/useIsBusy'
import Footer from '../organisms/Footer'

const AccountOperation: React.FunctionComponent = ({ children }) => {
  const isBusy = useIsBusy()

  return (
    <>
      <Section className="navbar color-half-desktop">
        <Container className="navbar__wrapper">
          <RediTalentPoolLogo />
        </Container>
      </Section>
      <Section className="color-half-desktop section--bottom-large-spaceing">
        <Loader loading={isBusy} />
        <Container>{children}</Container>
      </Section>
      <Footer />
    </>
  )
}

export default AccountOperation
