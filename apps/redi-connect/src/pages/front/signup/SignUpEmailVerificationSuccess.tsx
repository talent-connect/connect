import {
  Button,
  Heading,
} from '@talent-connect/shared-atomic-design-components'
import { Columns, Content, Form } from 'react-bulma-components'
import { useHistory } from 'react-router-dom'
import { Teaser } from '../../../components/molecules'
import AccountOperation from '../../../components/templates/AccountOperation'

export default function SignUpEmailVerificationSuccess() {
  const history = useHistory()

  return (
    <AccountOperation>
      <Columns vCentered>
        <Columns.Column
          size={6}
          responsive={{ mobile: { hide: { value: true } } }}
        >
          <Teaser.IllustrationOnly />
        </Columns.Column>
        <Columns.Column size={5} offset={1}>
          <Heading border="bottomLeft">Email verified!</Heading>
          <Content size="large" renderAs="div">
            <p>Thank you for verifying your email!</p>
            <p>Now, please log in.</p>
          </Content>
          <Form.Field className="submit-spacer">
            <Form.Control>
              <Button onClick={() => history.push('/front/login')}>
                Log in
              </Button>
            </Form.Control>
          </Form.Field>
        </Columns.Column>
      </Columns>
    </AccountOperation>
  )
}
