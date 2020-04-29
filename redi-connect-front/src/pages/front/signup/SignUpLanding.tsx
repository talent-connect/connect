import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { Image, Heading, Columns } from 'react-bulma-components'
import AccountOperation from '../../../components/templates/AccountOperation'
import Teaser from '../../../components/molecules/Teaser'
import Button from '../../../components/atoms/Button'
import mentee from '../../../assets/images/mentee.svg'
import mentor from '../../../assets/images/mentor.svg'
import './SignUpLanding.scss'

interface Props {
  history: any
}

const SignUpLanding = ({ history }: Props) => {
  const [selectedRole, setSelectedRole] = useState('')
  const [isDisabled, setIsDisabled] = useState(true)
  const [mentorClass, setMentorClass] = useState('')
  const [menteeClass, setMenteeClass] = useState('')

  useEffect(() => {
    if (selectedRole !== '') {
      setIsDisabled(false)
      setMenteeClass(selectedRole === 'mentee' ? 'border-mentee' : 'no-shadow')
      setMentorClass(selectedRole === 'mentor' ? 'border-mentor' : 'no-shadow')
    }
  }, [selectedRole])

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
            <div className={`signup__type ${menteeClass}`} onClick={() => setSelectedRole('mentee')}>
              <Image src={mentee} alt="mentee" />
              <Heading className="signup__type--name" renderAs="p">Mentee</Heading>
            </div>
            <div className={`signup__type ${mentorClass}`} onClick={() => setSelectedRole('mentor')}>
              <Image src={mentor} alt="mentor" />
              <Heading className="signup__type--name" renderAs="p">Mentor</Heading>
            </div>
          </div>
          <Button
            fullWidth
            onClick={() => history.push(`/front/signup/${selectedRole}`)}
            disabled={isDisabled}
            size="medium"
          >
            next step
          </Button>
        </Columns.Column>
      </Columns>
    </AccountOperation>
  )
}

export default withRouter(SignUpLanding)
