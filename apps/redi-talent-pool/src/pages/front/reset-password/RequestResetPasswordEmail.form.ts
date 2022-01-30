import { Dispatch, SetStateAction } from 'react';
import { createComponentForm } from '@talent-connect/shared-utils';
import { requestResetPasswordEmail } from '../../../services/api/api'

interface ComponentFormProps {
  setResetPasswordSuccess: Dispatch<SetStateAction<string>>;
  setResetPasswordError: Dispatch<SetStateAction<string>>;
}

export const componentForm = createComponentForm<ComponentFormProps>()
  .validation((yup) => ({
    email: yup.string()
      .email('That doesn’t look quite right... please provide a valid email.')
      .required('Please provide an email address.'),
  }))
  .initialValues(() => ({
    email: ''
  }))
  .onSubmit(async ({ email }, _,  { setResetPasswordError, setResetPasswordSuccess }) => {
    try {
      await requestResetPasswordEmail(email)
      setResetPasswordSuccess('If you have an account,we have sent you the password reset link to your email address.')
    } catch (err) {
      setResetPasswordError('Oh no, something went wrong :( Did you type your email address correctly?')
    }
  })