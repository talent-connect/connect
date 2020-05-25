import React from 'react'
import Navbar from '../organisms/Navbar'
import SideMenu from '../organisms/SideMenu'
import Button from '../atoms/Button'
import { Container, Section, Columns, Content } from 'react-bulma-components'
import { logout } from '../../services/api/api'
import { getRedProfile } from '../../services/auth/auth'

import Footer from '../organisms/Footer'

const LoggedIn: React.FunctionComponent = ({ children }) => {
  const profile = getRedProfile()
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
              {profile.userType === 'public-sign-up-mentee-pending-review' &&
                <Content>
                  <p>
                    Thanks for signing up! We are reviewing your profile and will send
                    you an email once we're done.
                  </p>
                  <p>You'll be able to find a mentor once your account is active.</p>
                </Content>
              }
              {profile.userType === 'public-sign-up-mentor-pending-review' &&
                <Content>
                  <p>
                    Thanks for signing up! We are reviewing your profile and will send
                    you an email once we're done.
                  </p>
                  <p>
                    Students will be able to apply to become your mentee once your
                    account is active.
                  </p>
                </Content>
              }
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
