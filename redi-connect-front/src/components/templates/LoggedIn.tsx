import React from 'react'
import Navbar from '../organisms/Navbar'
import SideMenu from '../organisms/SideMenu'
import Button from '../atoms/Button'
import { Container, Section, Columns } from 'react-bulma-components'
import { logout } from '../../services/api/api'

import Footer from '../organisms/Footer'

const LoggedIn: React.FunctionComponent = ({ children }) => {
  return (
    <>
      <Navbar separator>
        <Button
          onClick={() => logout()}
          simple
        >
        log-out
        </Button>
      </Navbar>
      <Section className="section--bottom-large-spaceing color-half">
        <Container className="color-side-menu">
          <Columns>
            <Columns.Column
              size={2}
              responsive={{ mobile: { hide: { value: true } } }}
            >
              <SideMenu />
            </Columns.Column>
            <Columns.Column
              offset={1}
              size={9}
            >
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
