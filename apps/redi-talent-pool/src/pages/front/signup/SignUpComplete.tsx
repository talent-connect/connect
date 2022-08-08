import { Button } from '@talent-connect/shared-atomic-design-components'
import { Columns, Content, Form } from 'react-bulma-components'
import { useHistory, useParams } from 'react-router-dom'
import AccountOperation from '../../../components/templates/AccountOperation'

export default function SignUpComplete() {
  const history = useHistory()

  return (
    <AccountOperation>
      <Columns vCentered>
        <Columns.Column
          size={5}
          responsive={{ mobile: { hide: { value: true } } }}
        ></Columns.Column>
        <Columns.Column size={5} offset={2}>
          <Content size="large" renderAs="div">
            <p>Thank you for signing up!</p>
            <p>Now it's time to work on your profile:</p>
          </Content>
          <Form.Field className="submit-spacer">
            <Form.Control>
              <Button onClick={() => history.push('/app/me')}>
                Continue to your profile
              </Button>
            </Form.Control>
          </Form.Field>
          <Content size="small" renderAs="p">
            Do you have questions? Feel free to contact us{' '}
            <a href="mailto:paulina@redi-school.org">here</a> or visit our{' '}
            <a href="https://www.redi-school.org/" target="__blank">
              ReDI school website
            </a>{' '}
            for more information.
          </Content>
        </Columns.Column>
      </Columns>
    </AccountOperation>
  )
}
