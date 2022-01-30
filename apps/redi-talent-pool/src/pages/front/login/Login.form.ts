import { createComponentForm } from '@talent-connect/shared-utils';
import { Dispatch, SetStateAction } from 'react';
import { login } from '../../../services/api/api'
import { saveAccessTokenToLocalStorage } from '../../../services/auth/auth'
import { history } from '../../../services/history/history'

interface ComponentFormProps {
  setLoginError: Dispatch<SetStateAction<string>>
}

export const componentForm = createComponentForm<ComponentFormProps>()
  .validation((yup) => ({
    username: yup.string()
      .email()
      .required()
      .label('Email')
      .max(255),
    password: yup.string()
      .required()
      .label('Password')
      .max(255),
  }))
  .initialValues(() => ({
    username: '',
    password: '',
  }))
  .onSubmit(async ({ username, password }, { setSubmitting }, { setLoginError }) => {
    try {
      const accessToken = await login(username, password)
      saveAccessTokenToLocalStorage(accessToken)
      setSubmitting(false)
      history.push('/app/me')
    } catch (err) {
      setSubmitting(false)
      setLoginError('You entered an incorrect email, password, or both.')
    }
  })