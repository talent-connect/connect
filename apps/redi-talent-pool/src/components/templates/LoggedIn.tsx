import { Loader } from '@talent-connect/shared-atomic-design-components'
import React, { ReactNode } from 'react'
import { Columns, Container, Section } from 'react-bulma-components'
import { useIsBusy } from '../../hooks/useIsBusy'
import { Navbar } from '../organisms'
import Footer from '../organisms/Footer'

interface Props {
  children?: ReactNode
}

const LoggedIn = ({ children }: Props) => {
  const isBusy = useIsBusy()

  return (
    <>
      <Navbar />
      {/* <Section className="section--bottom-large-spaceing color-half-tablet section--separator"> */}
      <Section className="section--bottom-large-spaceing section--separator">
        <Container>
          {/* <Container className="color-side-menu"> */}
          <Columns>
            {/* <Columns.Column desktop={{ size: 2 }} className="column--side-menu">
              <SideMenu />
            </Columns.Column> */}
            <Columns.Column
              desktop={{ size: 12 }}
              className="column--main-content"
            >
              <Loader loading={isBusy} />
              {children}
            </Columns.Column>
          </Columns>
        </Container>
      </Section>
      <Footer />
    </>
  )
}

export default LoggedIn
