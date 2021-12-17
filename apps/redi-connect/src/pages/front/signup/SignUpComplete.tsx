import { FunctionComponent } from 'react'
import AccountOperation from '../../../components/templates/AccountOperation'
import { ReactComponent as WelcomeIllustration } from '../../../assets/images/welcome-user.svg'
import { Columns, Form, Content } from 'react-bulma-components'
import { useHistory, useParams } from 'react-router'
import { UserType } from '@talent-connect/shared-types'
import {
  Heading,
  Button,
} from '@talent-connect/shared-atomic-design-components'

type RouteParams = {
  userType: UserType
}

const SignUpComplete: FunctionComponent = () => {
  const history = useHistory()
  const { userType } = useParams<RouteParams>() as RouteParams

  return (
    <AccountOperation>
      <Columns vCentered>
        <Columns.Column
          size={5}
          responsive={{ mobile: { hide: { value: true } } }}
        >
          <WelcomeIllustration className="illustration illustration--rightOut" />
        </Columns.Column>
        <Columns.Column size={5} offset={2}>
          <Heading border="bottomLeft">Meet the team</Heading>
          <Content size="large" renderAs="div">
            <p>Your email address was successfully verified!</p>
            {userType === 'public-sign-up-mentor-pending-review' && (
              <p>
                Now, we would like to get to know you better. We regularly
                organize mentor onboardings in small groups.{' '}
                <a href="https://calendly.com/redi-miriam/redi-mentor-group-onboarding">
                  <strong>
                    Please book yourself in for one of the open 30-minute slots.
                  </strong>
                </a>
              </p>
            )}
            {userType === 'public-sign-up-mentee-pending-review' && (
              <p>
                Now, we would like to get to know you better. To activate your
                account,{' '}
                <a href="https://calendly.com/d/ch4-6xt-2j3/mentee-onboarding-to-redi-connect">
                  <strong>please schedule a 15-minute meeting with us. </strong>
                </a>
              </p>
            )}
          </Content>
          <Form.Field className="submit-spacer">
            <Form.Control>
              <Button onClick={() => history.push('/home')}>
                Return to ReDI Connect Website
              </Button>
            </Form.Control>
          </Form.Field>
          <Content size="small" renderAs="p">
            Do you have questions? Feel free to contact us{' '}
            <a href="mailto:miriam@redi-school.org">here</a> or visit our{' '}
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

export default SignUpComplete