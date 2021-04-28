import React, { ReactNode, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  Button,
  Icon,
  Loader,
} from '@talent-connect/shared-atomic-design-components'
import { Modal } from '@talent-connect/shared-atomic-design-components'
import { Navbar, SideMenu } from '../organisms'
import {
  Container,
  Section,
  Columns,
  Content,
  Notification,
} from 'react-bulma-components'

import Footer from '../organisms/Footer'
import { RedMatch } from '@talent-connect/shared-types'

interface Props {
  loading: boolean
  children?: ReactNode
}

const AccountNotReDI: React.FC = ({ children }) => (
  <Notification className="account-not-active double-bs">
    <Icon
      className="account-not-active__icon"
      icon="mail"
      size="large"
      space="right"
    />
    <Content size="small">{children}</Content>
  </Notification>
)

const LoggedIn = ({ loading, children }: Props) => {
  const history = useHistory()

  return (
    <>
      <Navbar />
      <Section className="section--bottom-large-spaceing color-half-tablet section--separator">
        <Container className="color-side-menu">
          <Columns>
            <Columns.Column desktop={{ size: 6 }} className="column--side-menu">
              <SideMenu />
              Side menu
            </Columns.Column>
            <Columns.Column
              desktop={{ size: 6 }}
              className="column--main-content"
            >
              <Loader loading={loading} />
              Main
              {!loading && children}
            </Columns.Column>
          </Columns>
        </Container>
      </Section>
      <Footer />
    </>
  )
}

export default LoggedIn
