import { Loader } from '@talent-connect/shared-atomic-design-components'
import React, { ReactNode } from 'react'
import { Columns, Container, Section } from 'react-bulma-components'
import { useIsBusy } from '../../hooks/useIsBusy'
import { TpMainNavItem } from '../molecules/TpMainNavItem'
import { Navbar } from '../organisms'
import Footer from '../organisms/Footer'
import './LoggedIn.scss'

interface Props {
  children?: ReactNode
}

const LoggedIn = ({ children }: Props) => {
  const isBusy = useIsBusy()

  return (
    <>
      <Navbar leftPaddingOn />
      <Container>
        <div style={{ display: 'flex' }}>
          <div style={{ backgroundColor: '#EFF6F8', minWidth: '84px' }}>
            <TpMainNavItem page="profile-page" to="/app/me" isActive />
            <TpMainNavItem
              page="browse-page"
              to="https://www.google.com"
              isDisabled
            />
            <TpMainNavItem
              page="cv-builder-page"
              to="https://www.google.com"
              isDisabled
            />
          </div>
          <div className="main--wrapper">
            <Columns>
              <Columns.Column
                desktop={{ size: 12 }}
                className="column--main-content"
              >
                <Loader loading={isBusy} />
                {children}
              </Columns.Column>
            </Columns>
          </div>
        </div>
      </Container>
      <Footer />
    </>
  )
}

export default LoggedIn
