import { createComponentForm } from '@talent-connect/shared-utils';

export const componentForm = createComponentForm()
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
  .onSubmit(() => {

  })