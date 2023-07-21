import {
  Button,
  Heading,
  SVGImage,
  SVGImages,
} from '@talent-connect/shared-atomic-design-components'
import classnames from 'classnames'
import { useState } from 'react'
import { Columns, Content, Element } from 'react-bulma-components'
import { useHistory } from 'react-router-dom'
import Teaser from '../../../components/molecules/Teaser'
import AccountOperation from '../../../components/templates/AccountOperation'
import './SignUpLanding.scss'
import { SignUpPageType } from './signup-page.type'

const SignUpLanding = () => {
  const [selectedType, setSelectedType] = useState('')
  const history = useHistory()

  const renderType = (pageType: SignUpPageType) => {
    const type = pageType as SVGImages

    return (
      <div
        className={classnames('signup__type', {
          [`border-${type}`]: type === selectedType,
          'no-shadow': type !== selectedType && selectedType !== '',
        })}
        onClick={() => setSelectedType(type)}
      >
        <SVGImage image={type} />
        <Element className="signup__type__name" renderAs="p">
          {pageType}
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
          <div className="signup">
            {renderType('mentee')}
            {renderType('mentor')}
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
