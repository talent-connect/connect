import { useMyTpDataQuery } from '@talent-connect/data-access'
import { Button, Loader } from '@talent-connect/shared-atomic-design-components'
import { Columns, Content, Form } from 'react-bulma-components'
import { useHistory } from 'react-router-dom'
import TpTeaser from '../../../components/molecules/TpTeaser'
import AccountOperation from '../../../components/templates/AccountOperation'

export default function SignUpComplete() {
  const history = useHistory()

  const { data: myTpUserData, isLoading } = useMyTpDataQuery()

  const representativeStatus =
    myTpUserData?.tpCurrentUserDataGet?.companyRepresentativeRelationship
      ?.status

  if (isLoading) {
    return <Loader loading />
  }

  return (
    <AccountOperation>
      <Columns vCentered>
        <Columns.Column
          size={5}
          responsive={{ mobile: { hide: { value: true } } }}
        >
          <TpTeaser.IllustrationOnly />
        </Columns.Column>
        <Columns.Column size={5} offset={2}>
          <Content size="large" renderAs="div">
            <p>Thank you for signing up!</p>
            {representativeStatus === 'PENDING' ? (
              <>
                <p>
                  You've requested to represent a company already signed up on
                  Talent Pool,{' '}
                  {
                    myTpUserData.tpCurrentUserDataGet.representedCompany
                      ?.companyName
                  }
                  !
                </p>
                <p>
                  We'll contact the existing representatives to validate and
                  approve your request. Thank you for your patience.
                </p>
                <p>
                  Once we've handled your request, we'll send you another email.
                </p>
              </>
            ) : (
              <p>Now it's time to work on your profile:</p>
            )}
          </Content>
          {representativeStatus !== 'PENDING' ? (
            <Form.Field className="submit-spacer">
              <Form.Control>
                <Button onClick={() => history.push('/app/me')}>
                  Continue to your profile
                </Button>
              </Form.Control>
            </Form.Field>
          ) : null}
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
