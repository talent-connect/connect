import {
  RediLocation,
  useLoadMyProfileQuery,
} from '@talent-connect/data-access'
import {
  Button,
  Heading,
} from '@talent-connect/shared-atomic-design-components'
import { Columns, Content, Form } from 'react-bulma-components'
import { useHistory, useParams } from 'react-router-dom'
import { Teaser } from '../../../components/molecules'
import AccountOperation from '../../../components/templates/AccountOperation'
import { getAccessTokenFromLocalStorage } from '../../../services/auth/auth'
import { envRediLocation } from '../../../utils/env-redi-location'
import { SignUpPageType, SignUpPageTypes } from './signup-page.type'

export default function SignUpComplete() {
  const history = useHistory()
  const rediLocation = envRediLocation() as RediLocation
  const { userType } = useParams() as unknown as { userType: SignUpPageType }

  const loopbackUserId = getAccessTokenFromLocalStorage().userId
  const myProfileQuery = useLoadMyProfileQuery({ loopbackUserId })
  const isPartnershipMentor =
    myProfileQuery.data?.conProfile.mentor_isPartnershipMentor === true

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
          <Heading border="bottomLeft">Sign-up complete!</Heading>
          <Content size="large" renderAs="div">
            {userType === SignUpPageTypes.mentor &&
              (isPartnershipMentor ? (
                <>
                  <p style={{ textAlign: 'justify' }}>
                    Thank you for signing up!{' '}
                  </p>
                  <p>
                    Please go to your account and{' '}
                    <strong>complete your profile information</strong>.
                  </p>
                </>
              ) : (
                <>
                  <p style={{ textAlign: 'justify' }}>
                    Thank you for signing up!{' '}
                  </p>
                  <p style={{ textAlign: 'justify' }}>
                    Please click on <strong>"Continue to your profile"</strong>{' '}
                    and complete all the steps from the stepper at the top of
                    your profile page.
                  </p>
                  <p style={{ textAlign: 'justify' }}>
                    After sending your profile for review and having an
                    onboarding call with our Mentorship Program Manager, your
                    profile will become visible to mentees.
                  </p>
                </>
              ))}

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
                  After watching the video, please click on{' '}
                  <strong>"Continue to your profile"</strong> and complete all
                  the steps from the stepper at the top of your profile page.
                  After sending your profile for review, you will need to wait a
                  bit until our Mentorship Program Manager approves it. Once
                  approved, you will be able to find a mentor and start your
                  mentorship journey immediately.
                </p>
              </>
            )}
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
            <a href="mailto:career@redi-school.org">here</a> or visit our{' '}
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
