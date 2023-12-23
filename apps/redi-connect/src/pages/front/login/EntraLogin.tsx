import { Heading } from '@talent-connect/shared-atomic-design-components'
import { useState } from 'react'
import { Columns, Content } from 'react-bulma-components'
import Landing from '../../../components/templates/Landing'

export default function EntraLogin() {
  const [loginError] = useState<string>('')

  return (
    <Landing>
      <Columns vCentered>
        <Columns.Column size={11} offset={1}>
          <Heading border="bottomLeft">Entra ID Login - still WIP</Heading>
          <Content>{loginError}</Content>
        </Columns.Column>
      </Columns>
    </Landing>
  )
}
