import React, { ReactNode, useEffect } from 'react'
import { useIsFetching } from 'react-query'
import {
  Button,
  Icon,
  Loader,
} from '@talent-connect/shared-atomic-design-components'
import { Navbar } from '../organisms'
import {
  Container,
  Section,
  Columns,
  Content,
  Notification,
} from 'react-bulma-components'

import Footer from '../organisms/Footer'
import { useIsBusy } from '../../hooks/useIsBusy'
import SideMenu from '../organisms/SideMenu'
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
