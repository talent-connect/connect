import { Heading } from '@talent-connect/shared-atomic-design-components'
import { FC } from 'react'
import { Columns, Content } from 'react-bulma-components'
import TpTeaser from '../../../components/molecules/TpTeaser'
import AccountOperation from '../../../components/templates/AccountOperation'

const SignUpEmailVerification: FC = () => (
  <AccountOperation>
    <Columns vCentered>
      <Columns.Column
        size={5}
        responsive={{ mobile: { hide: { value: true } } }}
      >
        <TpTeaser.IllustrationOnly />
      </Columns.Column>

      <Columns.Column size={5} offset={2}>
        <Heading border="bottomLeft">Welcome to ReDI Talent Pool</Heading>
        <Content size="large" renderAs="div">
          <p>Thank you for signing up!</p>
          <p>
            Please first <strong>verify your email address</strong> with the
            email we just sent to you.
          </p>
          <p>Then, we are ReDI to get to know you better!</p>
        </Content>
      </Columns.Column>
    </Columns>
  </AccountOperation>
)

export default SignUpEmailVerification
