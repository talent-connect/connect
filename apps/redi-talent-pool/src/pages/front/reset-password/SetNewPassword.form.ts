import { Dispatch, SetStateAction } from 'react';
import { createComponentForm } from '@talent-connect/shared-utils';

import { setPassword } from '../../../services/api/api'
import { history } from '../../../services/history/history'
import { showNotification } from '../../../components/AppNotification'

interface ComponentFormProps {
  setFormError: Dispatch<SetStateAction<string>>
}


export const componentForm = createComponentForm<ComponentFormProps>()
  .validation((yup) => ({
    password: yup.string()
      .min(8, 'Password must contain at least 8 characters')
      .required('Enter your password')
      .label('Password'),
    passwordConfirm: yup.string()
      .required('Confirm your password')
      .oneOf([yup.ref('password')], 'Password does not match'),
  }))
  .initialValues(() => ({
    password: '',
    passwordConfirm: '',
  }))
  .onSubmit(async ({ password }, actions, { setFormError }) => {
    try {
      await setPassword(password)
      showNotification("Your new password is set and you're logged in :)", {
        variant: 'success',
        autoHideDuration: 8000,
      })
      history.push('/app/me')
    } catch (err) {
      setFormError('Invalid username or password')
    }
    actions.setSubmitting(false)
  })