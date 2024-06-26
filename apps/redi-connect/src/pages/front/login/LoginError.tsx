import {
  Button,
  Heading,
} from '@talent-connect/shared-atomic-design-components'
import { Columns, Content, Form } from 'react-bulma-components'
import { useHistory } from 'react-router-dom'
import { Teaser } from '../../../../../redi-connect/src/components/molecules'
import AccountOperation from '../../../../../redi-connect/src/components/templates/AccountOperation'

export default function LoginError() {
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
          <Heading border="bottomLeft">Changes to Your Platform Access</Heading>
          <Content size="large" renderAs="div">
            <p>
              Ooops! It seems like your access to the platform has changed, If
              you believe this is a mistake or have any questions, please reach
              out to us at{' '}
              <a href="mailto:career@redi-school.org">career@redi-school.org</a>
              . We're here to help!
            </p>
          </Content>
          <Form.Field className="submit-spacer">
            <Form.Control>
              <Button onClick={() => history.push('/')}>Go Back</Button>
            </Form.Control>
          </Form.Field>
        </Columns.Column>
      </Columns>
    </AccountOperation>
  )
}
