import React from 'react'
import { buildSignUpForm } from './signUpFormFactory'
import AccountOperation from '../../../components/templates/AccountOperation'

const Form = buildSignUpForm('public-sign-up-mentee-pending-review')

export default function SignUpFormMentee () {
  return (
    <AccountOperation>
      <Form />
    </AccountOperation>
  )
}
