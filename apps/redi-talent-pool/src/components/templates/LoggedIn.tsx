import { Loader } from '@talent-connect/shared-atomic-design-components'
import React, { ReactNode } from 'react'
import { Columns, Container, Section } from 'react-bulma-components'
import { useIsBusy } from '../../hooks/useIsBusy'
import { TpMainNavItem } from '../molecules/TpMainNavItem'
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
      <Section>
        <div>
          <Container>
            <div style={{ display: 'flex' }}>
              <div style={{ backgroundColor: '#EFF6F8', minWidth: '84px' }}>
                <TpMainNavItem page="profile-page" isActive />
                <TpMainNavItem page="browse-page" />
                <TpMainNavItem page="cv-builder-page" />
              </div>
              <div>
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
        </div>
      </Section>
      <Footer />
    </>
  )
}

export default LoggedIn
