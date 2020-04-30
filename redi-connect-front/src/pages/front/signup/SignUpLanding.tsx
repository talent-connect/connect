import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Heading, Columns } from 'react-bulma-components'
import AccountOperation from '../../../components/templates/AccountOperation'
import Teaser from '../../../components/molecules/Teaser'
import Button from '../../../components/atoms/Button'
import classnames from 'classnames'
import { ReactComponent as Mentee } from '../../../assets/images/mentee.svg'
import { ReactComponent as Mentor } from '../../../assets/images/mentor.svg'

import './SignUpLanding.scss'

const Illustration: { [key: string]: React.FunctionComponent<React.SVGProps<SVGSVGElement>> } = {
  mentee: Mentee,
  mentor: Mentor
}

const SignUpLanding = () => {
  const [selectedType, setSelectedType] = useState('')
  const history = useHistory()

  const renderType = (name: string) => {
    const type = name.toLowerCase()
    const Image = Illustration[type]

    return <div
      className={classnames('signup__type', { [`border-${type}`]: type === selectedType })}
      onClick={() => setSelectedType(type)}>
      <Image />
      <Heading className="signup__type__name" renderAs="p">
        {name}
      </Heading>
    </div>
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
          <Heading
            size={1}
            weight="normal"
            renderAs="h1"
            responsive={{ mobile: { textSize: { value: 2 } } }}
            className="title--border"
            spaced={true}
          >
            Sign-up
          </Heading>
          <Heading size={4} renderAs="p" subtitle>
            Do you want to become a <strong>mentor</strong> or a <strong>mentee</strong>?
          </Heading>
          <div className="signup">
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
