import React from 'react';
import AccountOperation from '../../../components/templates/AccountOperation';
import { Columns, Form, Content } from 'react-bulma-components';
import Teaser from '../../../components/molecules/Teaser';
import Button from '../../../components/atoms/Button';
import Heading from '../../../components/atoms/Heading';
import { useHistory, useParams } from 'react-router';
import { RediLocation } from '../../../types/RediLocation';
import { envRediLocation } from '../../../utils/env-redi-location';
import { UserType } from '../../../types/UserType';

type RouteParams = {
  userType: UserType;
};

export default function SignUpComplete() {
  const history = useHistory();
  const { userType } = useParams<RouteParams>() as RouteParams;

  return (
    <AccountOperation>
      <Columns vCentered>
        <Columns.Column size={5} responsive={{ mobile: { hide: { value: true } } }}>
          {envRediLocation() === 'berlin' && <Teaser.Miriam />}
          {envRediLocation() === 'nrw' && <Teaser.Miriam />}
          {envRediLocation() === 'munich' && <Teaser.Christa />}
        </Columns.Column>
        <Columns.Column size={5} offset={2}>
          <Heading border="bottomLeft">
            {['berlin', 'nrw'].includes(envRediLocation()) &&
              userType === 'public-sign-up-mentor-pending-review' && <>Meet Miriam</>}
            {['berlin', 'nrw'].includes(envRediLocation()) &&
              userType === 'public-sign-up-mentee-pending-review' && <>Meet Paulina</>}
            {envRediLocation() === 'munich' && <>Meet Christa</>}
          </Heading>
          <Content size="large" renderAs="div">
            <p>Your email address was successfully verified!</p>

            {['berlin', 'nrw'].includes(envRediLocation()) &&
              userType === 'public-sign-up-mentor-pending-review' && (
                <p>
                  Now, we would like to get to know you better. To activate your account, please
                  {` `}
                  <strong>
                    <a href="https://calendly.com/redi-miriam/mentor-onboarding">
                      schedule a 20 minute meeting with Miriam here
                    </a>
                  </strong>
                  .
                </p>
              )}
            {['berlin', 'nrw'].includes(envRediLocation()) &&
              userType === 'public-sign-up-mentee-pending-review' && (
                <>
                  <p>
                    Now, we would like to get to know you better. To activate your account, please{' '}
                    <strong>schedule a 15 minute meeting with Paulina. </strong>
                  </p>
                  <p>
                    Please schedule a time for a meeting with me here:{' '}
                    <a href="https://calendly.com/paulina-redi/getting-to-know-you">
                      Getting-to-know-you
                    </a>
                  </p>
                </>
              )}
            {envRediLocation() === 'munich' && (
              <p>
                We will review your profile and get in touch with you if there is anything missing.
                We'll send you an email once we're done.
              </p>
            )}
          </Content>
          <Form.Field className="submit-spacer">
            <Form.Control>
              <Button onClick={() => history.push('/home')}>Return to ReDI Connect Website</Button>
            </Form.Control>
          </Form.Field>
          <Content size="small" renderAs="p">
            {['berlin', 'nrw'].includes(envRediLocation()) && (
              <>
                Do you have questions? Feel free to contact us{' '}
                <a href="mailto:miriam@redi-school.org">here</a> or visit our{' '}
                <a href="https://www.redi-school.org/" target="__blank">
                  ReDI school website
                </a>{' '}
                for more information.
              </>
            )}
            {(process.env.REACT_APP_REDI_LOCATION as RediLocation) === 'munich' && (
              <>
                If you have any questions or comments, simply contact Christa via e-mail at{' '}
                <a href="mailto:christa@redi-school.org">christa@redi-school.org</a> or slack:
                Christa Baron
              </>
            )}
          </Content>
        </Columns.Column>
      </Columns>
    </AccountOperation>
  );
}
