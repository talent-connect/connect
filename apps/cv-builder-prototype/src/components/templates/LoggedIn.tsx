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
interface Props {
  children?: ReactNode
}

const LoggedIn = ({ children }: Props) => {
  const isFetching = useIsFetching()

  return (
    <>
      <Navbar />
      <Section>{children}</Section>
      <Footer />
    </>
  )
}

export default LoggedIn
