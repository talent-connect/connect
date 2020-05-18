import React from 'react'
import AccountOperation from '../../../components/templates/AccountOperation'
import { Columns, Form, Content } from 'react-bulma-components'
import Teaser from '../../../components/molecules/Teaser'
import Button from '../../../components/atoms/Button'
import Heading from '../../../components/atoms/Heading'
import { useHistory } from 'react-router'

export default function SignUpComplete () {
  const history = useHistory()

  return (
    <AccountOperation>
      <Columns vCentered>
        <Columns.Column
          size={5}
          responsive={{ mobile: { hide: { value: true } } }}
        >
          <Teaser.Isabelle />
        </Columns.Column>
        <Columns.Column size={5} offset={2}>
          <Heading border="bottomLeft">Meet Isabelle</Heading>
          <Content size="large" renderAs="div">
            <p>Your email address has been successfully confirmed!</p>

            <p>Now, we would like to get to know you better. To activate your account,
            please <strong>schedule a 15 Minute meeting with Isabelle</strong>.
            Just write her an email with suitable meeting times!</p>
          </Content>
          <Form.Field className="submit-spacer">
            <Form.Control>
              <Button
                onClick={() => history.push('/home')}
              >Return to ReDI Connect Website</Button>
            </Form.Control>
          </Form.Field>
          <Content size="small" renderAs="p">
            Do you have questions? Feel free to contact us <a href="mailto:isabelle@redi-school.org">here</a> or visit our <a href="https://www.redi-school.org/" target="__blank">ReDI school website</a> for more information.
          </Content>
        </Columns.Column>
      </Columns>
    </AccountOperation>
  )
}
