import { createComponentForm } from '@talent-connect/shared-utils';

export const componentForm = createComponentForm()
  .validation((yup) => ({
    firstName: yup.string()
      .required('Your first name is required'),
    lastName: yup.string()
      .required('Your last name is required'),
    location: yup.string()
      .required('Your location is required'),
  }))
  .initialValues(() => ({

  }))
  .formikConfig({
    
  })
  .onSubmit(() => {

  })