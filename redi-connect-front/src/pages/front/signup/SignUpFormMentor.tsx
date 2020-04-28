import React from 'react'
import { buildSignUpForm } from './signUpFormFactory'
import AccountOperation from '../../../components/templates/AccountOperation'

const Form = buildSignUpForm('public-sign-up-mentor-pending-review')

export default function SignUpFormMentor () {
  return (
    <AccountOperation>
      <Form />
    </AccountOperation>
  )
}
