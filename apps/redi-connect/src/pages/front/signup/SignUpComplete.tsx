import { RediLocation } from '@talent-connect/data-access'
import {
  Button,
  Heading,
} from '@talent-connect/shared-atomic-design-components'
import { Columns, Content, Form } from 'react-bulma-components'
import { useHistory, useParams } from 'react-router-dom'
import { Teaser } from '../../../components/molecules'
import AccountOperation from '../../../components/templates/AccountOperation'
import { envRediLocation } from '../../../utils/env-redi-location'
import { SignUpPageType, SignUpPageTypes } from './signup-page.type'

export default function SignUpComplete() {
  const history = useHistory()
  const rediLocation = envRediLocation() as RediLocation
  const { userType } = useParams() as unknown as { userType: SignUpPageType }

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
            {userType === SignUpPageTypes.mentor && (
              <>
                <p style={{ textAlign: 'justify' }}>
                  Now, we would like to get to know you better. We regularly
                  organize mentor onboardings in small groups.{' '}
                  <a href="https://calendly.com/hadeertalentsucess/mentors-onboarding-session">
                    <strong>
                      Please book yourself in for one of the open 30-minute
                      slots.
                    </strong>
                  </a>
                </p>
                <p style={{ textAlign: 'justify' }}>
                  If you are a ReDI partner, your profile will be activated
                  automatically - you don't have to select a date!
                </p>
              </>
            )}
            {userType === SignUpPageTypes.mentee && (
              <>
                <p style={{ textAlign: 'justify' }}>
                  Your next step is to watch a short onboarding tutorial to get
                  a good overview of the mentorship program and how our matching
                  platform ReDI Connect works.
                </p>
                <p>
                  <a
                    href="https://www.youtube.com/watch?v=M3nwS3QfdMM"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      style={{ width: '100%' }}
                      src="https://redi-connect-email-assets.s3.eu-west-1.amazonaws.com/redi-connect-sign-up-video-thumbnail.jpeg"
                      alt=""
                    />
                  </a>
                </p>

                <p style={{ textAlign: 'justify' }}>
                  Your <strong>final step</strong> after watching this video
                  will be your activation call with our team -{' '}
                  <a
                    href={
                      rediLocation === 'CYBERSPACE'
                        ? 'https://calendly.com/josefa_cyberspace/redi-connect-mentees-activation-call-cyberspace-only'
                        : 'https://calendly.com/hadeertalentsucess/redi-connect-mentees-activation-call'
                    }
                    target="_blank"
                    rel="noreferrer"
                  >
                    schedule your activation call now
                  </a>
                  .
                </p>
              </>
            )}
          </Content>
          <Form.Field className="submit-spacer">
            <Form.Control>
              <Button onClick={() => history.push('/app/me')}>
                Continue to profile
              </Button>
            </Form.Control>
          </Form.Field>
        </Columns.Column>
      </Columns>
    </AccountOperation>
  )
}
