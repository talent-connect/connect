import React from 'react'
import AccountOperation from '../../../components/templates/AccountOperation'
import { Columns, Heading, Content } from 'react-bulma-components'
import Teaser from '../../../components/molecules/Teaser'

export default function SignUpComplete () {
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
          <Heading
            size={1}
            weight="normal"
            renderAs="h1"
            responsive={{ mobile: { textSize: { value: 2 } } }}
            className="title--border"
            spaced={true}
          >
            Welcome to ReDI Connect
          </Heading>

          <Content size="large" renderAs="div">
            <p>Thank you for signing up!</p>
            <p>Please first <strong>verify your email address</strong> with the email we just sent to you.</p>
            <p>Then, we are ReDI to get to know you better!</p>
          </Content>
        </Columns.Column>
      </Columns>
    </AccountOperation>
  )
}
