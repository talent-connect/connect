import { Heading } from '@talent-connect/shared-atomic-design-components'
import { useState } from 'react'
import { Columns } from 'react-bulma-components'
import Landing from '../../../components/templates/Landing'
import { getEntraLoginUrl } from '../../../services/api/api'

export default function EntraLogin() {
  const [loginError, setLoginError] = useState<string>('')
  const [entraUrl, setEntraUrl] = useState<string>('')

  const getLoginUrl = async (): Promise<void> => {
    try {
      const url = await getEntraLoginUrl()
      setEntraUrl(url)
    } catch (err) {
      setLoginError('Could not log in with Entra')
    }
  }
  getLoginUrl();
  return (
    <Landing>
      <Columns vCentered>
        <Columns.Column size={5} offset={1}>
          <Heading border="bottomLeft">{entraUrl}</Heading>
        </Columns.Column>
      </Columns>
    </Landing>
  )
}
