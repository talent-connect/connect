import React from 'react'
import Navbar from '../organisms/Navbar'
import Button from '../atoms/Button'
import { Container, Section, Columns } from 'react-bulma-components'
import { logout } from '../../services/api/api'
import { NavLink } from 'react-router-dom'
import './LoggedIn.scss'

import Footer from '../organisms/Footer'

const MenuItem = ({ url, children }: {url: string, children: string}) => {
  return (
    <li className="side-menu__item">
      <NavLink
        to={url}
        className="side-menu__item__link"
        activeClassName="side-menu__item__link--active">
        {children}
      </NavLink>
    </li>
  )
}

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
              <ul className="side-menu">
                <MenuItem url="/app/me">My Profile</MenuItem>
                <MenuItem url="/app/dashboard">Find a mentor</MenuItem>
                <MenuItem url="/app/applications">Applications</MenuItem>
              </ul>
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
