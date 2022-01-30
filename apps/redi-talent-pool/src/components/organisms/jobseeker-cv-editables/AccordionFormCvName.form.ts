import { createComponentForm } from '@talent-connect/shared-utils';

export const componentForm = createComponentForm()
  .validation((yup) => ({
    firstName: yup.string()
      .required('Your first name is required'),
    lastName: yup.string()
      .required('Your last name is required'),
  }))
  .initialValues(() => ({

  }))
  .formikConfig({
    enableReinitialize: true,
    validateOnMount: true,
  })
  .onSubmit(() => {

  })