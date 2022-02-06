import { FC, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Content, Columns, Element } from 'react-bulma-components'
import AccountOperation from '../../../components/templates/AccountOperation'
import Teaser from '../../../components/molecules/Teaser'
import {
  Button,
  Heading,
  SVGImage,
} from '@talent-connect/shared-atomic-design-components'
import classnames from 'classnames'
import './SignUpLanding.scss'

const SignUpLanding() {
  const [selectedType, setSelectedType] = useState('')
  const history = useHistory()

  const renderType = (name: 'Mentee' | 'Mentor') => {
    const type = name.toLowerCase() as Lowercase<typeof name>

    return (
      <div
        className={classnames('signup__type', {
          [`border-${type}`]: type === selectedType,
          'no-shadow': selectedType && type !== selectedType,
        })}
        onClick={() => setSelectedType(type)}
      >
        <SVGImage image={type} />
        <Element className="signup__type__name" renderAs="p">
          {name}
        </Element>
      </div>
    )
  }

  return (
    <AccountOperation>
      <Columns vCentered>
        <Columns.Column
          size={6}
          responsive={{ mobile: { hide: { value: true } } }}
        >
          <Teaser.SignIn />
        </Columns.Column>

        <Columns.Column size={5} offset={1}>
          <Heading border="bottomLeft">Sign-up</Heading>
          <Content size="large" renderAs="p" className="oneandhalf-bs">
            Do you want to become a <strong>mentor</strong> or a{' '}
            <strong>mentee</strong>?
          </Content>
          <div className="sign-up">
            {renderType('Mentee')}
            {renderType('Mentor')}
          </div>
          <Button
            fullWidth
            onClick={() => history.push(`/front/signup/${selectedType}`)}
            disabled={!selectedType}
            size="medium"
          >
            next step
          </Button>
        </Columns.Column>
      </Columns>
    </AccountOperation>
  )
}

export default SignUpLanding
