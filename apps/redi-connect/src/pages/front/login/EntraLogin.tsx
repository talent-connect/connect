import { Heading } from '@talent-connect/shared-atomic-design-components'
import { useState } from 'react'
import { Columns } from 'react-bulma-components'
import Landing from '../../../components/templates/Landing'
import { getEntraLoginUrl } from '../../../services/api/api'

export default function EntraLogin() {
  const [loginError, setLoginError] = useState<string>('')

  return (
    <Landing>
      <Columns vCentered>
        <Columns.Column size={5} offset={1}>
          <Heading border="bottomLeft">{loginError}</Heading>
        </Columns.Column>
      </Columns>
    </Landing>
  )
}
