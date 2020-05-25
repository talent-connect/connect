import React from 'react'
import AccountOperation from '../../../components/templates/AccountOperation'
import { Columns, Form, Content } from 'react-bulma-components'
import Teaser from '../../../components/molecules/Teaser'
import Button from '../../../components/atoms/Button'
import Heading from '../../../components/atoms/Heading'
import { useHistory } from 'react-router'
import { RediLocation } from '../../../types/RediLocation'

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
            <p>Your email address was successfully verified!</p>

            {(process.env.REACT_APP_REDI_LOCATION as RediLocation) === 'berlin' && (
              <p>Now, we would like to get to know you better. To activate your account, please <strong>schedule a 15 minute meeting with Isabelle.</strong>
              Just write her an email with suitable meeting times!</p>
            )}
            {(process.env.REACT_APP_REDI_LOCATION as RediLocation) === 'munich' && (
              <p>We will review your profile and get in touch with you if there is anything missing. We'll send you an email once we're done.</p>
            )}
          </Content>
          <Form.Field className="submit-spacer">
            <Form.Control>
              <Button
                onClick={() => history.push('/home')}
              >Return to ReDI Connect Website</Button>
            </Form.Control>
          </Form.Field>
          <Content size="small" renderAs="p">
            {(process.env.REACT_APP_REDI_LOCATION as RediLocation) === 'berlin' && (
              <>
            Do you have questions? Feel free to contact us <a href="mailto:isabelle@redi-school.org">here</a> or visit our <a href="https://www.redi-school.org/" target="__blank">ReDI school website</a> for more information.
              </>
            )}
            {(process.env.REACT_APP_REDI_LOCATION as RediLocation) === 'munich' && (
              <>
              If you have any questions or comments, imply contact Christa via e-mail at <a href="mailto:christa@redi-school.org">christa@redi-school.org</a> or slack: Christa Baron
              </>
            )}
          </Content>
        </Columns.Column>
      </Columns>
    </AccountOperation>
  )
}
