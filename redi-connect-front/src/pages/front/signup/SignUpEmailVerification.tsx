import React from 'react'
import AccountOperation from '../../../components/templates/AccountOperation'
import { Columns, Content } from 'react-bulma-components'
import Teaser from '../../../components/molecules/Teaser'
import Heading from '../../../components/atoms/Heading'
import { envRediLocation } from '../../../utils/env-redi-location'
import { UserType } from '../../../types/UserType'
import { useParams } from 'react-router'

type RouteParams = {
  userType: UserType
}

export default function SignUpEmailVerification () {
  const { userType } = useParams<RouteParams>() as RouteParams
  
  return (
    <AccountOperation>
      <Columns vCentered>
        <Columns.Column
          size={5}
          responsive={{ mobile: { hide: { value: true } } }}
        >
          {envRediLocation() === 'berlin' && <Teaser.Isabelle />}
          {envRediLocation() === 'munich' && <Teaser.Christa targetUserGroup={userType} />}
        </Columns.Column>

        <Columns.Column size={5} offset={2}>
          <Heading border="bottomLeft">Welcome to ReDI Connect</Heading>
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
